import { Box, Button, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTable from "../Table/customTable";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { searchActivity } from "../../actions/CallActivity/callActivity";
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
  const [formDate, setFormDate] = useState("");
  const [toDate, setToDate] = useState("");

  
  const handleSearch = () => {
    const formData = {
      from_date: formDate,
      to_date: toDate,
    };
    console.log(formData)
    dispatch(searchActivity(formData));
  };

  const list = useSelector((state) => {
    return state?.callActivitySlice?.callList;
  });
  console.log(list)
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
          sx={{ width: { xs: "100%", md: "14%" } }}
          value={formDate}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            const inputDate = new Date(e.target.value); // Parse the input date
            const formattedDate = inputDate
              .toISOString()
              .slice(0, 19)
              .replace("T", " "); // Format the date as "YYYY-MM-DD HH:mm:ss"
            setFormDate(formattedDate);
          }}
        />

        <TextField
          label="To Date"
          size="small"
          type="datetime-local"
          value={toDate}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            const inputDate = new Date(e.target.value); // Parse the input date
            const formattedDate = inputDate
              .toISOString()
              .slice(0, 19)
              .replace("T", " "); // Format the date as "YYYY-MM-DD HH:mm:ss"
            setToDate(formattedDate);
          }}
          sx={{ width: { xs: "100%", md: "24%" } }}
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
