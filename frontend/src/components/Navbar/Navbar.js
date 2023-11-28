import React from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';

import CinemasLogo from '../../assets/images/Logo/CinemasLogo.png'

const Navbar = ({isLoggedIn}) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={CinemasLogo} alt="Logo" />
        </Link>
      </div>
      {isLoggedIn ? (
        // If user is logged in, show logout and profile buttons
        <>
        <div className="navbar-buttons">
          <Link to="/profile">
            <button className="profile-button">My Profile</button>
          </Link>
          <Link to="/logout">
            <button className="logout-button">Logout</button>
          </Link>
        </div>
      </>
      ) : (
        // If user is not logged in, show login and register buttons
        <>
          <div className="navbar-buttons">
            <Link to="/login">
              <button className="login-button">Login</button>
            </Link>
            <Link to="/register">
              <button className="register-button">Register</button>
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
