import { Box, Button, Divider, Grid, MenuItem, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const p_form = [
    {
      label: "Phone Number",
      placeholder: "Phone Number",
      value: "",
      type: "number",
      variant: "standard",
    },
    {
      label: "Patient ID",
      placeholder: "Patient ID",
      value: "",
      type: "text",
      variant: "standard",
    },
    {
        label: "Patient Name",
        placeholder: "Patient Name",
        value: "",
        type: "text",
        variant: "standard",
      },
      {
        label: "Dealer ID",
        placeholder: "Dealer ID",
        value: "",
        type: "text",
        variant: "standard",
      },
    {
      label: "Call Status",
      placeholder: "Call Status",
      value: "",
      type: "select",
      variant: "standard",
      menuItems:["not connected", "connected"]
    },
    {
      label: "Sub Call Status",
      placeholder: "Sub Call Status",
      value: "",
      type: "select",
      variant: "standard",
      menuItems:[]
    },
    {
      label: "Call Schedule",
      placeholder: "Call Schedule",
      value: "",
      type: "datetime-local",
      variant: "standard",
    },
    {
      label: "Email Schedule",
      placeholder: "Email Schedule",
      value: "",
      type: "datetime-local",
      variant: "standard",
    },
    {
        label: "Remarks",
        placeholder: "Remarks",
        value: "",
        type: "body",
        variant: "standard",
      },
  ];

const PatientDetails = () => {
    const [formData, setFormData] = useState({});
  
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
  return (
    <Box sx={{backgroundColor:"#FFFF",mt:2,borderTop:"1px solid blue"}}>
        <Box sx={{p:1}}>
            <Typography variant='h6' fontWeight={'bold'}>Patient Details</Typography>
        </Box>
        <Divider/>
        <Grid container spacing={1} justifyContent={"center"} alignItems={'center'}>
              {p_form.map((field, index) => (
                <Grid key={index} item xs={3} >
                  {field.type === "select" ? (
                    <TextField
                      sx={{ width: "80%" }}
                      size="small"
                      type={field.type}
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
                  )  : (
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
                  )}
                </Grid>
              ))}
            </Grid>

            <Grid item xs={12} sx={{display:'flex',justifyContent:'center',mt:1.5,mb:1.5}}>
            <Button
              variant="contained"
              color="success"
              type="submit"
              size="small"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Grid>
    </Box>
  )
}

export default PatientDetails