// Register.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Validate form fields
      if (!name || !email || !phone || !password || !confirmPassword) {
        setError('Please enter all fields');
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      // Send registration request to the server
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        // Optionally, you can redirect the user to the login page
        // window.location.href = '/login';
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      console.error('Error registering:', error);
      setError('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-header">Create a New Account</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="register-input"
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="register-input"
        />

        <label>Phone Number:</label>
        <input
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="register-input"
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="register-input"
        />

        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="register-input"
        />

        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={loading} className="register-button">
          {loading ? 'Signing up...' : 'Sign up'}
        </button>

        <p className="toggle-link">Already have an account? <Link to="/login">Sign In</Link></p>
      </form>
    </div>
  );
};

export default Register;
