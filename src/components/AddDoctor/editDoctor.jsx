import { Box, Typography,Grid,TextField, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchField from "../Table/customSearch";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getTimeSlot } from "../../actions/Doctor/doctor";

const EditDoctor = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState("");
  const { state } = location;

  const [ docId, setDocId] = useState(state ? state.id :'')
  const [ docName, setDocName] = useState(state ? state.name :'')
  const [ docNumber, setDocNumber] = useState(state ? state.phone_num:'')
  const [ docEmail, setDocEmail] = useState(state ? state.email_id:'')
  const [ interval, setInterval] = useState(state ? state.consultation_interval:"")
  const [ fee, setFee] = useState(state ? state.consultation_fee:"")

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchValue);
  };

  useEffect(()=>{
    const id = {id:state?.id}
    dispatch(getTimeSlot(id))
  },[])

  const timeSlot = useSelector((state)=>{
    return state.doctorSlice?.timeSlot
  })

  console.log(timeSlot)

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
            sx={{cursor:"not-allowed"}}
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
    </Box>
  );
};

export default EditDoctor;
