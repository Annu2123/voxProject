import {
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

const Pdetails = () => {
  const location = useLocation()
  const {state} = location
  const [formData, setFormData] = useState({});

  useEffect(()=>{
    if(state){
      setFormData(state)
    }
  },[state])

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

  const p_form = [
    {
      label: "Phone Number",
      placeholder: "Phone Number",
      value: state ? state.phone_num : "",
      type: "number",
      formDataKey: "phone_num",
      readOnly: !!state,
    },
    {
      label: "Alternate Phone Number",
      placeholder: "Alternate Phone Number",
      value: state ? state.alt_phone_num : "",
      type: "number",
      formDataKey: "alt_phone_num",
    },
    {
      label: "Patient Name",
      placeholder: "Patient Name",
      value: state ? state.name : "",
      type: "text",
      formDataKey: "name",
    },
    {
      label: "Patient Email",
      placeholder: "Patient Email",
      value: state ? state.email : "",
      type: "email",
      formDataKey: "email",
    },
    {
      label: "Date of Birth",
      placeholder: "Date of Birth",
      value: state ? state.dob : "",
      type: "date",
      formDataKey: "dob",
    },
    {
      label: "Gender",
      placeholder: "Gender",
      value: state ? state.gender : "",
      type: "select",
      formDataKey: "gender",
      menuItems: ["Male", "Female"],
    },
    {
      label: "Father/Husband name",
      placeholder: "Father/Husband name",
      value: state ? state.father_husband_name : "",
      type: "text",
      formDataKey: "father_husband_name",
    },
    {
      label: "Martial Status",
      placeholder: "Martial Status",
      value: state ? state.marital_status : "",
      type: "select",
      formDataKey: "marital_status",
      menuItems: ["Married", "Unmarried"],
    },
    {
      label: "Aadhar Number",
      placeholder: "Aadhar Number",
      value: state ? state.aadhar_num : "",
      type: "number",
      formDataKey: "aadhar_num",
    },
    {
      label: "Nationality",
      placeholder: "Nationality",
      value: state ? state.nationality : "",
      type: "text",
      formDataKey: "nationality",
    },
    {
      label: "Religion",
      placeholder: "Religion",
      value: state ? state.religion : "",
      type: "select",
      formDataKey: "religion",
      menuItems: ['none'],
    },
    {
      label: "Pin Code",
      placeholder: "Pin Code",
      value: state ? state.pincode : "",
      type: "number",
      formDataKey: "pincode",
    },
    {
      label: "City",
      placeholder: "City",
      value: state ? state.city : "",
      type: "text",
      formDataKey: "city",
    },
    {
      label: "Refered by",
      placeholder: "Refered by",
      value: state ? state.refered_by : "",
      type: "select",
      formDataKey: "refered_by",
      menuItems: ['none'],
    },
    {
      label: "Patient Address",
      placeholder: "Patient Address",
      value: state ? state.address : "",
      type: "multiline",
      formDataKey: "address",
    },
  ];

  return (
    <Card sx={{ width: "100%" }}>
      <Box sx={{ p: 1, minHeight: "45px", backgroundColor: "#90e0ef" }}>
        <Typography
          variant="subtitle1"
          fontWeight={"bold"}
          sx={{ color: "#023e8a" }}
        >
          Patient Details
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        marginTop={1}
        // sx={{display:"flex",alignItems:"center",justifyContent:"center"}}
      >
        {p_form.map((field, index) => (
          <Grid key={index} xs={12} md={6} item sx={{display:"flex",justifyContent:"center"}}>
            {field.type === "select" ? (
              <TextField
                sx={{ width: "80%" }}
                size="small"
                type={field.type}
                variant={field.variant}
                label={field.label}
                placeholder={field.placeholder}
                name={field.formDataKey}
                value={formData[field.formDataKey] || ""}
                onChange={handleChange}
                select
              >
                {field.menuItems.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                sx={{ width: "80%" }}
                size="small"
                type={field.type}
                label={field.label}
                variant={field.variant}
                placeholder={field.placeholder}
                name={field.formDataKey}
                value={formData[field.formDataKey] || ""}
                onChange={handleChange}
              />
            )}
          </Grid>
        ))}
      </Grid>

      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 1.5 }}
      >
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
    </Card>
  );
};

export default Pdetails;
