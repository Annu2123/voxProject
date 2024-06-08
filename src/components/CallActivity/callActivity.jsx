import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";

import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Importing the named export AdapterDayjs
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from "react";
import CustomTable from "../Table/customTable";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { searchActivity, searchActivityNum } from "../../actions/CallActivity/callActivity";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "react-modal";
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import toast from "react-hot-toast";
const currentDateAndTime = dayjs()
// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
// }));
const columns = [
  {
    id: "sl_no",
    align: "center",
    disablePadding: false,
    label: "SL No",
  },
  {
    id: "agent_num",
    align: "center",
    disablePadding: false,
    label: "Agent Number",
  },
  {
    id: "customer_num",
    align: "center",
    disablePadding: false,
    label: "Customer Number",
  },
  {
    id: "call_datetime",
    align: "center",
    disablePadding: false,
    label: "Call Date and Time",
  },
  {
    id: "record",
    align: "center",
    disablePadding: false,
    label: "Record",
  },
  {
    id: "duration",
    align: "center",
    disablePadding: false,
    label: "Duration",
  },
  {
    id: "call_method",
    align: "center",
    disablePadding: false,
    label: "Call Method",
  },
  {
    id: "call_status",
    align: "center",
    disablePadding: false,
    label: "Call Status",
  },

];

const CallActivity = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectDate, setSelectDate] = useState(currentDateAndTime)
  const [number, setNumber] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // const classes = useStyles();
  const [inputType, setInputType] = useState('non');
  const [numberValue, setNumberValue] = useState('');
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  };

  const handleInputTypeChange = (event) => {
    setInputType(event.target.value);
  };
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };
  const [formDate, setFormDate] = useState(currentDateAndTime);
  const [formTime, setFormTime] = useState(getCurrentTime());
  const [toDate, setToDate] = useState(currentDateAndTime);
  const [toTime, setToTime] = useState(getCurrentTime());
  const [fromdateTime, formSetDateTime] = useState("");
  const [toDateTime, toSetDateTime] = useState("");

  useEffect(() => {
    if (formDate && formTime) {
      formSetDateTime(`${formDate} ${formTime}`);
    }
  }, [formDate, formTime]);

  useEffect(() => {
    if (toDate && toTime) {
      toSetDateTime(`${toDate} ${toTime}`);
    }
  }, [toDate, toTime]);

  // const handleFromDateChange = (e) => {
  //   const inputDate = new Date(e.target.value);
  //   if (!isNaN(inputDate)) {
  //     // Check if the date is valid
  //     const year = inputDate.getFullYear();
  //     const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  //     const day = String(inputDate.getDate()).padStart(2, "0");
  //     const hours = String(inputDate.getHours()).padStart(2, "0");
  //     const minutes = String(inputDate.getMinutes()).padStart(2, "0");
  //     const seconds = String(inputDate.getSeconds()).padStart(2, "0");

  //     const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  //     setFormDate(formattedDate);
  //   }
  // };

  // const handleToDateChange = (e) => {
  //   const inputDate = new Date(e.target.value);
  //   if (!isNaN(inputDate)) {
  //     // Check if the date is valid
  //     const year = inputDate.getFullYear();
  //     const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  //     const day = String(inputDate.getDate()).padStart(2, "0");
  //     const hours = String(inputDate.getHours()).padStart(2, "0");
  //     const minutes = String(inputDate.getMinutes()).padStart(2, "0");
  //     const seconds = String(inputDate.getSeconds()).padStart(2, "0");

  //     const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  //     setToDate(formattedDate);
  //   }
  // };

  const handleSearch = () => {
    if (inputType === 'number') {
      const formData = {
        phone_num: number
      };
      console.log('Number search:', formData);

      dispatch(searchActivityNum(formData));
    } else if (inputType === 'date') {
      // Construct formData for date search
      const formData = {
        from_date: formattedDateTime = dayjs(formDate).format('YYYY-MM-DD HH:mm:ss'),
        to_date: formattedDateTime = dayjs(toDate).format('YYYY-MM-DD HH:mm:ss'),
      }
      console.log('Date search:', formData)

      dispatch(searchActivity(formData))
    } else {
      alert("invalide output")
      console.log('Invalid input type')
    }
  }
