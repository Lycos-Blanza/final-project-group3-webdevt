// src/contexts/TablesContext.jsx → WITH 5 DEFAULT TABLES + FULLY WORKING
import React, { createContext, useContext, useState, useEffect } from "react";

const TablesContext = createContext();

// DEFAULT 5 TABLES — Automatically added on first load
const DEFAULT_TABLES = [
  { id: "tt1", number: "TT1", capacity: 2 },
  { id: "tt2", number: "TT2", capacity: 4 },
  { id: "tt3", number: "TT3", capacity: 4 },
  { id: "tt4", number: "TT4", capacity: 6 },
  { id: "tt5", number: "TT5", capacity: 8 },
];

export function TablesProvider({ children }) {
  const [tables, setTables] = useState([]);

  // Load tables from localStorage OR use defaults
  useEffect(() => {
    const saved = localStorage.getItem("diner28_tables");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTables(parsed.length > 0 ? parsed : DEFAULT_TABLES);
      } catch (e) {
        setTables(DEFAULT_TABLES);
      }
    } else {
      // First time ever — create default tables
      setTables(DEFAULT_TABLES);
      localStorage.setItem("diner28_tables", JSON.stringify(DEFAULT_TABLES));
    }
  }, []);

  // Save to localStorage whenever tables change
  useEffect(() => {
    if (tables.length > 0) {
      localStorage.setItem("diner28_tables", JSON.stringify(tables));
    }
  }, [tables]);

  const addTable = (tableData) => {
    const newTable = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      ...tableData,
    };
    setTables((prev) => [...prev, newTable]);
  };

  const updateTable = (id, updatedData) => {
    setTables((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t))
    );
  };

  const deleteTable = (id) => {
    setTables((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TablesContext.Provider
      value={{
        tables,
        addTable,
        updateTable,
        deleteTable,
      }}
    >
      {children}
    </TablesContext.Provider>
  );
}

export function useTables() {
  const context = useContext(TablesContext);
  if (!context) {
    throw new Error("useTables must be used within TablesProvider");
  }
  return context;
}