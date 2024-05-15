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
import { useDispatch } from "react-redux";
import { createDoctor } from "../../actions/Doctor/doctor";
import CustomFromToDate from "./customFromToDate";
import { useNavigate } from "react-router";

const docDept = [
  "Dermatology",
  "Emergency Medicine",
  "General Medicine",
  "General Surgery & Gastroenterology Surgery",
  "Intensive Care Unit",
  "Paediatrics",
  "Nephrology",
  "Neurosurgery",
  "Neurology",
  "Obstetrics and Gynaecology",
  "Ophthalmology",
  "Orthopaedic Surgery",
  "Paediatrics Surgery",
  "Plastic & Reconstructive Surgery",
  "Psychiatry",
  "Vascular Surgery",
  "ENT",
  "Fascio Maxillary Surgery",
  "Urology",
  "Orthopaedics",
];

const AddDoctor = () => {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState("");
  const [value, setValue] = useState("");
  const [fromDate, setFromDate] = useState({
    hour: "",
    minute: "",
    ampm: "",
  });

  const [fromTime, setFromTime] = useState();
  const [toTime, setToTime] = useState();
  const [docName, setDocName] = useState();
  const [docEmail, setDocEmail] = useState();
  const [docNumber, setDocNumber] = useState();
  const [interval, setInterval] = useState();
  const [consultaionFee, setConsultaionFee] = useState();
  const dispatch = useDispatch();

  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const [toDate, setToDate] = useState({
    hour: "",
    minute: "",
    ampm: "",
  });

  const [docSlot, setDocSlot] = useState([]);
  const [finalObj, setFinalObj] = useState({});

  const days = [
    "mon",
    "tue",
    "wed",
    "thur",
    "fri",
    "sat",
    "sun",
  ];

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
    const a = event.target.value;
    console.log(a,typeof a)
    const obj = {};
    for (let i = 0; i < a.length; i++) {
      obj[a[i]] = {
        start_time: "00:00",
        end_time: "00:00",
      };
    }
    setFinalObj(obj);


    // const newObj = Object.fromEntries(
    //   Object.entries(days).map(([key, a]) => [
    //     key,
    //     value.includes(key) ? 1 : 0,
    //   ])
    // );
    // setDays(newObj);
    // console.log(newObj);
  };
  // console.log(typeof docSlot)

  const handleAdd = () => {
    console.log(value)
    let timeSlotValue =  {}
    if(value==='all_Day'){
      timeSlotValue = {
        all_Day: {
          start_time: fromTime,
          end_time: toTime,
        },
      }
    }else{
      timeSlotValue = finalObj
    }
    const formData = {
      name: docName,
      phone_num: docNumber,
      email_id: docEmail,
      consultation_interval: interval,
      consultation_fee: consultaionFee,
      time_slot: timeSlotValue ,
    };
    console.log(formData)
    // dispatch(createDoctor(formData));
    dispatch(createDoctor(formData)).then((resultAction) => {
      if (resultAction.meta.requestStatus === 'fulfilled') {
        navigate('/')
      }
    });
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
            label="Doctor Department"
            fullWidth
            size="small"
            placeholder="Doctor Department"
            select
          >
            {docDept.map((dept, i) => (
              <MenuItem key={i} value={dept}>
                {dept}
              </MenuItem>
            ))}
          </TextField>
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
            value={consultaionFee}
            onChange={(e) => setConsultaionFee(e.target.value)}
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

      {value === "all_Day" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            gap: 2,
          }}
        >
          <TextField
            label="From Time"
            type="time"
            value={fromTime}
            onChange={(e) => setFromTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300,
            }}
          />
          <TextField
            label="To Time"
            type="time"
            value={toTime}
            onChange={(e) => setToTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300,
            }}
          />
        </Box>
      )}

      {value === "selectDay" && (
        <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
          <Select
            label="Select Day"
            size="small"
            multiple
            sx={{width:"50%"}}
            value={docSlot}
            onChange={(e) => handeDocSlotChange(e)}
          >
            {days.map((day, i) => (
              <MenuItem
                key={i}
                id={day}
                value={day}
                // disabled={days[day] == 1 ? true : false}
                // sx={{
                //   color: day === "Reset" ? "red" : "black",
                //   fontSize: day === "Reset" && "12px",
                // }}
              >
                {day}
              </MenuItem>
            ))}
          </Select>
          {Object.keys(finalObj).map((day, i) => (
            // console.log(key,i)
            <CustomFromToDate day={day} obj={finalObj[day]} setFinalObj={setFinalObj} finalObj={finalObj}/>
          ))}
        </Box>
      )}

      {/* <Box sx={{ display: "flex" }}>
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
              sx={{
                color: day === "Reset" ? "red" : "black",
                fontSize: day === "Reset" && "12px",
              }}
            >
              {day}
            </MenuItem>
          ))}
        </Select>
      </Box> */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={handleAdd}
        >
          Submit
        </Button>
      </Box>
      {/* <Divider sx={{ mt: 2 }} />
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
      </Box> */}
    </Box>
  );
};

export default AddDoctor;
