import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import { Room } from "../App";

const BookingForm = ({ availableRooms }: { availableRooms: Room[] }) => {
  const [selectedRoomId, setSelectedRoomId] = useState<number | string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!selectedRoomId || !customerName || !startDate || !endDate) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    const bookingData = {
      category:
        availableRooms.find((room) => room.id === selectedRoomId)?.category ||
        "",
      pricePerNight: 100,
      isAvailable: true,
      bookings: [
        {
          customerName,
          startDate,
          endDate,
          room: { id: selectedRoomId, category: "" },
        },
      ],
    };

    try {
      await axios.post("http://localhost:5187/api/Room", bookingData);
      alert("Room booked successfully");
    } catch (error) {
      console.error("Error booking room:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <FormControl fullWidth margin="normal">
        <InputLabel>Room</InputLabel>
        <Select
          value={selectedRoomId}
          onChange={(e) => setSelectedRoomId(e.target.value)}
        >
          {availableRooms.map((room) => (
            <MenuItem value={room.id} key={room.id}>
              {room.category}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Choose a room</FormHelperText>
      </FormControl>

      <TextField
        label="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Start Date"
        type="datetime-local"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="End Date"
        type="datetime-local"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Button
        onClick={handleSubmit}
        variant="contained"
        fullWidth
        disabled={loading}
      >
        {loading ? "Booking..." : "Book Room"}
      </Button>
    </div>
  );
};

export default BookingForm;
