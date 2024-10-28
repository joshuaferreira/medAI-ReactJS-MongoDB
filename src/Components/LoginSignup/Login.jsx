import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

export const Login = () => {
  const [email, setEmail] = useState(''); //variable for email
  const [password, setPassword] = useState(''); //variable for password
  const [errors, setErrors] = useState({}); //empty object for errors

  const validate = () => {
    const newErrors = {};

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    const passwordErrors = [];
    if (!password) {
      passwordErrors.push('Password is required');
    } else {
      if (password.length < 6) passwordErrors.push('Must be at least 6 characters');
      if (!/[A-Z]/.test(password)) passwordErrors.push('Must contain an uppercase letter');
      if (!/[a-z]/.test(password)) passwordErrors.push('Must contain a lowercase letter');
      if (!/[0-9]/.test(password)) passwordErrors.push('Must contain a number');
      if (!/[!@#$%^&*]/.test(password)) passwordErrors.push('Must contain a special character');
    }
    
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className="container-sm d-flex justify-content-center align-items-center min-vh-100">
      <div className="card login-card p-5 shadow-sm w-100">
        <h2 className="text-center display-4 mb-4">Login</h2>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="mail" className="form-label lead">Enter Email</label>
            <input 
              type="email" 
              id="mail" 
              className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="pass" className="form-label lead">Enter Password</label>
            <input 
              type="password" 
              id="pass" 
              className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && Array.isArray(errors.password) && (
              <div className="invalid-feedback">
                <ul className="m-0 p-0">
                  {errors.password.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
          
          <div className="text-center mt-4">
            <span className="text-muted">Don't have an account? </span>
            <Link to="/register" className="text-primary">Register</Link>
          </div>
          
        </form>
      </div>
    </div>
  );
};
