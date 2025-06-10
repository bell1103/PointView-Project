import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  //  Fetch user profile by user ID
  const fetchUserProfile = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
      setProfile(null);
    } else {
      setProfile(data);
    }
  };

  //  Runs when the `user` state changes
  useEffect(() => {
    if (user) {
      fetchUserProfile(user.id);
    } else {
      setProfile(null);
    }
  }, [user]);

  //  Runs on mount, listens to auth changes
  useEffect(() => {
    let isMounted = true;

    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (isMounted) {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (isMounted) {
          setSession(session);
          setUser(session?.user ?? null);
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Sign Up and insert into profiles table
  const signUpNewUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password,
      });

      if (error) {
        // Email already registered 
        if (error.message.toLowerCase().includes('user already registered') || error.status === 400) {
          return {success: false, error: 'Email is already registered. Please use a different Email or register'};
        }

        return {success: false, error: error.message };
      }

      if (!data?.user) {
        return { success: false, error: 'Sign up failed. Please try again.' };
      }


      // Insert new profile row
      await supabase.from('profiles').insert({
        id: data.user.id,
        email: data.user.email,
      });

      return { success: true, data };
    } catch {
      return { success: false, error: 'Unexpected error during sign up' };
    }
  };

  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      });
      return error ? { success: false, error: error.message } : { success: true, data };
    } catch {
      return { success: false, error: 'Unexpected error during sign in' };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      setSession(null);
      setUser(null);
      setProfile(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signUpNewUser,
        signInUser,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);
