import React, { FC, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Room } from "../App";

const AvailableRooms: FC<{
  setAvailableRooms: React.Dispatch<React.SetStateAction<Room[]>>;
}> = ({ setAvailableRooms }) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAvailableRooms = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5187/api/Room/available",
        {
          params: { startDate, endDate },
        }
      );
      setRooms(response.data);
      setAvailableRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
        onClick={fetchAvailableRooms}
        variant="contained"
        fullWidth
        disabled={loading}
      >
        {loading ? "Loading..." : "Check Availability"}
      </Button>

      <Grid container spacing={3} marginTop={3}>
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{room.category}</Typography>
                <Typography variant="body1">
                  Price: ${room.pricePerNight} per night
                </Typography>
                <Typography variant="body2">
                  Availability:{" "}
                  {room.isAvailable ? "Available" : "Not Available"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AvailableRooms;
