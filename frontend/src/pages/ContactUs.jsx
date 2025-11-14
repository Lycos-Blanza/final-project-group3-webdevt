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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-lg px-8 py-10">
        <h2
          className="text-3xl font-bold mb-6 text-gray-800 text-center"
          style={{ fontFamily: 'var(--headline-font)' }}
        >
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-gray-700 font-medium" htmlFor="message">
            Your Message
          </label>
          <textarea
            id="message"
            className="border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            rows={5}
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
            placeholder="Type your message here..."
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send
          </button>
        </form>
        {sent && (
          <div className="mt-6 text-green-600 font-semibold text-center">
            Message sent! We'll get back to you soon.
          </div>
        )}
      </div>
    </div>
  );
}
