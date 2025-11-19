// src/pages/ContactUs.jsx
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext";

export default function ContactUs() {
  const { user, addMessage } = useAuth();
  const notify = useNotification();
  const [form, setForm] = useState({ message: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!form.message.trim()) err.message = "Message is required.";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      notify("Please fill in the message.", "error");
      return;
    }
    addMessage({ ...form, email: user?.email });
    notify("Message sent to admin!", "success");
    setForm({ message: "" });
    setErrors({});
  };

  return (
    <div
      className="
        min-h-screen w-full
        flex items-center justify-center
        relative
        font-nunito
        bg-cover bg-center bg-no-repeat
        overflow-hidden
      "
      style={{
        backgroundImage:
          "url('https://popmenucloud.com/cdn-cgi/image/width%3D1920%2Cheight%3D1920%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/dxkflgbu/c77222db-9b6a-49e4-a654-0f5b7c53e341.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-[rgba(40,30,10,0.65)]"></div>
      <div className="relative z-[2] flex flex-row w-full max-w-5xl px-6 py-20 gap-10 max-[900px]:flex-col max-[900px]:items-center max-[900px]:py-10">
        {/* Left: Headline */}
        <div className="flex-1 flex items-center justify-center">
          <div
            className="
              font-['Staatliches']
              text-white text-[3.5rem] max-[700px]:text-[2rem]
              tracking-[2px]
              leading-[1]
              drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)]
              text-left
              max-[900px]:text-center
            "
          >
            CONTACT US
          </div>
        </div>
        {/* Right: Form */}
        <div className="flex-1 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="
              w-full max-w-md
              bg-[#f6e7d2]
              rounded-[18px]
              border-4 border-[#fff]
              shadow-xl
              px-6 py-7
              flex flex-col gap-4
              relative
            "
            style={{ minWidth: "320px" }}
          >
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-[#6D3811] font-semibold text-[1rem]">
                <svg width="20" height="20" fill="#6D3811" viewBox="0 0 16 16">
                  <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm0 1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2V4a1 1 0 0 1 1-1zm13 2.383v6.634l-4.803-2.882L15 5.383zm-1.034 7.034H2.034l4.803-2.882 1.163.698 1.163-.698 4.803 2.882zM1 5.383l4.803 2.882L1 12.017V5.383z"/>
                </svg>
                Message
              </label>
              <textarea
                placeholder="Type your message..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                required
                className={`
                  w-full p-3 pl-4 pr-4
                  rounded-[8px]
                  bg-[#f6e7d2]
                  border-2 ${errors.message ? "border-red-500" : "border-[#cbb08a]"}
                  text-[#6D3811] text-[1rem]
                  focus:outline-none focus:border-[#6D3811]
                  resize-none
                  transition-all
                `}
              />
              {errors.message && (
                <p className="text-red-600 text-sm mt-1">{errors.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="
                w-full flex flex-row justify-center items-center gap-2
                py-3
                text-[1.1rem] font-bold
                bg-[#6D3811]
                text-white
                rounded-[8px]
                hover:bg-[#4a240c]
                transition-all
                shadow
                mt-2
              "
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
              </svg>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
