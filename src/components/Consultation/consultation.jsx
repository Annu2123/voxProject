import React from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from "react-router";
const Consultation = () => {
  const navigate = useNavigate()

  const handleWhatsapp =() =>{
    navigate('/whatsapp')
  }

  const handleEmail =() =>{
    navigate('/email')
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
      <Box sx={{ display: "flex", justifyContent: "space-between",backgroundColor: "#90e0ef",height: "50px",p:1,borderRadius:'8px' }}>
        <Typography variant="h6" sx={{ color: "#0077b6" }}>
          <b> Patient Details </b>
        </Typography>
      </Box>
      <Grid container xs={12} spacing={2} sx={{ p:1,mt:0.2 }}>
        <Grid item xs={6} md={6}>
          <TextField
            label="Patient Name"
            fullWidth
            size="small"
            placeholder="Patient Name"
            type="text"
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <TextField
            label="Patient Email"
            placeholder="Patient Email"
            type="email"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            label="Patient Gender"
            placeholder="Patient Gender"
            select
            fullWidth
            size="small"
          >
            <MenuItem value='male'>Male</MenuItem>
            <MenuItem value='female'>Female</MenuItem>
            <MenuItem value='other'>Other</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            label="Patient Age"
            placeholder="Patient Age"
            type="number"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            label="Patient Number"
            placeholder="Patient Number"
            type="number"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            label="Select Doctor"
            placeholder="Select Doctor"
            select
            fullWidth
            required
            size="small"
          >
            <MenuItem value='none'>None</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6} md={9}>
          <TextField
            label="Patient Address"
            placeholder="Patient Address"
            type="body"
            rows={3}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            label="Pin Code"
            placeholder="Pin Code"
            type="number"
            fullWidth
            size="small"
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Select Date and Time"
            placeholder="Select Date and Time"
            type="dateandtime"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Apoointment Reason"
            placeholder="Apoointment Reason"
            select
            fullWidth
            required
            size="small"
          >
            <MenuItem value='none'>None</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center",mt:2,gap:2 }}
      >
        <Button variant="contained" color="success" size="small">
          Submit
        </Button>
        <Button variant="contained" sx={{color:"white",backgroundColor:'#38b000'}} size="small" onClick={handleWhatsapp}>
            <WhatsAppIcon/>
        </Button>
        <Button variant="contained" color="success" size="small" onClick={handleEmail}>
          <MailIcon/>
        </Button>
      </Box>
    </Box>
  );
};

export default Consultation;
