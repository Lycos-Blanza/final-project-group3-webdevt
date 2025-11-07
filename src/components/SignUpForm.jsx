import React from 'react';
import '../css/SignUpForm.css';

export default function SignUpForm({ onLogInClick }) {
  return (
    <form className="sidebar-form" onSubmit={e => { e.preventDefault(); /* handle signup here */ }}>
      <label>
        Name:
        <input type="text" name="name" required autoComplete="name" />
      </label>
      <label>
        Email:
        <input type="email" name="email" required autoComplete="username" />
      </label>
      <label>
        Password:
        <input type="password" name="password" required autoComplete="new-password" />
      </label>
      <label>
        Confirm Password:
        <input type="password" name="confirmPassword" required autoComplete="new-password" />
      </label>
      <button type="submit" className="sidebar-submit">Submit</button>
      <button
        type="button"
        className="sidebar-alt"
        onClick={onLogInClick}
      >
        Log-In
      </button>
    </form>
  );
}
