import React from "react";
import { useAuth } from "../contexts/AuthContext";
import Topbar from "../components/Topbar";
import { Link } from "react-router-dom";

export default function MyReservations() {
  const { user, reservations } = useAuth();

  return (
    <>
      <Topbar />

      {/* page container */}
      <div className="pt-[56px] mx-auto max-w-[1200px] px-4 bg-[#f6f0e7] min-h-screen relative">

        {/* back btn */}
        <Link
          to="/"
          className="
            absolute top-[72px] left-0 z-10 inline-block
            text-[#222] no-underline font-medium text-[1rem]
            transition-colors duration-200
            bg-white px-3 py-1 rounded-md
            shadow-[0_2px_8px_rgba(0,0,0,0.04)]
            hover:text-[#c00]
          "
        >
          ← Back
        </Link>

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
                      flex gap-8
                      text-[1.1rem] text-black
                    "
                  >
                    <span>Date: {res.date}</span>
                    <span>Time: {res.time}</span>
                    <span>Guests: {res.guests}</span>
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
