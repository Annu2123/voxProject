import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailIcon from "@mui/icons-material/Mail";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { startAddPatient } from "../../actions/Patient/patient";
import { startGetRelgnList } from "../../actions/Religion/religion";
import { startGetReferList } from "../../actions/ReferBy/referBy";

const religion = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetRelgnList());
  }, []);
  const relgnList = useSelector((state) => {
    return state?.religionSlice?.relgnList;
  });
  let r = relgnList?.map((r) => r.religion);
  return r?.length > 1 ? r : ["none"];
};

const referBy = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetReferList());
  }, []);
  const referByList = useSelector((state) => {
    return state?.referBySlice?.referList;
  });
  let r = referByList?.map((r) => r.refered_by);
  return r?.length > 1 ? r : ["none"];
};

const appointment = [
  {
    label: "Department",
    placeholder: "Department",
    value: "",
    type: "select",
    menuItems: ["none"],
    // variant: "standard",
  },
  {
    label: "Doctor Name",
    placeholder: "Doctor Name",
    value: "",
    type: "select",
    menuItems: ["none"],
    // variant: "standard",
  },
  {
    label: "Date",
    placeholder: "Date",
    value: "",
    type: "date",
    // variant: "standard",
  },
];

const generateTimes = () => {
  const times = [];
  let hour = 0;
  let minute = 0;

  while (hour < 12) {
    const ampm = hour < 12 ? "AM" : "PM";
    const formattedHour = hour === 0 ? 12 : hour; // Convert 0 to 12 for 12:00 AM/PM
    const formattedMinute = minute === 0 ? "00" : minute;
    times.push(`${formattedHour}:${formattedMinute} ${ampm}`);

    minute += 30;
    if (minute === 60) {
      minute = 0;
      hour += 1;
    }
  }

  return times;
};
const Consultation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state)=>{
    return state.patientSlice.findData
  })
  const actualData =data && data[0]
  console.log(actualData)

  const [formData, setFormData] = useState({});
  const [showAppnmt, setShowAppnmt] = useState(false);
  const [appoinmentData, setAppoinmentData] = useState({});
  const [open, setOpen] = useState(false);

  const p_form = [
    {
      label: "Phone Number",
      placeholder: "Phone Number",
      value: "",
      type: "number",
      formDataKey: "phone_num",
      // variant: "standard",
    },
    {
      label: "Alternate Phone Number",
      placeholder: "Alternate Phone Number",
      value: "",
      type: "number",
      formDataKey: "alt_phone_num",
      // variant: "standard",
    },
    {
      label: "Patient Name",
      placeholder: "Patient Name",
      value: "",
      type: "text",
      formDataKey: "name",
      // variant: "standard",
    },
    {
      label: "Patient Email",
      placeholder: "Patient Email",
      value: "",
      type: "email",
      formDataKey: "email",
      // variant: "standard",
    },
    {
      label: "Date of Birth",
      placeholder: "Date of Birth",
      value: "",
      type: "date",
      formDataKey: "dob",
      // variant: "standard",
    },
    {
      label: "Gender",
      placeholder: "Gender",
      value: "",
      type: "select",
      formDataKey: "gender",
      // variant: "standard",
      menuItems: ["Male", "Female"],
    },
    {
      label: "Father/Husband name",
      placeholder: "Father/Husband name",
      value: "",
      type: "text",
      formDataKey: "father_husband_name",
      // variant: "standard",
    },
    {
      label: "Martial Status",
      placeholder: "Martial Status",
      value: "",
      type: "select",
      // variant: "standard",
      formDataKey: "marital_status",
      menuItems: ["Married", "Unmarried"],
    },
    {
      label: "Aadhar Number",
      placeholder: "Aadhar Number",
      value: "",
      type: "number",
      formDataKey: "aadhar_num",
      // variant: "standard",
    },
    {
      label: "Nationality",
      placeholder: "Nationality",
      value: "",
      type: "text",
      formDataKey: "nationality",
      // variant: "standard",
    },
    {
      label: "Religion ",
      placeholder: "Religion ",
      value: "",
      type: "select",
      // variant: "standard",
      formDataKey: "religion",
      menuItems: religion(),
    },
    {
      label: "Pin Code",
      placeholder: "Pin Code",
      value: "",
      type: "number",
      formDataKey: "pincode",
      // variant: "standard",
    },
    {
      label: "City",
      placeholder: "City",
      value: "",
      type: "text",
      formDataKey: "city",
      // variant: "standard",
    },
    {
      label: "Refered by",
      placeholder: "Refered by",
      value: "",
      type: "select",
      formDataKey: "refered_by",
      // variant: "standard",
      menuItems: referBy(),
    },
    {
      label: "Remarks",
      placeholder: "Remarks",
      value: "",
      type: "text",
      formDataKey: "remarks",
      // variant: "standard",
    },
    {
      label: "Patient Address",
      placeholder: "Patient Address",
      value: "",
      type: "multiline",
      formDataKey: "address",
      // variant: "standard",
    },
  ];
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [selectedTime, setSelectedTime] = useState(null);
  const times = generateTimes();

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startAddPatient(formData));
    setFormData({});
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleWhatsapp = () => {
    navigate("/whatsapp");
  };

  const handleEmail = () => {
    navigate("/email");
  };
  const handleAppoinment = () => {
    setShowAppnmt((prevShowAppnmt) => !prevShowAppnmt);
  };

  return (
    <Box
      sx={{
        width: "100%",
        border: "1px soild red",
        backgroundColor: "white",
        minHeight: "60vh",
        borderRadius: "9px",
        // p: 2,
      }}
    >
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#90e0ef",
          height: "50px",
          p: 1,
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6" sx={{ color: "#0077b6" }}>
          <b> Patient Details </b>
        </Typography>
      </Box> */}
      <Box
        sx={{
          minHeight: "100px",
          border: "1px solid lightgray",
          mt: 1,
          borderRadius: "8px",
          m: 1,
          backgroundColor: "#FAFAFA",
          p: 1,
        }}
      >
        <Typography variant="h6" sx={{ color: "#0077b6" }}>
          <b>
            {" "}
            Patient Details <Divider />{" "}
          </b>
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <Box
            sx={{
              width: "90%",
              // backgroundColor: "red",
              minHeight: "100px",
              borderRadius: "8px",
            }}
          >
            <Grid container spacing={1}>
              {p_form.map((field, index) => (
                // <Grid key={index} item xs={12} md={4} sx={{display:"flex",justifyContent:"flex-end"}}>
                <React.Fragment key={index}>
                  {field.type === "select" ? (
                    <Grid
                      item
                      xs={12}
                      md={4}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <TextField
                        sx={{ width: "80%", mt: 1 }}
                        size="small"
                        type="text"
                        variant={field.variant}
                        label={field.label}
                        placeholder={field.placeholder}
                        name={field.formDataKey}
                        value={formData[field.formDataKey] || ""}
                        onChange={handleChange}
                        select
                      >
                        {field.menuItems?.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  ) : field.type === "date" ? (
                    <Grid
                      item
                      xs={12}
                      md={4}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <TextField
                        sx={{ width: "80%", mt: 1 }}
                        size="small"
                        type="date"
                        variant={field.variant}
                        label={field.label}
                        placeholder={field.placeholder}
                        name={field.formDataKey}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={formData[field.formDataKey] || ""}
                        onChange={handleChange}
                      />
                    </Grid>
                  ) : field.type === "time" ? (
                    <Grid
                      item
                      xs={12}
                      md={4}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <TextField
                        sx={{ width: "80%", mt: 1 }}
                        size="small"
                        type="time"
                        variant={field.variant}
                        label={field.label}
                        placeholder={field.placeholder}
                        name={field.formDataKey}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={formData[field.formDataKey] || ""}
                        onChange={handleChange}
                      />
                    </Grid>
                  ) : field.type === "multiline" ? (
                    <Grid
                      item
                      xs={12}
                      md={12}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <TextField
                        sx={{ width: { md: "93%", xs: "80%" }, mt: 1 }}
                        size="small"
                        multiline
                        rows={3}
                        type="text"
                        variant={field.variant}
                        label={field.label}
                        placeholder={field.placeholder}
                        name={field.formDataKey}
                        value={formData[field.formDataKey] || ""}
                        onChange={handleChange}
                      />
                    </Grid>
                  ) : (
                    <Grid
                      item
                      xs={12}
                      md={4}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <TextField
                        sx={{ width: "80%", mt: 1 }}
                        size="small"
                        type={field.type}
                        label={field.label}
                        variant={field.variant}
                        placeholder={field.placeholder}
                        name={field.formDataKey}
                        value={formData[field.formDataKey] || ""}
                        onChange={handleChange}
                      />
                    </Grid>
                  )}
                </React.Fragment>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "900px",
            height: "700px",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
          <DialogTitle variant="h6" sx={{ color: "#0077b6" }}>
            <b> Appointment </b>
          </DialogTitle>
          <Tooltip title="Close" placement="left">
            <Button onClick={handleClose} size="small" sx={{ color: "black" }}>
              <CloseIcon fontSize="small" />
            </Button>
          </Tooltip>
        </Box>

        <Divider />
        <DialogContent>
          <Box
            sx={{
              minHeight: "80px",
              border: "1px solid lightgray",
              mt: 1,
              borderRadius: "8px",
              m: 1,
              backgroundColor: "#FAFAFA",
              p: 1,
            }}
          >
            {/* <Typography variant="h6" sx={{ color: "#0077b6" }}>
              <b> Appointment </b>
            </Typography> */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
              <Box
                sx={{
                  width: "90%",
                  // backgroundColor: "red",
                  minHeight: "100px",
                  borderRadius: "8px",
                }}
              >
                <Grid
                  container
                  spacing={1}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  {appointment.map((field, index) => (
                    <React.Fragment key={index}>
                      {field.type === "select" ? (
                        <Grid
                          item
                          xs={12}
                          md={4}
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <TextField
                            sx={{ width: "80%" }}
                            size="small"
                            type="text"
                            variant={field.variant}
                            label={field.label}
                            placeholder={field.placeholder}
                            name={field.label}
                            value={formData[field.label] || ""}
                            onChange={handleChange}
                            select
                          >
                            {field.menuItems.map((item, index) => (
                              <MenuItem key={index} value={item}>
                                {item}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                      ) : field.type === "date" ? (
                        <Grid
                          item
                          xs={12}
                          md={4}
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <TextField
                            sx={{ width: "80%" }}
                            size="small"
                            type="date"
                            variant={field.variant}
                            label={field.label}
                            placeholder={field.placeholder}
                            name={field.label}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={formData[field.label] || ""}
                            onChange={handleChange}
                          />
                        </Grid>
                      ) : field.type === "time" ? (
                        <Grid
                          item
                          xs={12}
                          md={4}
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <TextField
                            sx={{ width: "80%" }}
                            size="small"
                            type="time"
                            variant={field.variant}
                            label={field.label}
                            placeholder={field.placeholder}
                            name={field.label}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={formData[field.label] || ""}
                            onChange={handleChange}
                          />
                        </Grid>
                      ) : (
                        <Grid
                          item
                          xs={12}
                          md={4}
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <TextField
                            sx={{ width: "80%" }}
                            size="small"
                            type={field.type}
                            label={field.label}
                            variant={field.variant}
                            placeholder={field.placeholder}
                            name={field.label}
                            value={formData[field.label] || ""}
                            onChange={handleChange}
                          />
                        </Grid>
                      )}
                    </React.Fragment>
                  ))}
                  {times.map((time, index) => (
                    <Button
                      key={index}
                      onClick={() => handleTimeClick(time)}
                      sx={{
                        padding: "10px",
                        margin: "5px",
                        border:
                          selectedTime === time
                            ? "2px solid blue"
                            : "2px solid lightgray",
                        backgroundColor:
                          selectedTime === time ? "blue" : "white",
                        color: selectedTime === time ? "white" : "black",
                        borderRadius: "5px",
                        cursor: "pointer",
                        mt: 2,
                      }}
                    >
                      {time}
                    </Button>
                  ))}
                </Grid>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 1,
            }}
          >
            <Button variant="contained" color="warning" size="small">
              Add Appoinment
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          disableElevation
          color="success"
          size="small"
          onClick={handleSubmit}
        >
          Add patient
        </Button>

        <Button
          variant="contained"
          disableElevation
          color="success"
          size="small"
          onClick={handleOpen}
        >
          Appointment
        </Button>
      </Box>
    </Box>
  );
};

export default Consultation;
