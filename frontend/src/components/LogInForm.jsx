import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function LogInForm({ onSignUpClick }) {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
    <form className="flex flex-col gap-[18px]" onSubmit={handleSubmit}>
      <label className="flex flex-col text-[1rem] text-[#5C3A2E]">
        Email*
        <input
          type="email"
          name="email"
          required
          autoComplete="username"
          className="mt-[6px] p-[8px] rounded-[4px] text-[1rem] bg-[#6D3811]/20 hover:bg-[#6D3811]/25"
        />
      </label>

      <div className="flex flex-col text-[1rem] text-[#5C3A2E]">
        Password*
        <div className="flex flex-row gap-2 items-center">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            autoComplete="current-password"
            className="mt-[6px] flex-1 p-[8px] rounded-[4px] text-[1rem] bg-[#6D3811]/20 hover:bg-[#6D3811]/25"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={`
              mt-[6px]
              cursor-pointer
              p-[8px]
              rounded-[4px]
              ${showPassword ? (
                "bg-[#6D3811]"
              ) : (
                "bg-[#6D3811]/25"
              )}
              flex
              items-center
              justify-center
              `}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#E9D3BE" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#6D3811" viewBox="0 0 16 16">
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
              </svg>
            )}
          </button>
        </div>
      </div>


      <button
        type="submit"
        className="mt-[12px] py-[10px] bg-[#6D3811] text-[#E9D3BE] rounded-[4px] text-[1.1rem] font-bold cursor-pointer"
      >
        Log-in
      </button>

      <button
        type="button"
        className="mt-[10px] py-[8px] bg-transparent text-[#6D3811] rounded-[4px] text-[1rem] font-bold cursor-pointer w-full border border-[#6D3811]"
        onClick={onSignUpClick}
      >
        Sign-up
      </button>

      {error && (
        <div className="text-red-600 font-medium mt-2">
          {error}
        </div>
      )}
    </form>
  );
}
