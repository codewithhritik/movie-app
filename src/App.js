import React from 'react';
import './App.css';
import LoginSignupPage from './LoginPage'; // Import the LoginSignupPage component
import logo from './logo.svg'; // Import the logo image

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" /> {/* Display the logo */}
        <LoginSignupPage /> {/* Include the LoginSignupPage component here */}
      </header>
    </div>
  );
}

export default App;
