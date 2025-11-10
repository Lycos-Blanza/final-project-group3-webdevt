import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function ContactUs() {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const { user } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    // Save message to localStorage
    const prev = localStorage.getItem('contact_messages');
    const messages = prev ? JSON.parse(prev) : [];
    messages.push({
      text: message,
      date: new Date().toISOString(),
      email: user?.email || null
    });
    localStorage.setItem('contact_messages', JSON.stringify(messages));
    setSent(true);
    setMessage('');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact Us</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="mb-2 text-gray-700 font-medium" htmlFor="message">
            Your Message
          </label>
          <textarea
            id="message"
            className="border border-gray-300 rounded p-2 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={5}
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Send
          </button>
        </form>
        {sent && (
          <div className="mt-4 text-green-600 font-semibold">
            Message sent! We'll get back to you soon.
          </div>
        )}
      </div>
    </div>
  );
}
