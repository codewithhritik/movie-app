import React, { useState, useEffect  } from 'react';
import Description from './Description'; // Make sure this path is correct
import Navbar from './components/Navbar/Navbar'; // Import the Navbar component

import { Link } from 'react-router-dom'; 
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { loadUser} from './actions/auth'
import { login } from './actions/auth';
import { setAlert } from './actions/alert'; 

const LoginPage = ({ setAlert, login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await login(email, password); // Call login action with email and password
    } catch (err) {
      console.error('Error:', err);
      setAlert('An error occurred during login.', 'danger');
    }
  };

  return (
    <div>
      <Navbar />
      <Description />
      <h2>{'Log In'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <button type="submit">{'Log In'}</button>
      </form>
      <p>
        {'Don\'t have an account? '}
        <Link to="/register">{'Sign Up'}</Link>
      </p>
    </div>
  );
};

LoginPage.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, login })(LoginPage);