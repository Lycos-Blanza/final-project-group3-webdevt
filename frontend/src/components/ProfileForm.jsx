// src/components/ProfileForm.jsx
import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext"; // ← ADDED

export default function ProfileForm() {
  const { user, updateProfile } = useAuth();
  const notify = useNotification(); // ← ADDED
  const fileInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    contact: user?.contact || "",
    password: "",
    confirmPassword: "",
  });
  const [profilePic, setProfilePic] = useState(user?.profilePic || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (form.password && form.password !== form.confirmPassword) {
      notify("Passwords do not match", "error");
      setLoading(false);
      return;
    }
    if (form.password && form.password.length < 4) {
      notify("Password must be at least 4 characters", "error");
      setLoading(false);
      return;
    }
    if (form.contact && !/^\d{10,11}$/.test(form.contact.replace(/\D/g, ""))) {
      notify("Contact must be 10-11 digits", "error");
      setLoading(false);
      return;
    }

    const updates = {
      name: form.name,
      contact: form.contact,
    };
    if (form.password) updates.password = form.password;
    if (profilePic) updates.profilePic = profilePic;

    updateProfile(updates);
    notify("Profile updated!", "success");
    setForm({ ...form, password: "", confirmPassword: "" });

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      notify("Please select an image file", "error");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 mb-4">
          <img
            src={
              profilePic ||
              "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
            }
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-4 border-[#E9D3BE] shadow-md"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 cursor-pointer right-0 bg-[#6D3811] text-white p-2 rounded-full shadow-lg hover:bg-[#5a2e0d] transition text-xs"
          >
            Edit
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <h3 className="text-xl font-bold text-[#6d4c1b]">Edit Profile</h3>

      <div className="flex flex-col">
        <span className="text-[#5C3A2E] font-medium">Name</span>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="mt-[6px] flex-1 p-[8px] rounded-[4px] text-[1rem] bg-[#6D3811]/20 hover:bg-[#6D3811]/25"
        />
      </div>

      <div className="flex flex-col">
        <span className="text-[#5C3A2E] font-medium">Contact Number</span>
        <input
          type="tel"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
          placeholder="09171234567"
          className="mt-[6px] flex-1 p-[8px] rounded-[4px] text-[1rem] bg-[#6D3811]/20 hover:bg-[#6D3811]/25"
        />
      </div>

      <div className="space-y-3 pt-4 border-t border-gray-300">
        <h4 className="font-semibold text-[#6d4c1b]">Change Password</h4>
        <div className="flex flex-col">
          <span className="text-[#5C3A2E] font-medium">New Password</span>
          <div className="flex flex-row gap-2 items-center">
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Leave blank to keep current"
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
        <div className="flex flex-col">
          <span className="text-[#5C3A2E] font-medium">Confirm Password</span>
          <div className="flex flex-row gap-2 items-center">
            <input
              type={showPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              placeholder="Repeat new password"
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
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg font-bold flex flex-row cursor-pointer justify-center gap-2 transition ${loading
          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
          : "bg-[#6D3811] text-white text-4 hover:bg-[#5a2e0d]"
          }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-floppy2" viewBox="0 0 16 16">
          <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v3.5A1.5 1.5 0 0 1 11.5 6h-7A1.5 1.5 0 0 1 3 4.5V1H1.5a.5.5 0 0 0-.5.5m9.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z" />
        </svg>
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
