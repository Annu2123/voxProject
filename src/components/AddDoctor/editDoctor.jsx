import {
  Box,
  Typography,
  Grid,
  TextField,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  FormGroup,
  Checkbox,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchField from "../Table/customSearch";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getTimeSlot, updateDoc } from "../../actions/Doctor/doctor";

const EditDoctor = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const { state } = location;

  const [docId, setDocId] = useState(state ? state.id : "");
  const [docName, setDocName] = useState(state ? state.name : "");
  const [docNumber, setDocNumber] = useState(state ? state.phone_num : "");
  const [docEmail, setDocEmail] = useState(state ? state.email_id : "");
  const [interval, setInterval] = useState(
    state ? state.consultation_interval : ""
  );
  const [fee, setFee] = useState(state ? state.consultation_fee : "");
  const [department, setDepartment] = useState(state ? state.department : "");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchValue);
  };

  useEffect(() => {
    const id = { id: state?.id };
    dispatch(getTimeSlot(id));
  }, []);

  const timeSlot = useSelector((state) => {
    return state.doctorSlice?.timeSlot;
  });
  console.log(timeSlot);
  const x = {};
  if (timeSlot && timeSlot[0]["day"] !== "all_day") {
    for (let i = 0; i < timeSlot.length; i++) {
      //  x.push({[timeSlot[i]['day']]:{"start_time":timeSlot[i]["time_slot_start"]}})
      x[timeSlot[i]["day"]] = {
        start_time: timeSlot[i]["time_slot_start"],
        end_time: timeSlot[i]["time_slot_end"],
      };
    }
  }
  console.log(x);

  const [slotType, setSlotType] = useState(
    timeSlot && timeSlot[0]["day"] === "all_Day" ? "all_Day" : "selectDay"
  );

  const daysOfWeek = [
    {
      value: "mon",
      day: "Monday",
    },
    {
      value: "tue",
      day: "Tuesday",
    },
    {
      value: "wed",
      day: "Wednesday",
    },
    {
      value: "thu",
      day: "Thursday",
    },
    {
      value: "fri",
      day: "Friday",
    },
    {
      value: "sat",
      day: "Saturday",
    },
    {
      value: "sun",
      day: "Sunday",
    },
  ];
  const [selectedDays, setSelectedDays] = useState(x);
  const [times, setTimes] = useState({});
  const [timeSlots, setTimeSlots] = useState({});
  const handleDayChange = (event) => {
    const { value } = event.target;
    console.log(value);

    if (Object.keys(selectedDays).includes(value)) {
      let y = { ...selectedDays };
      delete y[value];
      setSelectedDays(y);
    } else {
      setSelectedDays({
        ...selectedDays,
        [value]: { start_time: "", end_time: "" },
      });
    }
  };

  const handleTimeChange1 = (day, field) => (event) => {
    const newTimes = {
      ...selectedDays,
      [day]: {
        ...selectedDays[day],
        [field]: event.target.value,
      },
    };
    setSelectedDays(newTimes);
  };

  const handleUpdate = () => {
    const formData = {
      id: docId,
      name: docName,
      phone_num: docNumber,
      email_id: docEmail,
      consultation_interval: interval,
      consultation_fee: fee,
      department: department,
      timeSlot: selectedDays,
    };
    dispatch(updateDoc(formData));
    navigate("/");
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        minHeight: "70vh",
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
          <b> Edit Doctor </b>
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
            label="Doctor Id"
            fullWidth
            size="small"
            placeholder="Doctor ID"
            value={docId}
            readOnly
            sx={{ cursor: "not-allowed" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Doctor Name"
            fullWidth
            size="small"
            placeholder="Doctor Name"
            type="text"
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Doctor Mobile Number"
            placeholder="Mobile Number"
            type="number"
            fullWidth
            size="small"
            value={docNumber}
            onChange={(e) => setDocNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Doctor Email ID"
            placeholder="Email"
            type="email"
            fullWidth
            size="small"
            value={docEmail}
            onChange={(e) => setDocEmail(e.target.value)}
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
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Consultation Fee"
            placeholder="please Enter Consultation Fee"
            type="number"
            fullWidth
            size="small"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
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
          value={slotType}
          onChange={(e) => setSlotType(e.target.value)}
        >
          <FormControlLabel
            value="all_Day"
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

      {slotType === "all_Day" && (
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item xs={6}>
            <TextField
              label="Start Time"
              fullWidth
              size="small"
              placeholder="Start Time"
              type="time"
              value={timeSlot[0]["time_slot_start"]}
              readOnly
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="End Time"
              fullWidth
              size="small"
              placeholder="End Time"
              type="time"
              value={timeSlot[0]["time_slot_end"]}
              readOnly
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      )}

      {slotType === "selectDay" && (
        <Box sx={{ p: 2 }}>
          <FormGroup>
            {daysOfWeek.map((day, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Object.keys(selectedDays).includes(day.value)}
                        onChange={handleDayChange}
                        value={day.value}
                      />
                    }
                    label={day.day}
                  />
                </Grid>
                {Object.keys(selectedDays).includes(day.value) && (
                  <Grid item container xs={6} spacing={1} mt={1}>
                    <Grid item xs={6}>
                      <TextField
                        label="From time"
                        type="time"
                        fullWidth
                        size="small"
                        value={selectedDays[day.value]["start_time"]}
                        onChange={handleTimeChange1(day.value, "start_time")}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300 }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="To time"
                        type="time"
                        fullWidth
                        size="small"
                        value={selectedDays[day.value]["end_time"]}
                        onChange={handleTimeChange1(day.value, "end_time")}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300 }}
                      />
                    </Grid>
                  </Grid>
                )}
              </Grid>
            ))}
          </FormGroup>
        </Box>
      )}

      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button
          variant="contained"
          color="success"
          disableElevation
          size="small"
          onClick={handleUpdate}
          sx={{mb:2}}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default EditDoctor;
