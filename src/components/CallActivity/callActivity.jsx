import { Box, Button, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTable from "../Table/customTable";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { searchActivity } from "../../actions/CallActivity/callActivity";
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
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  };
  const [formDate, setFormDate] = useState(getCurrentDateTime);
  const [toDate, setToDate] = useState(getCurrentDateTime);

  const handleFromDateChange = (e) => {
    const inputDate = new Date(e.target.value);
    if (!isNaN(inputDate)) {
      // Check if the date is valid
      const year = inputDate.getFullYear();
      const month = String(inputDate.getMonth() + 1).padStart(2, "0");
      const day = String(inputDate.getDate()).padStart(2, "0");
      const hours = String(inputDate.getHours()).padStart(2, "0");
      const minutes = String(inputDate.getMinutes()).padStart(2, "0");
      const seconds = String(inputDate.getSeconds()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      setFormDate(formattedDate);
    }
  };

  const handleToDateChange = (e) => {
    const inputDate = new Date(e.target.value);
    if (!isNaN(inputDate)) {
      // Check if the date is valid
      const year = inputDate.getFullYear();
      const month = String(inputDate.getMonth() + 1).padStart(2, "0");
      const day = String(inputDate.getDate()).padStart(2, "0");
      const hours = String(inputDate.getHours()).padStart(2, "0");
      const minutes = String(inputDate.getMinutes()).padStart(2, "0");
      const seconds = String(inputDate.getSeconds()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      setToDate(formattedDate);
    }
  };

  const handleSearch = () => {
    const formData = {
      from_date: formDate,
      to_date: toDate,
    };
    dispatch(searchActivity(formData));
  };

  const list = useSelector((state) => {
    return state?.callActivitySlice?.callList;
  });
  console.log(list);
  const patientList = [];
  //   const patientList = list?.map((pl, i) => ({
  //     sl_no: i + 1,
  //     phone: pl.phone_num,
  //     name: pl.name,
  //     doc_name: pl.refered_by,
  //     options: (
  //       <Button
  //         size="small"
  //         variant="outlined"
  //         onClick={() => handleNavigate(pl)}
  //       >
  //         <EditIcon fontSize="small" />
  //       </Button>
  //     ),
  //   }));

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
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <TextField
          label="Form date"
          type="datetime-local"
          size="small"
          sx={{ width: { xs: "100%", md: "15%" } }}
          value={formDate.replace(" ", "T")}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleFromDateChange}
        />

        <TextField
          label="To Date"
          size="small"
          type="datetime-local"
          value={toDate}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleToDateChange}
          sx={{ width: { xs: "100%", md: "15%" } }}
        />
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
        <CustomTable columns={columns} rows={patientList} />
      </Box>
    </>
  );
};

export default CallActivity;
