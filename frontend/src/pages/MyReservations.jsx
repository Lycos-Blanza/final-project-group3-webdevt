import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import CancelReservationModal from "../components/CancelReservationModal";

export default function MyReservations() {
  const { user, reservations, removeReservation } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleCancelClick = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleConfirm = () => {
    removeReservation(selectedId);
    setModalOpen(false);
    setSelectedId(null);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedId(null);
  };

  return (
    <>
      {/* <Topbar /> */} {/* Remove this line */}

      <CancelReservationModal
        open={modalOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />

      {/* page container */}
      <div className="pt-[56px] mx-auto max-w-[1200px] px-4 bg-[#f6f0e7] min-h-screen relative">

        <div className="flex justify-center items-start pt-20 pb-20">
          <div
            className="
              text-black bg-white
              px-10 py-8 rounded-[8px]
              shadow-[0_2px_8px_rgba(0,0,0,0.08)]
              min-w-[350px]
            "
          >
            <h2 className="text-black text-2xl font-bold">My Reservations</h2>

            {!user ? (
              <div className="text-black mt-4">
                You must <b>login</b> to access this feature.
              </div>
            ) : reservations.length === 0 ? (
              <div className="text-black mt-8 text-[1.1rem]">
                No reservations found.
              </div>
            ) : (
              <ul className="list-none p-0 mt-6">
                {reservations.map((res) => (
                  <li
                    key={res.id}
                    className="
                      py-3 border-b border-[#eee]
                      flex flex-col gap-2
                      text-[1.1rem] text-black
                    "
                  >
                    <div className="flex gap-8 items-center">
                      <span>Date: {res.date}</span>
                      <span>Time: {res.time}</span>
                      <span>Guests: {res.guests}</span>
                      <span>Status: <span className={
                        res.status === 'approved' ? 'text-green-600 font-semibold'
                        : res.status === 'rejected' ? 'text-red-600 font-semibold'
                        : 'text-yellow-600 font-semibold'
                      }>{res.status || 'processing'}</span></span>
                      <button
                        className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        onClick={() => handleCancelClick(res.id)}
                      >
                        Cancel
                      </button>
                    </div>
                    {res.note && (
                      <div className="text-gray-700 text-[1rem] pl-2">
                        <span className="font-medium">Note:</span> {res.note}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
