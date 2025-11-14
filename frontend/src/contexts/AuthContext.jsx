// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const STATUS = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  CANCELED: "Canceled"
};

function getReservations(email) {
  const data = localStorage.getItem(`reservations_${email}`);
  return data ? JSON.parse(data) : [];
}

function setReservations(email, reservations) {
  localStorage.setItem(`reservations_${email}`, JSON.stringify(reservations));
}

function getAllReservations() {
  const all = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('reservations_')) {
      const email = key.replace('reservations_', '');
      const reservations = JSON.parse(localStorage.getItem(key));
      reservations.forEach(res => all.push({ ...res, email }));
    }
  }
  return all;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [reservations, setReservationsState] = useState([]);

  // Session Persistence
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 > Date.now()) {
          setUser(payload.user);
          setReservationsState(getReservations(payload.user.email));
        } else {
          logout();
        }
      } catch (err) {
        console.error("Invalid JWT", err);
        logout();
      }
    }
  }, []);

  const login = (email, password) => {
    if (email === 'user@gmail.com' && password === '1234') {
      const userData = { email, role: 'user', name: 'John Doe' };
      const token = btoa(JSON.stringify({ user: userData, exp: Math.floor(Date.now() / 1000) + 3600 }));
      localStorage.setItem('jwt', token);
      setUser(userData);
      setReservationsState(getReservations(email));
      return true;
    }
    if (email === 'admin@gmail.com' && password === '12345') {
      const userData = { email, role: 'admin', name: 'Admin User' };
      const token = btoa(JSON.stringify({ user: userData, exp: Math.floor(Date.now() / 1000) + 3600 }));
      localStorage.setItem('jwt', token);
      setUser(userData);
      return true;
    }
    return false;
  };

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) return false;
    users.push({ name, email, password, role: 'user' });
    localStorage.setItem('users', JSON.stringify(users));
    return login(email, password);
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    setUser(null);
    setReservationsState([]);
    // Navigate will be handled by parent component
  };

  const updateProfile = (updates) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    const token = localStorage.getItem('jwt');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      payload.user = updatedUser;
      const newToken = btoa(JSON.stringify(payload));
      localStorage.setItem('jwt', newToken);
    }
  };

  const addReservation = (res) => {
    if (!user?.email) return;
    const updated = [...reservations, { ...res, status: STATUS.PENDING, id: Date.now() }];
    setReservations(user.email, updated);
    setReservationsState(updated);
  };

  const removeReservation = (id) => {
    if (!user?.email) return;
    const all = getReservations(user.email).map(r =>
      r.id === id ? { ...r, status: STATUS.CANCELED } : r
    );
    setReservations(user.email, all);
    setReservationsState(all);
  };

  const updateReservation = (updatedRes) => {
    if (!user?.email) return;
    const all = getReservations(user.email).map(r =>
      r.id === updatedRes.id && r.status === STATUS.PENDING ? { ...r, ...updatedRes } : r
    );
    setReservations(user.email, all);
    setReservationsState(all);
  };

  return (
    <AuthContext.Provider value={{
      user, login, logout, signup, updateProfile,
      reservations, addReservation, removeReservation, updateReservation,
      getAllReservations, STATUS
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}