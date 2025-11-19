// src/components/ProfileForm.jsx
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext";

export default function ProfileForm() {
  const { user, updateProfile } = useAuth();
  const notify = useNotification();
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

  // Load latest saved data when form opens
  useEffect(() => {
    if (user?.email) {
      const saved = JSON.parse(localStorage.getItem("diner28_profiles") || "{}");
      const data = saved[user.email] || {};
      setForm(prev => ({
        ...prev,
        name: data.name || user.name || "",
        contact: data.contact || "",
      }));
      setProfilePic(data.profilePic || user.profilePic || "");
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      notify("Please select an image", "error");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setProfilePic(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (form.password && form.password !== form.confirmPassword) {
      notify("Passwords do not match", "error");
      setLoading(false);
      return;
    }

    const updates = {
      name: form.name,
      contact: form.contact,
      profilePic: profilePic,
    };

    // Save to localStorage
    const all = JSON.parse(localStorage.getItem("diner28_profiles") || "{}");
    all[user.email] = updates;
    localStorage.setItem("diner28_profiles", JSON.stringify(all));

    // Save password
    if (form.password) {
      localStorage.setItem(`password_${user.email}`, form.password);
    }

    // Update context so UI updates instantly
    updateProfile(updates);

    notify("Profile updated successfully!", "success");
    setForm({ ...form, password: "", confirmPassword: "" });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Your JSX exactly as before */}
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 mb-4">
          <img
            src={profilePic || "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-4 border-[#E9D3BE] shadow-md"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 bg-[#6D3811] text-white p-2 rounded-full shadow-lg hover:bg-[#5a2e0d] text-xs"
          >
            Edit
          </button>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
      </div>

      <h3 className="text-xl font-bold text-[#6d4c1b]">Edit Profile</h3>

      <input
        type="text"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
        className="w-full p-3 rounded bg-[#6D3811]/20"
        placeholder="Name"
      />

      <input
        type="tel"
        value={form.contact}
        onChange={(e) => setForm({ ...form, contact: e.target.value })}
        placeholder="Contact Number"
        className="w-full p-3 rounded bg-[#6D3811]/20"
      />

      <div className="space-y-3 pt-4 border-t">
        <h4 className="font-semibold">Change Password (optional)</h4>
        <input
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="New password"
          className="w-full p-3 rounded bg-[#6D3811]/20"
        />
        <input
          type={showPassword ? "text" : "password"}
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          placeholder="Confirm password"
          className="w-full p-3 rounded bg-[#6D3811]/20"
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-sm">
          {showPassword ? "Hide" : "Show"} password
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg font-bold text-white ${loading ? "bg-gray-500" : "bg-[#6D3811] hover:bg-[#5a2e0d]"}`}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}