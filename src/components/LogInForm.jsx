import React, { useState } from 'react';
import '../css/LogInForm.css';
import { useAuth } from '../contexts/AuthContext';

export default function LogInForm({ onSignUpClick }) {
  const { login } = useAuth();
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const result = login(email, password);
    if (result) {
      alert(`Login successful: ${email}`);
    } else {
      setError('Incorrect email or password');
      alert('Incorrect email or password');
    }
  }

  return (
    <form className="sidebar-form" onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" name="email" required autoComplete="username" />
      </label>
      <label>
        Password:
        <input type="password" name="password" required autoComplete="current-password" />
      </label>
      <button type="submit" className="sidebar-submit">Submit</button>
      <button
        type="button"
        className="sidebar-alt"
        onClick={onSignUpClick}
      >
        Sign In
      </button>
      {error && <div className="login-error">{error}</div>}
    </form>
  );
}
