import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import CustomTable from "../Table/customTable";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router";

const doctorList = [
  {
    id: "sl_no",
    align: "center",
    disablePadding: false,
    label: "SL No",
  },
  {
    id: "dcotor_name",
    align: "center",
    disablePadding: false,
    label: "Doctor Name",
  },
  {
    id: "action",
    align: "center",
    disablePadding: false,
    label: "Action",
  },
];

const doctorRow = [];

const doctorAppointment = [
  {
    id: "sl_no",
    align: "center",
    disablePadding: false,
    label: "SL No",
  },
  {
    id: "doc_name",
    align: "center",
    disablePadding: false,
    label: "Doctor Name",
  },
  {
    id: "total",
    align: "center",
    disablePadding: false,
    label: "Total Appointments",
  },
  {
    id: "action",
    align: "center",
    disablePadding: false,
    label: "Action",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/appointment_list");
  };
  const handleAddDoc = () => {
    navigate("/add_doctor");
  };
  const handleDetails = () => {
    navigate("/appointment_list");
  };
  const doctorAppointmentRow = [
    {
      sl_no: 1,
      doc_name: "Dr.Manju",
      total: 2,
      action: (
        <Button
          size="small"
          variant="contained"
          disableElevation
          onClick={handleDetails}
        >
          Details
        </Button>
      ),
    },
    {
      sl_no: 2,
      doc_name: "Dr.Madhu",
      total: 5,
      action: (
        <Button
          size="small"
          variant="contained"
          disableElevation
          onClick={handleDetails}
        >
          Details
        </Button>
      ),
    },
    {
      sl_no: 3,
      doc_name: "Dr.Shridhar",
      total: 10,
      action: (
        <Button
          size="small"
          variant="contained"
          disableElevation
          onClick={handleDetails}
        >
          Details
        </Button>
      ),
    },
    {
      sl_no: 4,
      doc_name: "Dr.Shashank",
      total: 20,
      action: (
        <Button
          size="small"
          variant="contained"
          disableElevation
          onClick={handleDetails}
        >
          Details
        </Button>
      ),
    },
  ];
  return (
    <Box sx={{}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: { xs: 2, md: 5 },
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Card sx={{ width: { xs: "100%", md: "50%" }, height: "300px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              height: "60px",
              backgroundColor: "#90e0ef",
              p: 2,
            }}
          >
            <Typography variant="subtitle1" color="#023e8a">
              <b>Doctor List</b>
            </Typography>
            <Button size="small" onClick={handleAddDoc}>
              <PersonAddIcon fontSize="small" />
            </Button>
          </Box>
          <Box sx={{ minHeight: "240px", overflow: "auto" }}>
            <CustomTable columns={doctorList} rows={doctorRow} />
          </Box>
        </Card>
        <Card sx={{ width: { xs: "100%", md: "50%" }, height: "300px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              height: "60px",
              backgroundColor: "#90e0ef",
              p: 2,
            }}
          >
            <Typography variant="subtitle1" color="#023e8a">
              <b>List of Appointments</b>
            </Typography>
            <Button size="small" onClick={handleNavigate}>
              <KeyboardDoubleArrowRightIcon fontSize="small" />
            </Button>
          </Box>
          <Box sx={{ height: "240px", overflow: "auto" }}>
            <CustomTable
              columns={doctorAppointment}
              rows={doctorAppointmentRow}
            />
          </Box>
        </Card>
      </Box>

      <Box sx={{ display: "flex", mt: 2, gap: 3, borderRadius: "12px" }}>
        <Card
          sx={{
            width: "240px",
            height: "120px",
            borderRadius: "12px", // Rounded corners
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Shadow effect
          }}
        >
          <Box
            sx={{
              p: 1,
              height: "40px",
              backgroundColor: "#90e0ef",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" color="#023e8a">
              WhatsApp
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              height: "80px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">
              200 <span>msg</span>{" "}
            </Typography>
          </Box>
        </Card>

        <Card
          sx={{
            width: "240px",
            height: "120px",
            backgroundColor: "#f8f9fa", // Light gray background
            borderRadius: "12px", // Rounded corners
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Shadow effect
          }}
        >
          <Box
            sx={{
              p: 1,
              height: "40px",
              backgroundColor: "#90e0ef",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" color="#023e8a">
              Call Volume
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              height: "80px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">
              1200<span>/day</span>{" "}
            </Typography>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;

// import React from 'react';
// import { Box, Card, Typography } from '@mui/material';
// import CustomTable from '../Table/customTable';

// const TableCard = ({ title, columns, rows }) => {
//   return (
//     <Card sx={{ width: "50%", height: "300px" }}>
//       <Box sx={{ display: 'flex', alignItems: "center", width: '100%', height: "60px", backgroundColor: "#90e0ef", p: 2 }}>
//         <Typography variant='subtitle1' color='#023e8a'><b>{title}</b></Typography>
//       </Box>
//       <CustomTable columns={columns} rows={rows} />
//     </Card>
//   );
// };

// const Dashboard = () => {
//   const doctorList = [
//     {
//       id: "sl_no",
//       align: "center",
//       disablePadding: false,
//       label: "SL No",
//     },
//     {
//       id: "dcotor_name",
//       align: "center",
//       disablePadding: false,
//       label: "Doctor Name",
//     },
//     {
//       id: "action",
//       align: "center",
//       disablePadding: false,
//       label: "Action",
//     },
//   ];

//   const doctorRow = [];

//   const doctorAppointment = [
//     {
//       id: "sl_no",
//       align: "center",
//       disablePadding: false,
//       label: "SL No",
//     },
//     {
//       id: "doc_name",
//       align: "center",
//       disablePadding: false,
//       label: "Doctor Name",
//     },
//     {
//       id: "total",
//       align: "center",
//       disablePadding: false,
//       label: "Total Appointments",
//     },
//     {
//       id: "action",
//       align: "center",
//       disablePadding: false,
//       label: "Action",
//     }
//   ];

//   const doctorAppointmentRow = [];

//   return (
//     <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", gap: 3,flexDirection:{xs:'column',md:"row"} }}>
//       <TableCard title="Doctor List" columns={doctorList} rows={doctorRow} />
//       <TableCard title="List of Appointments" columns={doctorAppointment} rows={doctorAppointmentRow} />
//     </Box>
//   );
// };

// export default Dashboard;
