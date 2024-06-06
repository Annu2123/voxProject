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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchField from "../Table/customSearch";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getTimeSlot,
  removeDoctor,
  updateDoc,
} from "../../actions/Doctor/doctor";
import Swal from 'sweetalert2'
const EditDoctor = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const { state } = location;
  console.log("sdfgfds",location)
  console.log("stae",state)
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [docId, setDocId] = useState(state ? state.id : "");
  const [docName, setDocName] = useState(state ? state.name : "");
  const [docNumber, setDocNumber] = useState(state ? state.phone_num : "");
  const [docEmail, setDocEmail] = useState(state ? state.email_id : "");
  const [docFromDate,setDocFromDate] = useState(state ? state.start_date :'');
  const [docToDate,setDocToDate] = useState(state ? state.end_date :'');
  const [docDepartment, setDocDepartment] = useState(
    state ? state.department : ""
  );
  const [interval, setInterval] = useState(
    state ? state.consultation_interval : ""
  );
  const [fee, setFee] = useState(state ? state.consultation_fee : "");
  const [department, setDepartment] = useState(state ? state.department : "");
  const [loading, setLoading] = useState(true);
  const [x, setX] = useState({});
  const [selectedDays, setSelectedDays] = useState({});

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    ////console.log("Searching for:", searchValue);
  };
  const [render, setRender] = useState(false);
  const timeSlot = useSelector((state) => {
    return state.doctorSlice?.timeSlot;
  });
  // console.log(timeSlot,'selector')
  // const [timeSlot,setTimeSlot]= useState()

  ////console.log(timeSlot,'time');
  const [slotType, setSlotType] = useState();
