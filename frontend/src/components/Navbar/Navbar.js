import React from 'react';
import './Navbar.css'
import CinemasLogo from '../../assets/images/Logo/CinemasLogo.png'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={CinemasLogo} alt="Logo" />
      </div>
      <div className="navbar-buttons">
        <button className="login-button">Login</button>
        <button className="register-button">Register</button>
      </div>
    </nav>
  );
}

export default Navbar;
