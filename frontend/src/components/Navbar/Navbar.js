import React from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; // Import connect
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth'; // Import the logout action

import CinemasLogo from '../../assets/images/Logo/CinemasLogo.png'


const mapStateToProps = (state) => ({
  isAuthenticated: state.auth && state.auth.isAuthenticated,
});


const Navbar = ({ isAuthenticated, logout }) => {
  const handleLogout = () => {
    // Call the logout action when logout is clicked
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={CinemasLogo} alt="Logo" />
        </Link>
      </div>
      <div className="navbar-buttons">
        {!isAuthenticated ? (
          <>
            <Link to="/login">
              <button className="login-button">Login</button>
            </Link>
            <Link to="/register">
              <button className="register-button">Register</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile">
              <button className="profile-button">Profile</button>
            </Link>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};



export default connect(mapStateToProps, { logout })(Navbar);
