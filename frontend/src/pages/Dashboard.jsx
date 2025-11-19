// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTables } from "../contexts/TablesContext";
import { useNotification } from "../contexts/NotificationContext";
import ConfirmDialog from "../components/ConfirmDialog";

export default function Dashboard() {
  const { user, getAllReservations, updateReservation, STATUS } = useAuth();
  const { tables } = useTables();
  const notify = useNotification();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedResId, setSelectedResId] = useState(null);

  if (!user || user.role !== "admin") {
    return (
      <div className="pt-14 p-6 text-center text-red-600">
        Access denied. Admins only.
      </div>
    );
  }

  const all = getAllReservations();
  const filtered = all.filter((r) => {
    const matchesSearch =
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.date.includes(search);
    const matchesFilter = filter === "all" || r.status === filter;
    return matchesSearch && matchesFilter;
  });

  const pending = filtered.filter((r) => r.status === STATUS.PENDING);
  const confirmed = filtered.filter((r) => r.status === STATUS.CONFIRMED || r.status === STATUS.COMPLETED);
  const canceled = filtered.filter((r) => r.status === STATUS.CANCELED);
  const completed = filtered.filter((r) => r.status === STATUS.COMPLETED);

  const avgRating =
    completed.length > 0
      ? (
          completed.reduce((sum, r) => sum + (r.rating || 0), 0) /
          completed.filter((r) => r.rating).length
        ).toFixed(1)
      : "N/A";

  const handleConfirm = (id) => {
    updateReservation({ id, status: STATUS.CONFIRMED });
    notify("Reservation confirmed!", "success");
  };

  const handleCancelClick = (id) => {
    setSelectedResId(id);
    setShowConfirm(true);
  };

  const handleCancelConfirm = () => {
    if (selectedResId) {
      updateReservation({ id: selectedResId, status: STATUS.CANCELED });
      notify("Reservation canceled.", "error");
    }
    setShowConfirm(false);
    setSelectedResId(null);
  };

  const handleCancelClose = () => {
    setShowConfirm(false);
    setSelectedResId(null);
  };

  return (
    <div className="pt-14 p-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#6D3811]">
        Admin Dashboard
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by email or date..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-[#6D3811]/20 hover:bg-[#6D3811]/25"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-3 rounded-lg bg-[#6D3811]/20 hover:bg-[#6D3811]/25 cursor-pointer"
        >
          <option value="all">All</option>
          <option value={STATUS.PENDING}>Pending</option>
          <option value={STATUS.CONFIRMED}>Confirmed</option>
          <option value={STATUS.CANCELED}>Canceled</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 p-5 rounded-xl text-center shadow">
          <p className="text-3xl font-bold text-blue-700">{filtered.length}</p>
          <p className="text-sm text-gray-600">Filtered</p>
        </div>
        <div className="bg-green-50 p-5 rounded-xl text-center shadow">
          <p className="text-3xl font-bold text-green-700">{confirmed.length}</p>
          <p className="text-sm text-gray-600">Confirmed / Rated</p>
        </div>
        <div className="bg-yellow-50 p-5 rounded-xl text-center shadow">
          <p className="text-3xl font-bold text-yellow-700">{avgRating} Stars</p>
          <p className="text-sm text-gray-600">Avg Rating</p>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-semibold text-[#6d4c1b] mb-4">
          Pending ({pending.length})
        </h3>
        {pending.length === 0 ? (
          <div>
            <h1 className="text-[100px] text-center m-none select-none">🙌</h1>
            <p className="text-center text-[#6D3811]/75 p-none">Hooray! You have no pending reservations!</p>
          </div>
        ) : (
          // Change from space-y-4 to grid for side-by-side cards
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {pending.map((res) => (
              <div
                key={res.id}
                className="rounded-2xl border shadow-lg bg-white p-0 flex flex-col items-center max-w-xs mx-auto"
                style={{ minWidth: 285 }}
              >
                {/* Icon */}
                <div className="w-full flex justify-center pt-6">
                  <div className="bg-[#E2C98A] rounded-full w-20 h-20 flex items-center justify-center">
                    {/* Hourglass SVG (from SidebarMenu) */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 16 16">
                      <path d="M2 1.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1-.5-.5m2.5.5v1a3.5 3.5 0 0 0 1.989 3.158c.533.256 1.011.791 1.011 1.491v.702s.18.149.5.149.5-.15.5-.15v-.7c0-.701.478-1.236 1.011-1.492A3.5 3.5 0 0 0 11.5 3V2z" fill="#6D3811"/>
                    </svg>
                  </div>
                </div>
                {/* Details */}
                <div className="w-full px-6 py-4 flex flex-col gap-1">
                  <div className="flex items-center gap-2 mb-1">
                    {/* Person SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6D3811" className="bi bi-person-fill" viewBox="0 0 16 16">
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg>
                    <span className="font-bold text-[#6D3811] text-lg">{res.name || res.email.split('@')[0]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6D3811] mb-1">
                    {/* Email SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6D3811" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555z"/>
                      <path d="M0 4.697v7.104l5.803-3.651L0 4.697zm6.761 3.83l-6.57 4.13A2 2 0 0 0 2 14h12a2 2 0 0 0 1.809-1.343l-6.57-4.13L8 9.586l-1.239-.76z"/>
                      <path d="M16 4.697l-5.803 3.653L16 11.801V4.697z"/>
                    </svg>
                    <span>{res.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6D3811] mb-1">
                    {/* Calendar SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6D3811" className="bi bi-calendar-event-fill" viewBox="0 0 16 16">
                      <path d="M4 .5a.5.5 0 0 1 .5.5V2h6V1a.5.5 0 0 1 1 0v1h1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h1V1a.5.5 0 0 1 .5-.5zM2 5v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5H2zm7 4a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 9 9z"/>
                    </svg>
                    <span>{res.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6D3811] mb-1">
                    {/* Clock SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6D3811" className="bi bi-clock-fill" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM7.5 4a.5.5 0 0 1 1 0v4a.5.5 0 0 1-.276.447l-3 1.5a.5.5 0 1 1-.448-.894L7.5 7.803V4z"/>
                    </svg>
                    <span>{res.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6D3811] mb-1">
                    {/* Table SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6D3811" className="bi bi-table" viewBox="0 0 16 16">
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z"/>
                    </svg>
                    <span>{tables.find(t => t.id === res.tableId)?.number || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6D3811] mb-1">
                    {/* Guests SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6D3811" className="bi bi-people-fill" viewBox="0 0 16 16">
                      <path d="M13 7c0 1.105-.672 2-1.5 2S10 8.105 10 7s.672-2 1.5-2S13 5.895 13 7zm-7 0c0 1.105-.672 2-1.5 2S3 8.105 3 7s.672-2 1.5-2S6 5.895 6 7zm9 5c0-1.105-2.239-2-5-2s-5 .895-5 2v1h10v-1z"/>
                    </svg>
                    <span>{res.guests}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6D3811] mb-1">
                    {/* Notes SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6D3811" className="bi bi-stickies-fill" viewBox="0 0 16 16">
                      <path d="M3 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h6.5a.5.5 0 0 0 .354-.146l4-4A.5.5 0 0 0 14 9.5V2a2 2 0 0 0-2-2H3zm7 11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v7.5a.5.5 0 0 1-.146.354l-4 4A.5.5 0 0 1 7.5 14H3a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v7.5a.5.5 0 0 1-.146.354l-4 4A.5.5 0 0 1 7.5 14H3z"/>
                    </svg>
                    <span>{res.note ? res.note : "No notes"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6D3811] mb-2">
                    {/* Pending SVG (Hourglass) */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6D3811" className="bi bi-hourglass-split" viewBox="0 0 16 16">
                      <path d="M2.5 15a.5.5 0 0 1-.5-.5V14a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5h-11zm0-13a.5.5 0 0 1-.5-.5V1a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5h-11zm1.5 2.5v2.5a3.5 3.5 0 0 0 2.5 3.356V11a.5.5 0 0 0 1 0V8.356A3.5 3.5 0 0 0 12 5.5V3H4zm8 0v2.5a2.5 2.5 0 0 1-2 2.45V11a1.5 1.5 0 0 1-3 0V7.95a2.5 2.5 0 0 1-2-2.45V3h7z"/>
                    </svg>
                    <span className="font-semibold">Pending</span>
                  </div>
                </div>
                {/* Buttons */}
                <div className="w-full flex justify-between px-6 pb-6 pt-2 gap-2">
                  <button
                    onClick={() => handleConfirm(res.id)}
                    className="flex-1 bg-[#CFF6D8] text-[#2E7D32] font-semibold py-2 rounded-lg hover:bg-[#B2EFCB] transition flex items-center justify-center gap-1"
                  >
                    {/* Check SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#2E7D32" className="bi bi-check-lg" viewBox="0 0 16 16">
                      <path d="M13.485 1.929a.75.75 0 0 1 1.06 1.06l-8.25 8.25a.75.75 0 0 1-1.06 0l-4.25-4.25a.75.75 0 0 1 1.06-1.06l3.72 3.72 7.72-7.72z"/>
                    </svg>
                    Approve
                  </button>
                  <button
                    onClick={() => handleCancelClick(res.id)}
                    className="flex-1 bg-[#FFD6D6] text-[#D32F2F] font-semibold py-2 rounded-lg hover:bg-[#FFBDBD] transition flex items-center justify-center gap-1"
                  >
                    {/* Close SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#D32F2F" className="bi bi-x-lg" viewBox="0 0 16 16">
                      <path d="M2.146 2.146a.5.5 0 0 1 .708 0L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    Cancel
                  </button>
                </div>
              </div>
            ))}
            <ConfirmDialog
              open={showConfirm}
              title="Cancel Reservation"
              message="Are you sure you want to cancel this reservation?"
              onConfirm={handleCancelConfirm}
              onClose={handleCancelClose}
            />
          </div>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-[#6D3811] mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {filtered.slice(0, 5).map((res) => (
            <div key={res.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium">{res.email}</p>
                <p className="text-sm text-gray-600">{res.date} {res.time} • {res.guests} guests</p>
                {/* Show note if present */}
                {res.note && (
                  <p className="text-sm text-[#6D3811] mt-1">Note: {res.note}</p>
                )}
                {res.rating && <p className="text-sm text-yellow-600">Rated {res.rating} Stars</p>}
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                res.status === STATUS.CONFIRMED || res.status === STATUS.COMPLETED ? "bg-green-100 text-green-800"
                : res.status === STATUS.CANCELED ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
              }`}>
                {res.status === STATUS.COMPLETED ? "Rated" : res.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
