import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router";

const p_form = [
  {
    label: "Phone Number",
    placeholder: "Phone Number",
    value: "",
    type: "number",
    formDataKey:"phone_num"
    // variant: "standard",
  },
  {
    label: "Patient Name",
    placeholder: "Patient Name",
    value: "",
    type: "text",
    formDataKey:"patient_name"
    // variant: "standard",
  },
  {
    label: "Patient Email",
    placeholder: "Patient Email",
    value: "",
    type: "email",
    formDataKey:'email_id'
    // variant: "standard",
  },
  {
    label: "Date of Birth",
    placeholder: "Date of Birth",
    value: "",
    type: "date",
    // variant: "standard",
  },
  {
    label: "Gender",
    placeholder: "Gender",
    value: "",
    type: "select",
    // variant: "standard",
    menuItems: ["Male", "Female"],
  },
  {
    label: "Father/Husband name",
    placeholder: "Father/Husband name",
    value: "",
    type: "text",
    // variant: "standard",
  },
  {
    label: "Martial Status",
    placeholder: "Martial Status",
    value: "",
    type: "select",
    // variant: "standard",
    menuItems: ["Married", "Unmarried"],
  },
  
  {
    label: "Pin Code",
    placeholder: "Pin Code",
    value: "",
    type: "number",
    // variant: "standard",
  },
  // {
  //   label: "Choose Date",
  //   placeholder: "Choose Date",
  //   value: "",
  //   type: "date",
  //   // variant: "standard",
  // },
  // {
  //   label: "Choose Time",
  //   placeholder: "Choose Time",
  //   value: "",
  //   type: "time",
  //   // variant: "standard",
  // },
  {
    label: "Religion ",
    placeholder: "Religion ",
    value: "",
    type: "select",
    // variant: "standard",
    menuItems: ["none"],
  },
  {
    label: "Patient Address",
    placeholder: "Patient Address",
    value: "",
    type: "multiline",
    // variant: "standard",
  },
];

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
const Consultation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [showAppnmt,setShowAppnmt] = useState(false)
  const [appoinmentData, setAppoinmentData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
  const handleAppoinment=()=>{
    setShowAppnmt(true)
  }

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
          <b> Patient Details </b>
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
            <Grid
              container
              spacing={1}
            >
              {p_form.map((field, index) => (
                // <Grid key={index} item xs={12} md={4} sx={{display:"flex",justifyContent:"flex-end"}}>
                <React.Fragment key={index}>
                  {field.type === "select" ? (
                    <Grid item xs={12} md={4} sx={{display:"flex",justifyContent:"center"}}>
                    <TextField
                      sx={{ width: "80%",mt:1 }}
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
                    <Grid item xs={12} md={4} sx={{display:"flex",justifyContent:"center"}}>
                    <TextField
                    sx={{ width: "80%",mt:1 }}
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
                    <Grid item xs={12} md={4} sx={{display:"flex",justifyContent:"center"}}>
                    <TextField
                    sx={{ width: "80%",mt:1 }}
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
                  ): field.type === "multiline" ? (
                    <Grid item xs={12} md={12 } sx={{display:"flex",justifyContent:'center'}}>
                    <TextField
                    sx={{ width:{md:"93%",xs:'80%'},mt:1 }}
                      size="small"
                      multiline
                      rows={3}
                      type="text"
                      variant={field.variant}
                      label={field.label}
                      placeholder={field.placeholder}
                      name={field.label}
                      value={formData[field.label] || ""}
                      onChange={handleChange}
                    />
                    </Grid>
                  )  : (
                    <Grid item xs={12} md={4} sx={{display:"flex",justifyContent:"center"}}>
                    <TextField
                    sx={{ width: "80%",mt:1 }}
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
            </Grid>
          </Box>
        </Box>
      </Box>
              {showAppnmt &&
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
        <Typography variant="h6" sx={{ color: "#0077b6" }}>
          <b> Appointment </b>
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
            <Grid
              container
              spacing={1}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {appointment.map((field, index) => (
                <React.Fragment key={index}>
                
                  {field.type === "select" ? (
                    <Grid item xs={12} md={4} sx={{display:"flex",justifyContent:"center"}}>
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
                    <Grid item xs={12} md={4} sx={{display:"flex",justifyContent:"center"}}>
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
                    <Grid item xs={12} md={4} sx={{display:"flex",justifyContent:"center"}}>
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
                    <Grid item xs={12} md={4} sx={{display:"flex",justifyContent:"center"}}>
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
            </Grid>
          </Box>
        </Box>
      </Box>
}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
          gap: 2,
        }}
      >
        <Button variant="contained" disableElevation color="success" size="small" onClick={handleSubmit}>
          Submit
        </Button>
        
        <Button
          variant="contained"
          disableElevation
          color="success"
          size="small"
          onClick={handleAppoinment}
        >
          Appoinment
        </Button>
      </Box>
    </Box>
  );
};

export default Consultation;
