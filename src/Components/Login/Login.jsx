// Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        // Redirect or update state upon successful login
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Error logging in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-header">Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="login-input"
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="login-input"
        />

        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={loading} className="login-button">
          {loading ? 'Logging in...' : 'Log in'}
        </button>

        <p className="toggle-link">Don't have an account? <Link to="/reg">Sign Up</Link></p>
      </form>
    </div>
  );
};

export default Login;
