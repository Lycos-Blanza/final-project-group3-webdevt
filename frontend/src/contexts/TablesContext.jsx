// src/contexts/TablesContext.jsx → 100% FRONTEND ONLY
import { createContext, useContext, useState, useEffect } from "react";

const TablesContext = createContext();

export const useTables = () => {
  const context = useContext(TablesContext);
  if (!context) throw new Error("useTables must be used within TablesProvider");
  return context;
};

export function TablesProvider({ children }) {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("diner28_tables");
    if (saved) {
      setTables(JSON.parse(saved));
    } else {
      // Default tables
      const defaults = [
        { _id: "1", number: "1", capacity: 4 },
        { _id: "2", number: "2", capacity: 6 },
        { _id: "3", number: "3", capacity: 8 },
        { _id: "4", number: "4", capacity: 2 },
        { _id: "5", number: "5", capacity: 10 },
      ];
      localStorage.setItem("diner28_tables", JSON.stringify(defaults));
      setTables(defaults);
    }
  }, []);

  return (
    <TablesContext.Provider value={{ tables }}>
      {children}
    </TablesContext.Provider>
  );
}