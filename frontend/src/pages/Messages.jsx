// src/pages/Messages.jsx
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Messages() {
  const { user, messages } = useAuth();
  const [selectedMsg, setSelectedMsg] = useState(null);

  if (!user || user.role !== "admin") {
    return (
      <div className="pt-14 p-6 text-center text-red-600 font-semibold text-xl bg-[#f6f0e7] min-h-screen">
        <svg width="80" height="80" viewBox="0 0 24 24" className="mx-auto mb-4 opacity-30">
          <circle cx="12" cy="12" r="10" fill="#6D3811" />
          <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#fff">!</text>
        </svg>
        Access denied.
      </div>
    );
  }

  return (
    <div className="pt-14 min-h-screen bg-[#f6f0e7] relative">
      {/* SVG background accent */}
      <svg
        className="absolute top-0 left-0 w-full h-40 pointer-events-none"
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ zIndex: 0 }}
      >
        <path
          fill="#E9D3BE"
          fillOpacity="0.45"
          d="M0,96L80,122.7C160,149,320,203,480,208C640,213,800,171,960,154.7C1120,139,1280,149,1360,154.7L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        />
      </svg>

      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <h2 className="text-4xl font-['Staatliches'] font-bold mb-8 text-center text-[#6D3811] drop-shadow">
          Customer Messages
        </h2>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <svg width="100" height="100" viewBox="0 0 24 24" className="mb-4 opacity-40">
              <circle cx="12" cy="12" r="10" fill="#E9D3BE" />
              <text x="12" y="16" textAnchor="middle" fontSize="24" fill="#6D3811">🫧</text>
            </svg>
            <p className="text-center text-[#6D3811]/75 text-lg font-medium">You have no messages...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((msg) => (
              <button
                key={msg.id}
                className="w-full text-left bg-white p-6 rounded-2xl shadow-md border border-[#E9D3BE]/60 hover:bg-[#f6f0e7] transition"
                onClick={() => setSelectedMsg(msg)}
                tabIndex={0}
              >
                {msg.email && (
                  <p className="text-[#6D3811] font-semibold mb-1">
                    <span className="font-bold">From:</span> {msg.email}
                  </p>
                )}
                <p className="text-xs text-[#6D3811]/60 mb-2">
                  {new Date(msg.date).toLocaleString()}
                </p>
                <p className="mt-2 text-[#222] leading-relaxed line-clamp-2">{msg.message}</p>
              </button>
            ))}
          </div>
        )}

        {/* Modal */}
        {selectedMsg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative border border-[#E9D3BE]/60
              mx-4
            ">
              <button
                className="absolute top-3 right-3 text-[#6D3811] text-2xl font-bold hover:text-[#222] transition"
                onClick={() => setSelectedMsg(null)}
                aria-label="Close"
              >
                &times;
              </button>
              <h3 className="text-2xl font-bold mb-4 text-[#6D3811]">Message Details</h3>
              {selectedMsg.email && (
                <p className="text-[#6D3811] font-semibold mb-1 break-all">
                  <span className="font-bold">From:</span> {selectedMsg.email}
                </p>
              )}
              <p className="text-xs text-[#6D3811]/60 mb-2">
                {new Date(selectedMsg.date).toLocaleString()}
              </p>
              <div
                className="mt-2 text-[#222] leading-relaxed whitespace-pre-line break-words max-h-[300px] overflow-auto"
              >
                {selectedMsg.message}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
