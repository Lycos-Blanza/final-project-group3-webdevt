import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

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
      reservations.forEach(res => {
        all.push({ ...res, email });
      });
    }
  }
  return all;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [reservations, setReservationsState] = useState([]);

  useEffect(() => {
    if (user?.email) {
      setReservationsState(getReservations(user.email));
    } else {
      setReservationsState([]);
    }
  }, [user]);

  const login = (email, password) => {
    if (email === 'user@gmail.com' && password === '1234') {
      setUser({ email, role: 'user' });
      setReservationsState(getReservations(email));
      return true;
    }
    if (email === 'admin@gmail.com' && password === '12345') {
      setUser({ email, role: 'admin' });
      setReservationsState(getReservations(email));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setReservationsState([]);
  };

  const addReservation = (reservation) => {
    if (!user?.email) return;
    const updated = [
      ...reservations,
      { ...reservation, status: 'processing' }
    ];
    setReservations(user.email, updated);
    setReservationsState(updated);
  };

  const removeReservation = (id) => {
    if (!user?.email) return;
    const updated = reservations.filter(res => res.id !== id);
    setReservations(user.email, updated);
    setReservationsState(updated);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      reservations,
      addReservation,
      removeReservation,
      getAllReservations
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
