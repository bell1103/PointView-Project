import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { supabase } from '../../supabaseClient';
import './Profile.css'; 
import Footer from '../Footer';

const Profile = () => {
  const { session, signOut } = UserAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!session || !session.user) {
      navigate('/log-in');
      return;
    }

    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from('profiles') 
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle();

      if (error) {
        console.error('Failed to fetch user profile:', error.message);
      } else {
        setUserData(data);
      }
      setLoading(false);
    };

    fetchUserData();
  }, [session, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/log-in');
  };

  if (loading || !session || !session.user) {
    return <div className="profile-container">Loading...</div>;
  } 

  const { email, id, created_at} = session.user;

  return (
    <div className="big-profile-container">
      <div className="profile-container">
        <h1>Welcome, {email.split('@')[0]}</h1>
        <div className="profile-info">
          <p><strong>Email:</strong> {email}</p>
          {/* <p><strong>User ID:</strong> {id}</p> */}
        </div>

        <div className="tennis-stats">
          <h2>Tennis Stats</h2>
          <p> Videos Uploaded: {userData?.videos_uploaded || 0}</p>
          <p> Matches Played: {userData?.matches_played || 0}</p>
          <p> Win Rate: {userData?.win_rate || 'N/A'}%</p>
        </div>

        <div className="profile-actions">
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>
      <div className="profile-footer">
        <><Footer /></>
      </div>
    </div>
  );
};

export default Profile;

