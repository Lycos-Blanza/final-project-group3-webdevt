import React from "react";

export default function CancelReservationModal({ open, onClose, onConfirm }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px]">
        <h3 className="text-lg font-bold mb-2 text-gray-800">Cancel Reservation</h3>
        <p className="mb-4 text-gray-700">Are you sure you want to cancel this reservation?</p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            No, keep
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onConfirm}
          >
            Yes, cancel
          </button>
        </div>
      </div>
    </div>
  );
}
