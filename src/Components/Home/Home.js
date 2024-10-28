// src/Components/Home/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to the Home Page</h1>
      <p>This is the main landing page of the app.</p>
      <Link to="/login">Login</Link>
      <Link to="/register">SignUp / Register</Link>
    </div>
  );
};
