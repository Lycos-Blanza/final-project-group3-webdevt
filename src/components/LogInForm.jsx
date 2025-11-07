import React from 'react';
import '../css/LogInForm.css';

export default function LogInForm({ onSignUpClick }) {
  return (
    <form className="sidebar-form" onSubmit={e => { e.preventDefault(); /* handle login here */ }}>
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
    </form>
  );
}