// console.log(formDate)
// const formattedDateTime = dayjs(formDate).format('YYYY-MM-DD HH:mm:ss')
// console.log(formattedDateTime)
// console.log(toDate)

  const list = useSelector((state) => {
    return state?.callActivitySlice?.callList;
  });
  const handlePlay = (url) => {
    console.log("url", url)
    window.open(url, '_blank')

  };
  const callActivityList = list?.map((call, i) => ({
    sl_no: i + 1,
    agent_num: call.agent_num,
    customer_num: call.customer_num,
    call_datetime: call.call_datetime,
    duration: call.duration,
    call_method: call.call_method,
    call_status: call.call_status,
    record: (
      <Button
        size="small"
        variant="outlined"
        onClick={() => handlePlay(call.rec_link)}
      >
        <PlayArrowIcon fontSize="small" />
      </Button>
    ),
  }));



  // const handlePause = () => {
  //   if (audio) {
  //     audio.pause();
  //     setIsPlaying(false);
  //   }
  // };

  // const handleResume = () => {
  //   if (audio) {
  //     audio.play();
  //     setIsPlaying(true);
  //   }
  // };

  // const closeModal = () => {
  //   if (audio) {
  //     audio.pause();
  //   }
  //   setIsModalOpen(false);
  //   setIsPlaying(false);
  //   setCurrentAudioUrl(null);
  // };

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
          flexDirection: { xs: "column", md: "column " },
        }}
      >
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
            mt: 4,
            width: "28%",
            height: "26%"
          }}
        >
          <TextField
            select
            // size="small"
            label="Search By Number"
            value={inputType}
            onChange={handleInputTypeChange}
            variant="outlined"
            sx={{ width: "100%" }} // Set width to 100%
          >
            <MenuItem value="date">None</MenuItem>
            <MenuItem value="number" >Enter Number</MenuItem>
          </TextField>
        </Box> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            mt: 4,
            width: "50%", // Set the width to 100% to make it take up the full width
            height: "100px", // Set the height to increase the size vertically
         
            
          }}
        >
          {/* <DatePicker/> */}
          <DateTimePicker
            label="FromDate"
            value={formDate}
            onChange={(date) => setFormDate(date)}
            ampm={true} // Enable AM/PM selection
            inputFormat="dd-MM-yyyy hh:mm a" // Custom input format
            sx={{
              width: "50%", // Set the width to 100% to fill the available space
              height: "45px", // Set the desired height here
            }}
          />
          {/* <TextField
            label="From Date"
            type="date"
            size="small"
            value={formDate}
            onChange={(e) => setFormDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          /> */}
          <TextField
            select
            // size="small"
            label="Option"
            value={inputType}
            onChange={handleInputTypeChange}
            variant="outlined"
            sx={{
              width: "50%", // Set the width to 100% to fill the available space
              height: "45px", // Set the desired height here
            }}
          >
            <MenuItem value="date">None</MenuItem>
            <MenuItem value="number" >Enter Number</MenuItem>
          </TextField>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            mt: -2,
            width: "50%", // Set the width to 100% to make it take up the full width
            height: "100px", // Set the height to increase the size vertically
          }}
        >
          {/* <TextField
            label="To Date"
            type="date"
            size="small"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          /> */}
          {/* <DatePicker/> */}
          <DateTimePicker
          views={['year', 'day', 'hours', 'minutes', 'seconds']}
            label="To Date"
            value={toDate}
            onChange={(date) => setToDate(date)}
            ampm={true} // Enable AM/PM selection
            inputFormat="dd-MM-yyyy hh:mm:ss a" // Custom input format
            sx={{
              width: "48%", // Set the width to 100% to fill the available space
              height: "45px", // Set the desired height here
            }}
          />
          {/* <TextField
            label="Form Time"
            type="time"
            size="small"
            value={toTime}
            onChange={(e) => setToTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 1, // 1 second step
            }}
          /> */}
          
        {inputType === "number" && <Box>
          <TextField
  label="Enter Number"
  type="text"
  // size="small"
  value={number}
  placeholder="Enter Mobile Number..."
  onChange={(e) => setNumber(e.target.value)}
  InputLabelProps={{
    shrink: true,
  }}
  inputProps={{
    step: 1, // 1 second step
  }}
  sx={{
    width: "100%", // Set the desired width here, for example, 70% of the available space
    height: "45px", // Set the desired height here, for example, 60px
  }}
/>

        </Box>}
        </Box>

        <Button
          size="small"
          variant="contained"
          disableElevation
          // color="error"
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>

      <Box sx={{ mt: 2 }}>
        <CustomTable columns={columns} rows={callActivityList} />
      </Box>

      {/* <Dialog open={isModalOpen}>
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
          <DialogTitle variant="h6" sx={{ color: "#0077b6" }}>
            <b> Playing Audio </b>
          </DialogTitle>
          <Tooltip title="Close" placement="left">
            <Button onClick={closeModal} size="small" sx={{ color: "black" }}>
              <CloseIcon fontSize="small" />
            </Button>
          </Tooltip>
        </Box> */}

      <Divider />

      {/* <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 5 }}>
            <Button
              variant="contained"
              color="warning"
              onClick={isPlaying ? handlePause : handleResume}
            >
              {isPlaying ? "Pause" : "Play"}
            </Button>
            <Button variant="contained" color="error" onClick={closeModal}>
              Close
            </Button>
          </Box>
        </DialogContent> */}
      {/* </Dialog> */}
    </LocalizationProvider>
  );
};

export default CallActivity;
