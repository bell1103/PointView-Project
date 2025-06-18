import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { UserAuth } from '../context/AuthContext';


function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(window.innerWidth > 960); // Init with correct width
  const { user: sessionUser, signOut, loading } = UserAuth();


  useEffect(() => {
    const showButton = () => setButton(window.innerWidth > 960);
    showButton(); // Ensure correct state on first render
    window.addEventListener('resize', showButton);
    return () => window.removeEventListener('resize', showButton);
  }, []);

  if (loading) return null;

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link  to={sessionUser ? "/my-home" : "/"} 
                className="navbar-logo" 
                onClick={closeMobileMenu}
          >
            PointView <i className="fas fa-video" style={{ marginLeft: '8px' }}></i>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <Link to="/my-home" className="nav-links" onClick={closeMobileMenu}>Dashbored</Link>
            </li>
            <li className="nav-item">
              <Link to="/my-matches" className="nav-links" onClick={closeMobileMenu}>My Matches</Link>
            </li>
            <li className="nav-item">
              <Link to="/upload" className="nav-links" onClick={closeMobileMenu}>Upload</Link>
            </li>
            <li className="nav-item">
              {sessionUser ? (
                <Link to="/profile" className="nav-links" onClick={closeMobileMenu}>
                  {sessionUser.email}
                </Link>
              ) : (
                <Link to= "/log-in" className="nav-links" onClick={closeMobileMenu}>Log In</Link>
              )}
            </li>
          </ul>
        </div>
      </nav>

      <div className="navbar-profile-wrapper">
        <Link
          to={sessionUser ? '/profile' : '/log-in'}
          className="nav-user-profile-link"
          onClick={closeMobileMenu}
        >
          <div className="nav-user-profile">
            <i className="fas fa-user-circle"></i>
            <span className="nav-username">
              {sessionUser ? sessionUser.email.split('@')[0] : 'Log In'}
            </span>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Navbar;
