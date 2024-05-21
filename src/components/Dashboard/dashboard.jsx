import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  DialogActions,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTable from "../Table/customTable";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getTimeSlot, removeDoctor, startGetDoctorList } from "../../actions/Doctor/doctor";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { startGetAppoinmentsList } from "../../actions/Appointment/appointment";

const doctorList = [
  {
    id: "doc_id",
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
    id: "dcotor_dept",
    align: "center",
    disablePadding: false,
    label: "Department",
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
    id: "doc_id",
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

const cardData = [
  { title: "WhatsApp", value: 200, unit: "msg" },
  { title: "Call Volume", value: 1200, unit: "/day" },
  { title: "Email", value: 1200, unit: "" },
  { title: "Visiter", value: 1200, unit: "/day" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleNavigate = () => {
    navigate("/appointment_list");
  };
  const handleAddDoc = () => {
    navigate("/add_doctor");
  };

  const handleDetails = (list) => {
    const formData = {
      doctor_id : list.doctor_id,
      date:date
    }
    navigate("/appointment_list",{state:formData});
  };

  useEffect(() => {
    dispatch(startGetDoctorList());
  }, [dispatch]);

  const timeSlot = useSelector((state) => state.doctorSlice?.timeSlot);

  const handleEditClick = async (rowData) => {
    // const id = { id: rowData?.id };
    // // await dispatch(getTimeSlot(id));
    // let abcd = await getTimeSlot(id);
    // console.log(abcd)
    // const fullData = { ...rowData, ...abcd };
    // console.log(fullData);
    navigate("edit_doctor", { state: rowData });
  };

  const data = useSelector((state) => {
    return state.doctorSlice?.list;
  });
  // console.log(data)

  const docList = data?.map((docList, i) => ({
    doc_id: i+1,
    dcotor_name: docList.name,
    dcotor_dept: docList.department,
    action: (
      <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
        <Button
          size="small"
          disableElevation
          color="warning"
          variant="outlined"
          onClick={() => handleEditClick(docList)}
        >
          <EditIcon fontSize="small" />
        </Button>
        {/* <Button
          size="small"
          disableElevation
          color="error"
          variant="outlined"
          onClick={() => handleDeleteConfirmationOpen(docList.id)}
        >
          <DeleteIcon fontSize="small" />
        </Button> */}
      </Box>
    ),
  }));

  const handleDeleteConfirmationOpen = (rowData) => {
    setSelectedRow(rowData);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteAction = () => {
    const id = {
      id: selectedRow,
    };
    dispatch(removeDoctor(id)).then((resultAction) => {
      if (resultAction.meta.requestStatus === "fulfilled") {
        dispatch(startGetDoctorList());
      }
    });
    setDeleteConfirmationOpen(false);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  useEffect(() => {
    const formData = {
      date: date,
    };
    dispatch(startGetAppoinmentsList(formData));
  }, [date]);

  const appointmentData = useSelector((state) => {
    return state.appointmentSlice?.appointment;
  });
  // console.log(appointmentData);
  const apnmtList = appointmentData?.map((list,i) => ({
    doc_id: i+1,
    doc_name: list.doctor_name,
    total: list.appoint_count,
    action: (
      <Button
        size="small"
        variant="contained"
        disableElevation
        onClick={()=>handleDetails(list)}
      >
        Details
      </Button>
    ),
  }));

  return (
    <Box sx={{}}>
      <Box
        sx={{
          display: "flex",
          
          gap: 3,
          borderRadius: "12px",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {cardData.map((item, index) => (
          <Card
            key={index}
            sx={{
              width: { xs: "100%", md: "240px" },
              height: "120px",
              borderRadius: "12px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
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
                {item.title}
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
                {item.value} <span>{item.unit}</span>
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: { xs: 2, md: 5 },
          flexDirection: { xs: "column", md: "row" },
          mt: 2,
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
          <Box sx={{ height: "240px", overflow: "auto" }}>
            <CustomTable columns={doctorList} rows={docList} />
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
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                label="Choose Date"
                size="small"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={date}
                onChange={handleDateChange}
              />
              {/* <Button size="small" onClick={handleNavigate}>
                <KeyboardDoubleArrowRightIcon fontSize="small" />
              </Button> */}
            </Box>
          </Box>
          <Box sx={{ height: "240px", overflow: "auto" }}>
            <CustomTable
              columns={doctorAppointment}
              rows={apnmtList}
            />
          </Box>
        </Card>
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
          <Button onClick={handleDeleteAction} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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
