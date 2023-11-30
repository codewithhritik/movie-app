import React, { useState, useEffect } from 'react';
import Description from '../../Description'; // Make sure this path is correct
import Navbar from '../../components/Navbar/Navbar'; // Import the Navbar component

import { Link } from 'react-router-dom'; 
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert'; 
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'


import axios from 'axios';

import './UserRegister.css'

const Register = ({setAlert, register}) =>{


  const [formData, setFormData] = useState({
    name:'',
    email: '',
    password: '',
    password2: ''
  });


  const {name, email, password, password2 } = formData;
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("before try catch",userData)
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      const newUser = {
        name,
        email,
        password
      };
      

      try {
        await register(newUser); 
        // console.log("After try catch",userData)
      } catch (err) {
        console.error('Error:', err);
      }
    }
  };


  return (
    <div className='register-container'>
      <div className='register-navbar'>
        <Navbar isAuthenticated={false} /> {/* Include the Navbar component */}
      </div>
      <div className='register-'>

      </div>
      <div className='register-description'>
        <Description /> {/* Add the Description component here */}
        <h2>{'Sign Up'}</h2>
      </div>
      <div className='register-form-container'>
        <form onSubmit={handleSubmit} className='register-form'>
          <label htmlFor="username">Name</label>
          <input type="text" id="name" name="name" value={name}
            onChange={handleChange}   required />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={(e) => handleChange(e, 'email')}  required/>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={(e) => handleChange(e, 'password')} minLength='6' required/>
          <label htmlFor="password2">Retype Password</label>
          <input type="password" id="password2" name="password2" value={formData.password2} onChange={(e) => handleChange(e, 'password2')} minLength='6' required />
          
          <button className="register-btn" type="submit">{ 'Sign Up'}</button>
          <p>
            {'Already have an account? '}
            <Link to="/login">{'Login'}</Link>
          </p>        
        </form>
      </div>
      
    </div>
    
  );
}
Register.prototype = {
    setAlert:PropTypes.func.isRequired,
    register:PropTypes.func.isRequired,
};

export default connect(null,{setAlert, register})(Register);
