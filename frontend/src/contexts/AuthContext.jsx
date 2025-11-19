// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { generateToken, verifyToken } from "../utils/jwt";

const AuthContext = createContext();

export const STATUS = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  COMPLETED: "Completed",
  CANCELED: "Canceled",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [allReservations, setAllReservations] = useState([]);
  const [messages, setMessages] = useState([]);

  // Load saved data when app starts
  useEffect(() => {
    try {
      const token = localStorage.getItem("diner28_token");
      if (token) {
        const payload = verifyToken(token);
        if (payload?.email) {
          const profiles = JSON.parse(localStorage.getItem("diner28_profiles") || "{}");
          const saved = profiles[payload.email] || {};
          setUser({ ...payload, ...saved });
        }
      }

      const res = localStorage.getItem("diner28_reservations");
      if (res) setAllReservations(JSON.parse(res));

      const msg = localStorage.getItem("diner28_messages");
      if (msg) setMessages(JSON.parse(msg));
    } catch (e) {
      console.error("Error loading auth data:", e);
    }
  }, []);

  const login = (email, password) => {
    // Hardcoded accounts
    if (email === "admin@diner28.com" && password === "admin123") {
      const admin = { email, role: "admin" };
      const token = generateToken(admin);
      localStorage.setItem("diner28_token", token);
      setUser(admin);
      return true;
    }

    if (email === "customer@diner28.com" && password === "customer123") {
      const customer = { email, role: "customer", name: "Customer" };
      const token = generateToken(customer);
      localStorage.setItem("diner28_token", token);
      setUser(customer);
      return true;
    }

    // Normal users
    const users = JSON.parse(localStorage.getItem("diner28_users") || "[]");
    const found = users.find(u => u.email === email);
    const savedPass = localStorage.getItem(`password_${email}`);
    const correctPass = savedPass || found?.password;

    if (found && password === correctPass) {
      const profiles = JSON.parse(localStorage.getItem("diner28_profiles") || "{}");
      const saved = profiles[email] || {};

      const loggedUser = {
        email,
        role: "customer",
        name: saved.name || found.name || email.split("@")[0],
        contact: saved.contact || "",
        profilePic: saved.profilePic || "",
      };

      const token = generateToken(loggedUser);
      localStorage.setItem("diner28_token", token);
      setUser(loggedUser);
      return true;
    }

    return false;
  };

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("diner28_users") || "[]");
    if (users.some(u => u.email === email)) return false;

    users.push({ name, email, password });
    localStorage.setItem("diner28_users", JSON.stringify(users));

    const profiles = JSON.parse(localStorage.getItem("diner28_profiles") || "{}");
    profiles[email] = { name };
    localStorage.setItem("diner28_profiles", JSON.stringify(profiles));

    const token = generateToken({ email, role: "customer", name });
    localStorage.setItem("diner28_token", token);
    setUser({ email, role: "customer", name });
    return true;
  };

  const updateProfile = (updates) => {
    if (!user?.email) return;

    const profiles = JSON.parse(localStorage.getItem("diner28_profiles") || "{}");
    profiles[user.email] = { ...profiles[user.email], ...updates };
    localStorage.setItem("diner28_profiles", JSON.stringify(profiles));

    // Save new password so login works after logout
    if (updates.password) {
      localStorage.setItem(`password_${user.email}`, updates.password);
    }

    setUser(prev => ({ ...prev, ...updates }));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("diner28_token");
  };

  const addMessage = (msg) => {
    const profiles = JSON.parse(localStorage.getItem("diner28_profiles") || "{}");
    const name = msg.name || profiles[user?.email]?.name || user?.name || "Guest";
    const newMsg = { ...msg, name, id: Date.now(), date: new Date().toISOString() };
    const updated = [...messages, newMsg];
    setMessages(updated);
    localStorage.setItem("diner28_messages", JSON.stringify(updated));
  };

  const addReservation = (res) => {
    const newRes = {
      ...res,
      id: Date.now(),
      status: STATUS.PENDING,
      email: user.email,
      createdAt: new Date().toISOString(),
    };
    const updated = [...allReservations, newRes];
    setAllReservations(updated);
    localStorage.setItem("diner28_reservations", JSON.stringify(updated));
  };

  const getUserReservations = () => allReservations.filter(r => r.email === user?.email);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateProfile,
        messages,
        addMessage,
        reservations: user ? getUserReservations() : [],
        addReservation,
        STATUS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export default AuthProvider;