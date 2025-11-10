import React, { useEffect, useState } from 'react';

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('contact_messages');
    setMessages(data ? JSON.parse(data) : []);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-8">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Messages</h2>
        {messages.length === 0 ? (
          <div className="text-gray-500">No messages yet.</div>
        ) : (
          <ul className="space-y-4">
            {messages.map((msg, idx) => (
              <li key={idx} className="border-b pb-4">
                <div className="text-gray-700 mb-2">{msg.text}</div>
                <div className="text-xs text-gray-400">
                  Sent at: {new Date(msg.date).toLocaleString()}
                </div>
                {msg.email && (
                  <div className="text-xs text-gray-500">From: {msg.email}</div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
