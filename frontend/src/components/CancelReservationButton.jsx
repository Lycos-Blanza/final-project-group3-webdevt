import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import CancelReservationModal from "./CancelReservationModal";

export default function CancelReservationButton({ reservationId }) {
  const { removeReservation } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const handleCancelClick = () => {
    setModalOpen(true);
  };

  const handleConfirm = () => {
    removeReservation(reservationId);
    setModalOpen(false);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button
        className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        onClick={handleCancelClick}
      >
        Cancel
      </button>
      <CancelReservationModal
        open={modalOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}
