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
import React, { useEffect, useState } from "react";
import CustomTable from "../Table/customTable";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { searchActivity } from "../../actions/CallActivity/callActivity";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "react-modal";
import toast from "react-hot-toast";
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
  {
    id: "record",
    align: "center",
    disablePadding: false,
    label: "Record",
  },
];

const CallActivity = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
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
  const [formDate, setFormDate] = useState(getCurrentDate());
  const [formTime, setFormTime] = useState(getCurrentTime());
  const [toDate, setToDate] = useState(getCurrentDate());
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
    const formData = {
      from_date: fromdateTime,
      to_date: toDateTime,
    };
    dispatch(searchActivity(formData));
  };

  const list = useSelector((state) => {
    return state?.callActivitySlice?.callList;
  });

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
        <EditIcon fontSize="small" />
      </Button>
    ),
  }));

  const handlePlay = (url) => {
    if (audio) {
      audio.pause();
    }
    const newAudio = new Audio(url);
    newAudio.play();
    setAudio(newAudio);
    setCurrentAudioUrl(url);
    setIsModalOpen(true);
    setIsPlaying(true);

    newAudio.onended = () => {
      setIsModalOpen(false);
      setIsPlaying(false);
      setCurrentAudioUrl(null);
    };
  };

  const handlePause = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleResume = () => {
    if (audio) {
      audio.play();
      setIsPlaying(true);
    }
  };

  const closeModal = () => {
    if (audio) {
      audio.pause();
    }
    setIsModalOpen(false);
    setIsPlaying(false);
    setCurrentAudioUrl(null);
  };

  return (
    <>
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
        {/* <TextField
          label="Form date"
          type="datetime-local"
          size="small"
          sx={{ width: { xs: "100%", md: "15%" } }}
          value={formDate.replace(" ", "T")}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleFromDateChange}
        /> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
            mt: 4,
          }}
        >
          <TextField
            label="Form Date"
            type="date"
            size="small"
            value={formDate}
            onChange={(e) => setFormDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Form Time"
            type="time"
            size="small"
            value={formTime}
            onChange={(e) => setFormTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 1, // 1 second step
            }}
          />
        </Box>

        {/* <TextField
          label="To Date"
          size="small"
          type="datetime-local"
          value={toDate}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleToDateChange}
          sx={{ width: { xs: "100%", md: "15%" } }}
        /> */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
            mt: 4,
          }}
        >
          <TextField
            label="Form Date"
            type="date"
            size="small"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
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
          />
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

      <Dialog open={isModalOpen}>
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
          <DialogTitle variant="h6" sx={{ color: "#0077b6" }}>
            <b> Playing Audio </b>
          </DialogTitle>
          <Tooltip title="Close" placement="left">
            <Button onClick={closeModal} size="small" sx={{ color: "black" }}>
              <CloseIcon fontSize="small" />
            </Button>
          </Tooltip>
        </Box>

        <Divider />

        <DialogContent>
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CallActivity;
