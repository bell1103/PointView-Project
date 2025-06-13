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
    const lowerEmail = email.toLowerCase();
  
    const { data, error } = await supabase.auth.signUp({
      email: lowerEmail,
      password,
    });
  
    // If error exists, handle it
    if (error) {
      return {
        success: false,
        error: error.message || 'Sign-up failed. Please try again.',
      };
    }
  
    // If user object is null, it's likely already registered but unconfirmed
    if (!data?.user) {
      return {
        success: false,
        error: 'This email is already registered but not confirmed. Please check your inbox.',
      };
    }
  
    // Try inserting into profiles table
    const { error: insertError } = await supabase
      .from('profiles')
      .insert({ id: data.user.id });
  
    if (insertError) {
      return {
        success: false,
        error: 'Failed to create new profile. Please sign up with new email.',
      };
    }
  
    return { success: true, data };
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
