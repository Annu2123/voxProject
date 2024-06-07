import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormGroup,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from 'dayjs'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Importing the named export AdapterDayjs
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useEffect, useState } from "react";
import SearchField from "../Table/customSearch";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import SlotBooking from "./slots";
import { useDispatch, useSelector } from "react-redux";
import { createDoctor } from "../../actions/Doctor/doctor";
import CustomFromToDate from "./customFromToDate";
import { useNavigate } from "react-router";
import { startGetDeptList } from "../../actions/Department/department";
import toast from "react-hot-toast";
const currentDateAndTime = dayjs()
const dayjsConvert = (data) => {
  return dayjs(data); // Convert data into a dayjs object
}
const docDept = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetDeptList());
  }, []);
  const deptList = useSelector((state) => {
    return state?.departmentSlice?.deptList;
  });
  let r = deptList?.map((r) => r.department);
  return r?.length >= 1 ? r : ["none"];
};

const AddDoctor = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [value, setValue] = useState("");
  const [fromDate, setFromDate] = useState({
    hour: "",
    minute: "",
    ampm: "",
  });

  const [fromTime, setFromTime] = useState(currentDateAndTime);
  const [toTime, setToTime] = useState(currentDateAndTime);
  const [docName, setDocName] = useState('');
  const [docEmail, setDocEmail] = useState('');
  const [docNumber, setDocNumber] = useState('');
  const [interval, setInterval] = useState('');
  const [consultaionFee, setConsultaionFee] = useState('');
  const [department, setDepartment] = useState('');
  const [docFromDate, setDocFromDate] = useState('');
  const [docToDate, setDocToDate] = useState('');
  const dispatch = useDispatch();
  const deptList = docDept();
  // console.log(deptList)

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

  const days = ["mon", "tue", "wed", "thur", "fri", "sat", "sun"];

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchValue);
  };

  const handleChange = (event) => {
   
    setValue(event.target.value);
    setSelectedDays([])
      setTimes({})
  
      setFromTime(dayjsConvert("00:00"))
      setToTime(dayjsConvert("00:00"))
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
    console.log(a, typeof a);
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
 console.log("formTime",fromTime)
 console.log("totime",toTime)


  const handleAdd = () => {
    let timeSlotValue = {};
    if (value === "all_Day") {
      timeSlotValue = {
        all_day: {
          start_time:fromTime.format('HH:mm'),
          end_time: toTime.format("HH:mm"),
        },
      };
    } else {
      selectedDays.forEach((day) => {
        // console.log("looop", times[day].from)
        console.log("loop",times)
        if (times[day]) {
          timeSlotValue[day] = {
            start_time: times[day].from || "00:00",
            end_time: times[day].to || "00:00",
          };
        }
      });
    }
    const formData = {
      name: docName,
      phone_num: docNumber,
      email_id: docEmail,
      consultation_interval: interval,
      consultation_fee: consultaionFee,
      start_date: docFromDate,
      end_date: docToDate,
      time_slot: timeSlotValue,
      department: department,
      added_by: "Madhu",
    };
    console.log("timesSLovlaeu",timeSlotValue)
    console.log("formData", formData)
    if (Object.keys(formData.name)=== '') {
      toast.error("Please enter the doctor name");
    }
    console.log(formData,'shri')

    if (Object.keys(formData.time_slot).length === 0) {
      toast.error("Please fill the time slots.");
    } else {
      dispatch(createDoctor(formData)).then((resultAction) => {
        if (resultAction.meta.requestStatus === "fulfilled") {
          window.location.reload();
        }
      });
    }
  };

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
  const [selectedDays, setSelectedDays] = useState([]);
  const [times, setTimes] = useState({});
  const handleDayChange = (event) => {
    const { value } = event.target;
    if (selectedDays.includes(value)) {
      setSelectedDays(selectedDays.filter((day) => day !== value));
    } else {
      setSelectedDays([...selectedDays, value]);
    }
  };

  const handleTimeChange1 = (day, field) => (event) => {
    console.log("eveents",event)
    console.log("fii",field)
    console.log("dd",day)
    const time=event.format("HH:mm")
    console.log("time",time)
    const newTimes = {
      ...times,
      [day]: { ...times[day], [field]:time},
    };
    setTimes(newTimes);
  };

  const handleBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (value === "all_Day") {
      setSelectedDays([])
      setTimes({})
    } else if (value === "selectDay") {
      setFromTime('')
      setToTime('')
    }
  }, [value])
  const setTime=(time)=>{
    console.log(time)
  }
  // console.log("tiiiiiii",fromTime.format('HH:mm'))
  console.log("timesss",times)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            minHeight: "70vh",
            borderRadius: "9px",
            mt: 2,
            borderTop: "1px solid lightgray",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 1.5,
              borderRadius: 2,
            }}
          >
            <Button
              variant="contained"
              size="small"
              disableElevation
              onClick={handleBack}
              sx={{ mb: 1 }}
            >
              back
            </Button>
            <Typography variant="h6" sx={{ color: "#0077b6" }}>
              <b> Add Doctor </b>
            </Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 1,
              gap: 2,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box
              sx={{
                minHeight: "100px",
                width: { xs: "100%", md: "50%" },
                backgroundColor: "#FAFAFA",
                mt: 2,
                borderRadius: "8px",
                border: "1px solid lightgray",
              }}
            >
              <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <TextField
                    label="Doctor Name*"
                    sx={{ width: "60%" }}
                    size="small"
                    placeholder="Doctor Name"
                    type="text"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <TextField
                    label="Doctor Mobile Number"
                    placeholder="Mobile Number"
                    type="number"
                    sx={{ width: "60%" }}
                    size="small"
                    value={docNumber}
                    onChange={(e) => setDocNumber(e.target.value)}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <TextField
                    label="Doctor Email ID"
                    placeholder="Email"
                    type="email"
                    sx={{ width: "60%" }}
                    size="small"
                    value={docEmail}
                    onChange={(e) => setDocEmail(e.target.value)}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <TextField
                    label="Doctor Department*"
                    sx={{ width: "60%" }}
                    size="small"
                    placeholder="Doctor Department"
                    select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    {deptList?.map((dept, i) => (
                      <MenuItem key={i} value={dept}>
                        {dept}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              <Divider width="100%" height="10px" sx={{ mt: 2 }} />
              <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <TextField
                    label="Time Interval(Ex : 30 mins)*"
                    sx={{ width: "60%" }}
                    size="small"
                    placeholder="Please Enter Time Interval"
                    type="text"
                    value={interval}
                    onChange={(e) => setInterval(e.target.value)}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <TextField
                    label="Consultation Fee*"
                    placeholder="please Enter Consultation Fee"
                    type="number"
                    sx={{ width: "60%" }}
                    size="small"
                    value={consultaionFee}
                    onChange={(e) => setConsultaionFee(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                minHeight: "100px",
                width: { xs: "100%", md: "50%" },
                backgroundColor: "#FAFAFA",
                mt: 2,
                borderRadius: "8px",
                border: "1px solid lightgray",
              }}
            >
              <Box sx={{ display: "flex", gap: 2, ml: 2, mt: 1.5, mr: 2 }}>
                <TextField
                  label="From Date"
                  fullWidth
                  type="date"
                  size="small"
                  value={docFromDate}
                  onChange={(e) => setDocFromDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  label="To Date"
                  fullWidth
                  type="date"
                  size="small"
                  value={docToDate}
                  onChange={(e) => setDocToDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              {/* days selection */}
              <Divider sx={{ mt: 1 }} />
              <FormControl sx={{ p: 2 }}>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Select Working Hours*
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
              {/* <Divider sx={{mt:-1}}/> */}


              {/* time and working selection */}
              {value === "all_Day" && (
                <Box
                  sx={{
                    display: "flex",
                    // justifyContent: "center",
                    width: "100%",
                    flexDirection: "column",
                    gap: 1,
                    p: 2,
                    mt: -1,
                  }}
                >
                  <Divider sx={{ mt: -1 }} />
                  <Typography variant="body1">All Day</Typography>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    {/* <TextField
                    label="From Time"
                    type="time"
                    sx={{ width: "40%" }}
                    size="small"
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300,
                    }}
                  /> */}
                    <TimePicker
                      label="From Time"
                      onChange={(newValue) => setFromTime(newValue)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    {/* <TextField
                      label="To Time"
                      type="time"
                      size="small"
                      value={toTime}
                      sx={{ width: "40%" }}
                      onChange={(e) => setToTime(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300,
                      }}
                    /> */}
                     <TimePicker
                      label="To Time"
                      // value={toTime}
                      onChange={(newValue) => setToTime(newValue)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Box>
                </Box>
              )}

              {value === "selectDay" && (
                <Box sx={{ p: 2, mt: -2 }}>
                  <Divider sx={{ mt: -1 }} />
                  <FormGroup>
                    {daysOfWeek.map((day, index) => (
                      <Grid container spacing={2} key={index}>
                        <Grid item xs={2.5}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedDays.includes(day.value)}
                                onChange={handleDayChange}
                                value={day.value}
                              />
                            }
                            label={day.day}
                          />
                        </Grid>
                        {selectedDays.includes(day.value) && (
                          <Grid
                            item
                            container
                            lg={8}
                            md={12}
                            spacing={1}
                            sx={{ mt: { md: -2, lg: 0 } }}
                          >
                            <Grid item xs={6}>
                              {/* <TextField
                                label="From time"
                                type="time"
                                fullWidth
                                size="small"
                                value={dayjsConvert(times[day.value]?.from) ||dayjsConvert("00:00")}
                                onChange={handleTimeChange1(day.value, "from")}
                                InputLabelProps={{ shrink: true }}
                                inputProps={{ step: 300 }}
                              /> */}
                              <TimePicker
                   label="From time"
                   value={dayjsConvert(times[day.value]?.from) ||"00:00"}
                   onChange={handleTimeChange1(day.value, "from")}
                      renderInput={(params) => <TextField {...params} />}
                    />
                            </Grid>
                            <Grid item xs={6}>
                              {/* <TextField
                                label="To time"
                                type="time"
                                fullWidth
                                size="small"
                                value={dayjsConvert(times[day.value]?.to) || dayjsConvert("00:00")}
                                onChange={handleTimeChange1(day.value, "to")}
                                InputLabelProps={{ shrink: true }}
                                inputProps={{ step: 300 }}
                              /> */}
                              <TimePicker
                    label="To time"
                    value={dayjsConvert(times[day.value]?.to) ||"00:00"}
                    onChange={handleTimeChange1(day.value, "to")}
                      renderInput={(params) => <TextField {...params} />}
                    />
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                    ))}
                  </FormGroup>
                </Box>
              )}
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              disableElevation
              color="success"
              size="small"
              onClick={handleAdd}
              sx={{ m: 2 }}
            >
              Save
            </Button>
          </Box>

          {/* <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item xs={6}>
            <TextField
              label="Doctor Department"
              fullWidth
              size="small"
              placeholder="Doctor Department"
              select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
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
        <Divider width="100%" height="10px" sx={{ mt: 2 }} /> */}

          {/* <Grid container spacing={2} sx={{ p: 2 }}>
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
        <Divider width="100%" height="10px" sx={{ mt: 2 }} /> */}

          {/* <FormControl sx={{ p: 2 }}>
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
        </FormControl> */}

          {/* {value === "all_Day" && (
          <Box
            sx={{
              display: "flex",
              // justifyContent: "center",
              width: "100%",
              gap: 2,
            }}
          >
            <Typography variant="body1">All Day</Typography>
            <TextField
              label="From Time"
              type="time"
              sx={{ width: "60%" }}
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
              sx={{ width: "60%" }}
              onChange={(e) => setToTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300,
              }}
            />
          </Box>
        )} */}

          {/* {value === "selectDay" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Select
              label="Select Day"
              size="small"
              multiple
              sx={{ width: "50%" }}
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
              <CustomFromToDate
                day={day}
                obj={finalObj[day]}
                setFinalObj={setFinalObj}
                finalObj={finalObj}
              />
            ))}
          </Box>
        )} */}

          {/* {value === "selectDay" && (
          <Box sx={{ p: 2 }}>
            <FormGroup>
              {daysOfWeek.map((day, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedDays.includes(day.value)}
                          onChange={handleDayChange}
                          value={day.value}
                        />
                      }
                      label={day.day}
                    />
                  </Grid>
                  {selectedDays.includes(day.value) && (
                    <Grid item container xs={6} spacing={1} mt={1}>
                      <Grid item xs={6}>
                        <TextField
                          label="From time"
                          type="time"
                          fullWidth
                          size="small"
                          value={times[day.value]?.from || ""}
                          onChange={handleTimeChange1(day.value, "from")}
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
                          value={times[day.value]?.to || ""}
                          onChange={handleTimeChange1(day.value, "to")}
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
        )} */}

          {/* <Box
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
        </Box> */}
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
      </Box>
    </LocalizationProvider>
  );
};

export default AddDoctor;
