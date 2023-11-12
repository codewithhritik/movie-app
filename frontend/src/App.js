import React from 'react';
import './App.css';
import LoginSignupPage from './LoginPage'; // Import the LoginSignupPage component
import logo from './logo.svg'; // Import the logo image

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage.js';
import SeatBookingPage from './pages/SeatBookingPage/SeatBookingPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginSignupPage />
  },
  {
    path: "/seat-booking",
    element: <SeatBookingPage />
  }
  
]);

function App() {
  return (
    <div className="main">
      <RouterProvider router={router} />
    </div>
  );

}

export default App;


// return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" /> {/* Display the logo */}
  //       <LoginSignupPage /> {/* Include the LoginSignupPage component here */}
  //     </header>
  //   </div>
  // );