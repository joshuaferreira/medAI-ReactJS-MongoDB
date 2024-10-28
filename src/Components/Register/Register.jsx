import React from 'react'
import { useState } from 'react';
import './Register.css'

export const Register = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState(''); //variable for email
  const [password, setPassword] = useState(''); //variable for password
  const [confirmpassword, setConfirmPassword] = useState(''); //variable for confirm password
  const [errors, setErrors] = useState({}); //empty object for errors

  const validate = () => {
    const newErrors = {};

    //name validation
    if(!name){
        newErrors.name = 'Name is required';
    }else if(!/^\s*[a-zA-Z\s'-]+\s*$/.test(name)){
        newErrors.name = 'Invalid Name Format'
    }

    //age validation
    if (!age) {
        newErrors.age = 'Age is required';
    } else if (!/^\d{1,3}$/.test(age)) {
        newErrors.age = 'Invalid Age Format';
    } else if (age < 0 || age > 120) {
        newErrors.age = 'Age must be between 0 and 120';
    }

    //gender validation
    if (!gender) {
        newErrors.gender = 'Gender is required';
    } else if (!['Male', 'Female', 'Other'].includes(gender)) {
        newErrors.gender = 'Invalid Gender Selection';
    }

    //phone number validation
    if (!phone) {
        newErrors.phone = 'Phone number is required';
    } else if (!/^(?:\+91|91)?[789]\d{9}$/.test(phone)) {
        newErrors.phone = 'Invalid Phone Number Format';
    }

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

    if(!confirmpassword){
        newErrors.confirm = "Confirm Password"
    }else{
        if(password){
            if(!(password === confirmpassword)) newErrors.confirm = "Passwords do not Match"; 
        }
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
      <div className="card register-card p-5 shadow-sm w-100 m-5">
        <h2 className="text-center display-6 mb-4">Register</h2>
        
        <form onSubmit={handleSubmit} noValidate>

          <div className="mb-3">
            <label htmlFor="name" className='form-label lead'>Enter Name</label>
            <input 
              type="name" 
              id='name'
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder='Full Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="age" className='form-label lead'>Enter Age</label>
            <input 
                type="number" 
                id='age'
                className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                placeholder='Age'
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            {errors.age && <div className="invalid-feedback">{errors.age}</div>}
        </div>

        <div className="mb-3">
            <label htmlFor="gender" className='form-label lead'>Select Gender</label>
            <select 
                id='gender'
                className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
            >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
        </div>

          <div className="mb-3">
            <label htmlFor="phone" className='form-label lead'>Enter Phone Number</label>
            <input 
                type="tel" 
                id='phone'
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                placeholder='Phone Number'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>

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

          <div className="mb-3">
            <label htmlFor="confpass" className="form-label lead">Confirm Password</label>
            <input 
                type="password" 
                id='confpass'
                className={`form-control ${errors.confirm ? 'is-invalid' : ''}`}
                placeholder='Re-Enter Password'
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}/>
                {errors.confirm && <div className="invalid-feedback">{errors.confirm}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
          
        </form>
      </div>
    </div>
  )
}
