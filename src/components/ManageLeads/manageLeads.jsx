import { Box, Button, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTable from "../Table/customTable";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  searchPatient,
  startGetPatient,
} from "../../actions/ManageLeads/manageLeads";
import CallIcon from '@mui/icons-material/Call'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Importing the named export AdapterDayjs
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
const columns = [
  {
    id: "sl_no",
    align: "center",
    disablePadding: false,
    label: "SL No",
  },
  {
    id: "phone",
    align: "center",
    disablePadding: false,
    label: "Phone",
  },
  {
    id: "name",
    align: "center",
    disablePadding: false,
    label: "Name",
  },
  {
    id: "doc_name",
    align: "center",
    disablePadding: false,
    label: "Doctor Name",
  },
  {
    id: "options",
    align: "center",
    disablePadding: false,
    label: "Options",
  },
];

const ManageLeads = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("");

  const handleNavigate = (pl) => {
    navigate("edit_leads", { state: pl });
  };

  useEffect(() => {
    dispatch(startGetPatient());
  }, []);

  const formData = {
    key: searchType,
    value: search,
  };
  const handleSearch = () => {
    if (search) {
      dispatch(searchPatient(formData));
    } else {
      dispatch(startGetPatient());
    }
  };

  const handleShowAll =()=>{
    setSearch('')
    setSearchType('')
    dispatch(startGetPatient());
  }

  const list = useSelector((state) => {
    return state?.manageLeadsSlice?.patientList;
  });

  const patientList = list?.map((pl, i) => ({
    sl_no: i + 1,
     phone: 
    (
      <>
        <Button
          size="small"
          variant="outlined"
          onClick={() => handleCall(pl.phone_num)}
          style={{ marginRight: 8,marginLeft: -4  }}
        >
          <CallIcon fontSize="small" />
        </Button>
        {pl.phone_num}
      </>
    ),
    
    name: pl.name,
    doc_name: pl.refered_by,
    options: (
      <Button
        size="small"
        variant="outlined"
        onClick={() => handleNavigate(pl)}
      >
        <EditIcon fontSize="small" />
      </Button>
    ),
  }));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1, md: 2 },
          justifyContent: "center",
          border: "1px solid lightgray",
          mt: 1,
          p: 2,
          minHeight: "100px",
          width: "100%",
          borderRadius: "8px",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <DateTimePicker
            label="From Date"
            // value={toDate}
            // onChange={(date) => setToDate(date)}
            ampm={true} // Enable AM/PM selection
            inputFormat="dd-MM-yyyy hh:mm a" // Custom input format
            sx={{
              width: "20%", // Set the width to 100% to fill the available space
              height: "45px", // Set the desired height here
            }}
          />
           <DateTimePicker
            label="To Date"
            // value={toDate}
            // onChange={(date) => setToDate(date)}
            ampm={true} // Enable AM/PM selection
            inputFormat="dd-MM-yyyy hh:mm a" // Custom input format
            sx={{
              width: "20%", // Set the width to 100% to fill the available space
              height: "45px", // Set the desired height here
            }}
          />
        <TextField
          label="Choose Leads"
          select
          size="small"
          sx={{ width: { xs: "100%", md: "14%" } }}
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
           <MenuItem value="none">None</MenuItem>
          <MenuItem value="phone_num">Phone Number</MenuItem>
        </TextField>

        <TextField
          placeholder="Search for Leads..."
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: { xs: "100%", md: "24%" } }}
        />
        <Button
          size="small"
          variant="contained"
          disableElevation
          color="error"
          onClick={handleSearch}
        >
          Search
        </Button>
        <Button size="small" variant="contained" disableElevation onClick={handleShowAll}>
          Show All
        </Button>
      </Box>

      <Box sx={{ mt: 2 }}>
        <CustomTable columns={columns} rows={patientList} />
      </Box>
    </LocalizationProvider >
  );
};

export default ManageLeads;
