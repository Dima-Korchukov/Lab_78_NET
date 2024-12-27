import React, { useState } from "react";
import AvailableRooms from "./pages/AvailableRooms";
import BookingForm from "./pages/BookingForm";
export interface Room {
  id: number;
  category: string;
  pricePerNight: number;
  isAvailable: boolean;
}
const App = () => {
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Hotel Room Booking</h1>
      <AvailableRooms setAvailableRooms={setAvailableRooms} />
      {availableRooms.length > 0 && (
        <BookingForm availableRooms={availableRooms} />
      )}
    </div>
  );
};

export default App;
