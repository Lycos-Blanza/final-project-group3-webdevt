// src/pages/AdminTables.jsx → FINAL: FULLY FUNCTIONAL + LOCALSTORAGE + EDIT/CANCEL
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTables } from "../contexts/TablesContext";
import { useNotification } from "../contexts/NotificationContext";

export default function AdminTables() {
  const { user } = useAuth();
  const { tables = [], addTable, updateTable, deleteTable } = useTables();
  const notify = useNotification();

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ number: "", capacity: "" });

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center pt-20">
        <div className="text-center p-10 bg-white rounded-2xl shadow-xl border">
          <h2 className="text-2xl font-bold text-red-600 mb-3">Access Denied</h2>
          <p className="text-gray-700">Restaurant managers only</p>
        </div>
      </div>
    );
  }

  const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedNumber = form.number.trim();
    const capacityNum = Number(form.capacity);

    if (!trimmedNumber || !capacityNum || capacityNum < 1) {
      notify("Please enter valid table number and capacity", "error");
      return;
    }

    // Prevent duplicate table numbers
    const exists = tables.some(t => t.number.toLowerCase() === trimmedNumber.toLowerCase() && t.id !== editingId);
    if (exists) {
      notify(`Table ${trimmedNumber} already exists!`, "error");
      return;
    }

    const tableData = {
      id: editingId || generateId(),
      number: trimmedNumber,
      capacity: capacityNum,
    };

    if (editingId) {
      updateTable(editingId, tableData);
      notify(`Table ${tableData.number} updated successfully`, "success");
      setEditingId(null);
    } else {
      addTable(tableData);
      notify(`Table ${tableData.number} added successfully`, "success");
    }

    setForm({ number: "", capacity: "" });
  };

  const startEdit = (table) => {
    setEditingId(table.id);
    setForm({ number: table.number, capacity: table.capacity });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ number: "", capacity: "" });
  };

  const handleDelete = (table) => {
    if (window.confirm(`Delete Table ${table.number} permanently?`)) {
      deleteTable(table.id);
      notify(`Table ${table.number} deleted`, "info");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 pt-20 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-[#5C3A2E] tracking-tight">
            Table Management
          </h1>
          <p className="text-lg text-[#8B5A3C] mt-2">Diner 28 • Floor Plan</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 mb-10">
          <h2 className="text-xl font-bold text-[#5C3A2E] mb-6">
            {editingId ? "Edit Table" : "Add New Table"}
          </h2>

          <form onSubmit={handleSubmit} className="grid sm:grid-cols-3 gap-5 items-end">
            <div>
              <label className="block text-sm font-semibold text-[#8B5A3C] mb-2">Table Number</label>
              <input
                type="text"
                placeholder="e.g. TT1"
                value={form.number}
                onChange={(e) => setForm({ ...form, number: e.target.value })}
                className="w-full px-5 py-3 rounded-xl bg-[#FFF8F0] text-[#5C3A2E] focus:outline-none focus:ring-2 focus:ring-[#5C3A2E]/30"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#8B5A3C] mb-2">Capacity</label>
              <input
                type="number"
                min="1"
                max="20"
                placeholder="6"
                value={form.capacity}
                onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                className="w-full px-5 py-3 rounded-xl bg-[#FFF8F0] text-[#5C3A2E] focus:outline-none focus:ring-2 focus:ring-[#5C3A2E]/30"
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-8 py-3 bg-[#5C3A2E] text-white font-bold rounded-xl hover:bg-[#4a2e24] transition"
              >
                {editingId ? "Update" : "Add"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-6 py-3 bg-gray-400 text-white font-bold rounded-xl hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {tables.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-white rounded-2xl shadow">
              <p className="text-xl text-gray-500">No tables yet</p>
              <p className="text-sm text-gray-400 mt-2">Add your first table above</p>
            </div>
          ) : (
            tables.map((table) => (
              <div
                key={table.id}
                className="group bg-white rounded-2xl shadow-md border border-amber-100 overflow-hidden transition-all hover:shadow-xl hover:border-amber-300"
              >
                <div className="h-2 bg-gradient-to-r from-amber-400 to-orange-500"></div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-black text-[#5C3A2E] mb-1">
                    {table.number}
                  </h3>
                  <p className="text-xl font-bold text-[#8B5A3C]">{table.capacity}</p>
                  <p className="text-xs uppercase tracking-wider text-gray-600">Seats</p>
                </div>

                <div className="bg-gray-50 px-4 py-3 flex justify-center gap-5 text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                  <button onClick={() => startEdit(table)} className="text-[#5C3A2E] hover:text-[#4a2e24]">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(table)} className="text-red-600 hover:text-red-700">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}