// src/hooks/useAvailability.js
import { useAuth } from '../contexts/AuthContext';
import { useTables } from '../contexts/TablesContext';

export function useAvailability() {
  const { getAllReservations, STATUS } = useAuth();
  const { tables } = useTables();

  const isSlotAvailable = (date, time, guests, excludeId = null) => {
    const reservations = getAllReservations().filter(r =>
      r.date === date &&
      r.time === time &&
      r.status !== STATUS.CANCELED &&
      r.id !== excludeId
    );

    let bookedGuests = 0;
    reservations.forEach(r => {
      const table = tables.find(t => t.id === r.tableId);
      if (table) bookedGuests += r.guests;
    });

    const availableCapacity = tables.reduce((sum, t) => sum + t.capacity, 0) - bookedGuests;
    return availableCapacity >= guests;
  };

  return { isSlotAvailable };
}