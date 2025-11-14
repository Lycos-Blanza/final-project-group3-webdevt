import React, { useState } from 'react';

export default function ReservationStatusUpdater({ status, onUpdate, STATUS }) {
  const [selected, setSelected] = useState(status);
  const [showModal, setShowModal] = useState(false);

  const handleUpdateClick = () => setShowModal(true);
  const handleConfirm = () => {
    onUpdate(selected);
    setShowModal(false);
  };
  const handleCancel = () => setShowModal(false);

  return (
    <div className="flex items-center gap-2">
      <select
        value={selected}
        onChange={e => setSelected(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1 bg-white focus:ring-2 focus:ring-blue-500"
      >
        <option value={STATUS.PENDING}>Pending</option>
        <option value={STATUS.CONFIRMED}>Confirmed</option>
        <option value={STATUS.CANCELED}>Canceled</option>
      </select>
      <button
        onClick={handleUpdateClick}
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
      >
        UPDATE
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px]">
            <h3 className="text-lg font-semibold mb-4">Confirm Status Update</h3>
            <p className="mb-6">
              Are you sure you want to update the status to <span className="font-bold">{selected}</span>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
