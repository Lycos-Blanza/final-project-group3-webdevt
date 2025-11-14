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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Contact Us</h2>
        <p className="mb-6 text-gray-600 text-center">
          We'd love to hear from you. Please send us your message below.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-gray-700 font-medium" htmlFor="message">
              Your Message
            </label>
            <textarea
              id="message"
              className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              rows={5}
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              placeholder="Type your message here..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#6D3811] text-white py-2.5 rounded-lg font-semibold cursor-pointer transition"
          >
            Send Message
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
