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
  
    // Check confirmed users (in profiles)
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', lowerEmail)
      .maybeSingle();
  
    if (existingProfile) {
      return { success: false, error: 'Email already registered. Please log in.' };
    }
  
    // Try Supabase sign up
    const { data, error } = await supabase.auth.signUp({
      email: lowerEmail,
      password,
    });
  
    if (error) {
      return { success: false, error: error.message };
    }
  
    if (!data.user) {
      return {
        success: false,
        error: 'This email has already been used but not confirmed. Please check your inbox.',
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