console.log("slotTpe",slotType)
  // useEffect(() => {
  //   const xy =
  //     timeSlot && timeSlot !== null&& timeSlot !== undefined && timeSlot != [] && timeSlot[0]["day"] === "all_Day"
  //       ? "all_Day"
  //       : "selectDay";
  //   setSlotType(xy);
  // }, [timeSlot]);
  useEffect(() => {
    if (timeSlot && Array.isArray(timeSlot) && timeSlot.length > 0) {
      const xy = timeSlot[0].day === "all_day" ? "all_Day" : "selectDay";
      setSlotType(xy);
    } else {
      setSlotType("selectDay");
    }
  }, [timeSlot]);

  //console.log(slotType,'slotType')
  // const x = {};
  // if (timeSlot && timeSlot[0]["day"] !== "all_day") {
  //   for (let i = 0; i < timeSlot.length; i++) {
  //     x[timeSlot[i]["day"]] = {
  //       start_time: timeSlot[i]["time_slot_start"],
  //       end_time: timeSlot[i]["time_slot_end"],
  //     };
  //   }
  // }
  // ////console.log(x);
  useEffect(() => {
    if (!loading && timeSlot) {
      const slotData = {};
      if (timeSlot[0]["day"] !== "all_day") {
        for (let i = 0; i < timeSlot.length; i++) {
          slotData[timeSlot[i]["day"]] = {
            start_time: timeSlot[i]["time_slot_start"],
            end_time: timeSlot[i]["time_slot_end"],
          };
        }
      } else if (timeSlot[0]["day"] === "all_day") {
        slotData[timeSlot[0]["day"]] = {
          start_time: timeSlot[0]["time_slot_start"],
          end_time: timeSlot[0]["time_slot_end"],
        };
      }
      console.log("slotDat",slotData,'slot')
      setSelectedDays(slotData);
    }
  }, [loading, timeSlot]);
  console.log(selectedDays)
  useEffect(() => {
    const fetchTimeSlot = async () => {
      const id = { id: state?.id };
      await dispatch(getTimeSlot(id));
      setLoading(false);
      // const xy =  timeSlot && timeSlot[0]["day"] === "all_Day" ? "all_Day" : "selectDay"
      // setSlotType(xy)
    };

    fetchTimeSlot();
  }, [dispatch]);

  // const [slotType, setSlotType] = useState(
  //   timeSlot && timeSlot[0]["day"] === "all_Day" ? "all_Day" : "selectDay"
  // );

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

  ////console.log(x,'time')

  // const [times, setTimes] = useState({});
  // const [timeSlots, setTimeSlots] = useState({});
  const handleDayChange = (event) => {
    const { value } = event.target;
    ////console.log(value);

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
  const deletePopUP=()=>{
    Swal.fire({
        title: "Deleted!",
        text: ` Doctor deleted.`,
        icon: "success"
      })
   }
   const DeleteError = (error) => {
    Swal.fire({
        title: `${error}`,
        text: ` cancel delete request.`,
        icon: "cancel"
    })
}
const formatTimeWithAM = (time) => {
  const [hours, minutes] = time.split(":");
  const hoursInt = parseInt(hours, 10);
  const formattedHours = hoursInt % 12 || 12;
  const ampm = hoursInt < 12 ? "AM" : "PM";
  return `${formattedHours}:${minutes} ${ampm}`;
};
  const handleTimeChange1 = (day, field) => (event) => {
    console.log("dayyy",day)
    let time= formatTimeWithAM(event.target.value)
    console.log("event valuuu",event.target.valueime)
    let newTimes = null;
    if (day !== "all_day") {
      newTimes = {
        ...selectedDays,
        [day]: {
          ...selectedDays[day],
          [field]: event.target.value,
        },
      };
    } else {
      newTimes = {
        [day]: { ...selectedDays[day], [field]: event.target.value },
      };
    }
    setSelectedDays(newTimes);
  };

  // console.log(selectedDays,'time')

  const handleUpdate = () => {
    const timeData = {...selectedDays}
    if(slotType === "selectDay"){
      delete timeData.all_Day;
    }else if(slotType === "all_day"){
      delete timeData.mon 
      delete timeData.tue
      delete timeData.wed 
      delete timeData.thu
      delete timeData.fri 
      delete timeData.sat
      delete timeData.sun
    }
    
    const formData = {
      id: docId,
      name: docName,
      phone_num: docNumber,
      email_id: docEmail,
      consultation_interval: interval,
      consultation_fee: fee,
      department: department,
      time_slot: timeData,
      start_date:docFromDate ,
      end_date:docToDate
    };
    ////console.log(formData,'formData')
    dispatch(updateDoc(formData))
    navigate('/dashboard')
    
  };
  // const formatTimeWithAM = (time) => {
  //   const [hours, minutes] = time.split(":")
  //   const hoursInt = parseInt(hours, 10)
  //   const formattedHours = hoursInt % 12 || 12
  //   const ampm = hoursInt < 12 ? "AM" : "PM";
  //   return `${formattedHours}:${minutes} ${ampm}`
  // };
  const handleBack = () => {
    navigate(-1);
    setX({});
  };

  const handleDeleteConfirmationOpen = () => {
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleDelete = () => {
    const id = {
      id: docId,
    };
    dispatch(removeDoctor(id));
    navigate("/dashboard");
  };
  const handleSlotTypeChange = (event) => {
    const { value } = event.target;
    setSlotType(value);
    setSelectedDays({});
  };
  console.log("timeslot",timeSlot)
  console.log("seleceddayd",selectedDays)
//  console.log("ammmm", formatTimeWithAM())
  return (
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
            <b> Edit Doctor </b>
          </Typography>
        </Box>
        <Divider />
        {/* <Box
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
      </Box> */}
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", mt: 1, p: 1 }}
          onClick={handleDeleteConfirmationOpen}
        >
          <Button variant="contained" color="error" size="small">
            <DeleteIcon fontSize="small" />
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            m: 1,
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
              {/* <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <TextField
                  label="Doctor Id"
                  sx={{ width: "60%" }}
                  size="small"
                  placeholder="Doctor ID"
                  value={docId}
                  readOnly
                />
              </Grid> */}
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <TextField
                  label="Doctor Department*"
                  sx={{ width: "60%" }}
                  size="small"
                  placeholder="Doctor ID"
                  value={docDepartment}
                  readOnly
                  disabled
                />
              </Grid>
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
                  readOnly
                  disabled
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <TextField
                  label="Doctor Mobile Number*"
                  placeholder="Mobile Number"
                  type="number"
                  sx={{ width: "60%" }}
                  size="small"
                  value={docNumber}
                  readOnly
                  disabled
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <TextField
                  label="Doctor Email ID*"
                  placeholder="Email"
                  type="email"
                  sx={{ width: "60%" }}
                  size="small"
                  value={docEmail}
                  readOnly
                  disabled
                />
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
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
          {loading ? (
            <p>Loading...</p>
          ) : (
            // <div>
            //   <Typography>{selectedDays[day.value]}</Typography>
            // </div>

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
              {/* <Box
            sx={{
              minHeight: "100px",
              width: { xs: "100%", md: "50%" },
              backgroundColor: "#FAFAFA",
              mt: 2,
              borderRadius: "8px",
              border: "1px solid lightgray",
            }}
          > */}
            <Box sx={{display:"flex",gap:2,ml:2,mt:1.5,mr:2}}>
              <TextField
                label="From Date"
                fullWidth
                type="date"
                size="small"
                value={docFromDate}
                onChange={(e)=>setDocFromDate(e.target.value)}
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
                onChange={(e)=>setDocToDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            {/* days selection */}
            <Divider sx={{mt:1}}/>
              <FormControl sx={{ p: 2 }}>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Select Working Hours*
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={slotType}
                  // onChange={(e) => setSlotType(e.target.value)}
                  onChange={handleSlotTypeChange}
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
            {/* </Box> */}
              {slotType === "all_Day" && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
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
                    <TextField
                      label="Start Time"
                      sx={{ width: "40%" }}
                      size="small"
                      placeholder="Start Time"
                      type="time"
                      value={
                        Object.keys(selectedDays).includes("all_day") &&
                       selectedDays["all_day"]["start_time"]
                      }
                      onChange={handleTimeChange1("all_day", "start_time")}
                      // readOnly
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      label="End Time"
                      sx={{ width: "40%" }}
                      size="small"
                      placeholder="End Time"
                      type="time"
                      value={
                        Object.keys(selectedDays).includes("all_day") &&
                      selectedDays["all_day"]["end_time"]
                      }
                      onChange={handleTimeChange1("all_day", "end_time")}
                      // readOnly
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Box>
                </Box>
              )}

              {slotType === "selectDay" && (
                <Box sx={{ p: 2, mt: -2 }}>
                  <Divider sx={{ mt: -1 }} />
                  <FormGroup>
                    {daysOfWeek?.map((day, index) => (
                      <Grid container spacing={2} key={index}>
                        <Grid item xs={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={Object.keys(selectedDays).includes(
                                  day?.value
                                )}
                                onChange={handleDayChange}
                                value={day?.value}
                              />
                            }
                            label={day?.day}
                          />
                        </Grid>
                        {Object.keys(selectedDays).includes(day?.value) && (
                          <Grid
                            item
                            container
                            lg={8}
                            md={12}
                            spacing={1}
                            sx={{ mt: { md: -2, lg: 0 }, ml: 1 }}
                          >
                            <Grid item xs={6}>
                              <TextField
                                label="From time"
                                type="time"
                                fullWidth
                                size="small"
                                value={selectedDays[day?.value]["start_time"]}
                                onChange={handleTimeChange1(
                                  day?.value,
                                  "start_time"
                                )}
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
                                value={selectedDays[day?.value]["end_time"]}
                                onChange={handleTimeChange1(
                                  day?.value,
                                  "end_time"
                                )}
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
            </Box>
          )}
        </Box>

        {/* <Grid container spacing={2} sx={{ p: 2 }}>
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
                          checked={Object.keys(selectedDays).includes(
                            day.value
                          )}
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
        )} */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="success"
            disableElevation
            size="small"
            onClick={handleUpdate}
            sx={{ mb: 2 }}
          >
            Update
          </Button>
        </Box>
      </Box>
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteConfirmationClose}
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove the doctor?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditDoctor;
