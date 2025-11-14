// src/pages/MyReservations.jsx
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import CancelReservationButton from "../components/CancelReservationButton";
import UpdateReservationButton from "../components/UpdateReservationButton";

export default function MyReservations() {
  const { user, reservations, STATUS } = useAuth();

  const pendingReservations = reservations.filter(r => r.status === STATUS.PENDING);
  const confirmedReservations = reservations.filter(r => r.status === STATUS.CONFIRMED);
  const canceledReservations = reservations.filter(r => r.status === STATUS.CANCELED);

  return (
    <div className="pt-[56px] mx-auto max-w-[1200px] px-4 bg-[#f6f0e7] min-h-screen relative">
      <div className="flex justify-center items-start pt-20 pb-20">
        <div className="text-black bg-white px-10 py-8 rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] min-w-[350px]">
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
            <>
              {/* Pending */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-yellow-700 mb-2">
                  Pending Reservations
                </h3>
                <div className="mb-2 text-yellow-700 font-medium">
                  {`Pending: ${pendingReservations.length}`}
                </div>
                {pendingReservations.length === 0 ? (
                  <div className="text-gray-500 mb-4">No pending reservations.</div>
                ) : (
                  <ul className="list-none p-0">
                    {pendingReservations.map((res) => (
                      <li key={res.id} className="py-3 border-b border-[#eee] flex flex-col gap-2 text-[1.1rem] text-black">
                        <div className="flex gap-8 items-center">
                          <span>Date: {res.date}</span>
                          <span>Time: {res.time}{res.endTime ? ` - ${res.endTime}` : ""}</span>
                          <span>Guests: {res.guests}</span>
                          <span>
                            Status: <span className="text-yellow-600 font-semibold">Pending</span>
                          </span>
                          <CancelReservationButton reservationId={res.id} />
                          <UpdateReservationButton reservation={res} />
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

              {/* Confirmed */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-green-700 mb-2">
                  Confirmed Reservations
                </h3>
                <div className="mb-2 text-green-700 font-medium">
                  {`Confirmed: ${confirmedReservations.length}`}
                </div>
                {confirmedReservations.length === 0 ? (
                  <div className="text-gray-500 mb-4">No confirmed reservations.</div>
                ) : (
                  <ul className="list-none p-0">
                    {confirmedReservations.map((res) => (
                      <li key={res.id} className="py-3 border-b border-[#eee] flex flex-col gap-2 text-[1.1rem] text-black">
                        <div className="flex gap-8 items-center">
                          <span>Date: {res.date}</span>
                          <span>Time: {res.time}{res.endTime ? ` - ${res.endTime}` : ""}</span>
                          <span>Guests: {res.guests}</span>
                          <span>
                            Status: <span className="text-green-600 font-semibold">Confirmed</span>
                          </span>
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

              {/* Canceled */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-red-700 mb-2">
                  Canceled Reservations
                </h3>
                <div className="mb-2 text-red-700 font-medium">
                  {`Canceled: ${canceledReservations.length}`}
                </div>
                {canceledReservations.length === 0 ? (
                  <div className="text-gray-500 mb-4">No canceled reservations.</div>
                ) : (
                  <ul className="list-none p-0">
                    {canceledReservations.map((res) => (
                      <li key={res.id} className="py-3 border-b border-[#eee] flex flex-col gap-2 text-[1.1rem] text-black">
                        <div className="flex gap-8 items-center">
                          <span>Date: {res.date}</span>
                          <span>Time: {res.time}{res.endTime ? ` - ${res.endTime}` : ""}</span>
                          <span>Guests: {res.guests}</span>
                          <span>
                            Status: <span className="text-red-600 font-semibold">Canceled</span>
                          </span>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}