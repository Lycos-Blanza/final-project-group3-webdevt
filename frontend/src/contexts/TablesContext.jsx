// src/contexts/TablesContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const TablesContext = createContext();

export function TablesProvider({ children }) {
  const [tables, setTables] = useState(() => {
    const saved = localStorage.getItem('tables');
    return saved ? JSON.parse(saved) : [
      { id: 1, number: 'T1', capacity: 4, status: 'available' },
      { id: 2, number: 'T2', capacity: 6, status: 'available' },
      { id: 3, number: 'T3', capacity: 2, status: 'available' },
      { id: 4, number: 'T4', capacity: 8, status: 'available' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('tables', JSON.stringify(tables));
  }, [tables]);

  const addTable = (table) => setTables([...tables, { ...table, id: Date.now() }]);
  const updateTable = (id, updates) => setTables(tables.map(t => t.id === id ? { ...t, ...updates } : t));
  const deleteTable = (id) => setTables(tables.filter(t => t.id !== id));

  return (
    <TablesContext.Provider value={{ tables, addTable, updateTable, deleteTable }}>
      {children}
    </TablesContext.Provider>
  );
}

export function useTables() {
  return useContext(TablesContext);
}