import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SearchField from "../Table/customSearch";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import SlotBooking from "./slots";

const AddDoctor = () => {
  const [searchValue, setSearchValue] = useState("");
  const [value, setValue] = useState("");
  const [fromDate, setFromDate] = useState({
    hour: "",
    minute: "",
    ampm: "",
  });

  const [toDate, setToDate] = useState({
    hour: "",
    minute: "",
    ampm: "",
  });

  const [docSlot, setDocSlot] = useState([]);
  const [days, setDays] = useState({
    Allday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
    Reset: 0,
  });

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchValue);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleDateChange = (event, type, target) => {
    if (type === "fromDate") {
      setFromDate({ ...fromDate, [target]: event.target.value });
    } else {
      setToDate({ ...toDate, [target]: event.target.value });
    }
  };

  const handeDocSlotChange = (event) => {
    const {
      target: { value },
    } = event;
    setDocSlot(typeof value === "string" ? value.split(",") : value);
    console.log(event.target)
    if(value.includes("Reset")){
      const newObj = Object.fromEntries(
        Object.entries(days).map(([key, value]) => [
          key,0
        ])
      );
      setDays(newObj);
      setDocSlot([])
    }
    else{
      if (value.includes("Allday")) {
        const newObj = Object.fromEntries(
          Object.entries(days).map(([key, value]) => [
            key,
            key === "Allday" ? 0 : key=== 'Reset'?0:1,
          ])
        );
        setDays(newObj);
      } else {
        const newObj = Object.fromEntries(
          Object.entries(days).map(([key, a]) => [
            key,
            value.includes(key) ? 1 : 0,
          ])
        );
        setDays(newObj);
        console.log(newObj);
      }
    }

  };
  // console.log(typeof docSlot)

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        minHeight: "80vh",
        borderRadius: "9px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 2,
          backgroundColor: "#90e0ef",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ color: "#0077b6" }}>
          <b> Add Doctor </b>
        </Typography>
        <SearchField
          value={searchValue}
          onChange={handleSearchChange}
          onSearch={handleSearch}
        />
      </Box>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={6}>
          <TextField
            label="Doctor Name"
            fullWidth
            size="small"
            placeholder="Doctor Name"
            type="text"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Doctor Mobile Number"
            placeholder="Mobile Number"
            type="number"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Doctor Email ID"
            placeholder="Email"
            type="email"
            fullWidth
            size="small"
          />
        </Grid>
      </Grid>
      <Divider width="100%" height="10px" sx={{ mt: 2 }} />

      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={6}>
          <TextField
            label="Time Interval(Ex : 30 mins)"
            fullWidth
            size="small"
            placeholder="Please Enter Time Interval"
            type="text"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Consultation Fee"
            placeholder="please Enter Consultation Fee"
            type="number"
            fullWidth
            size="small"
          />
        </Grid>
      </Grid>
      <Divider width="100%" height="10px" sx={{ mt: 2 }} />

      <FormControl sx={{ p: 2 }}>
        <FormLabel id="demo-controlled-radio-buttons-group">
          Select Working Hours
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="allDay"
            control={<Radio />}
            label="All Days"
          />
          <FormControlLabel
            value="selectDay"
            control={<Radio />}
            label="Select Days"
          />
        </RadioGroup>
      </FormControl>

      {value === "allDay" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "end",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1">From Time</Typography>
            </Box>
            <TextField
              label="Hour"
              select
              value={fromDate.hour}
              onChange={(e) => handleDateChange(e, "fromDate", "hour")}
              sx={{ width: "50%" }}
              size="small"
            >
              {[...Array(12)].map((_, i) => (
                <MenuItem key={i} value={String(i + 1)}>
                  {String(i + 1)}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Minute"
              select
              value={fromDate.minute}
              onChange={(e) => handleDateChange(e, "fromDate", "minute")}
              sx={{ width: "50%" }}
              size="small"
            >
              {Array.from({ length: 60 }, (_, i) => i).map((num) => (
                <MenuItem key={num} value={String(num)}>
                  {num < 10 ? `0${num}` : num}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="AM/PM"
              select
              value={fromDate.ampm}
              onChange={(e) => handleDateChange(e, "fromDate", "ampm")}
              sx={{ width: "50%" }}
              size="small"
            >
              <MenuItem value="AM">AM</MenuItem>
              <MenuItem value="PM">PM</MenuItem>
            </TextField>
          </Box>

          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1">To Time</Typography>
            </Box>
            <TextField
              label="Hour"
              select
              value={toDate.hour}
              onChange={(e) => handleDateChange(e, "toDate", "hour")}
              sx={{ width: "50%" }}
              size="small"
            >
              {[...Array(12)].map((_, i) => (
                <MenuItem key={i} value={String(i + 1)}>
                  {String(i + 1)}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Minute"
              select
              value={toDate.minute}
              onChange={(e) => handleDateChange(e, "toDate", "minute")}
              sx={{ width: "50%" }}
              size="small"
            >
              {Array.from({ length: 60 }, (_, i) => i).map((num) => (
                <MenuItem key={num} value={String(num)}>
                  {num < 10 ? `0${num}` : num}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="AM/PM"
              select
              value={toDate.ampm}
              onChange={(e) => handleDateChange(e, "toDate", "ampm")}
              sx={{ width: "50%" }}
              size="small"
            >
              <MenuItem value="AM">AM</MenuItem>
              <MenuItem value="PM">PM</MenuItem>
            </TextField>
          </Box>
        </Box>
      )}

      {value === "selectDay" && (
        <Box>
          <SlotBooking />
        </Box>
      )}

      <Box sx={{ display: "flex" }}>
        <Select
          label="Select Day"
          size="small"
          multiple
          fullWidth
          value={docSlot}
          onChange={(e) => handeDocSlotChange(e)}
        >
          {Object.keys(days).map((day, i) => (
              <MenuItem
                key={i}
                id={day}
                value={day}
                disabled={days[day] == 1 ? true : false}
                sx={{ color: day === "Reset" ? "red" : "black",fontSize:day==='Reset'&& '12px' }}
              >
                {day}
              </MenuItem>
          ))}
        </Select>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Button variant="contained" color="success" size="small">
          Submit
        </Button>
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Box sx={{ display: "flex", p: 2, flexDirection: "column" }}>
        <Typography variant="subtitle1" fontWeight={"bold"}>
          Register New Doctor
        </Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            placeholder="Doctor's Email-ID"
            size="small"
            type="email"
            fullWidth
          />
          <Button variant="contained" size="small" color="warning">
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddDoctor;
