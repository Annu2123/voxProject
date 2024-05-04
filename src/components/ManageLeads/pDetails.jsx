import {
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const p_form = [
  {
    label: "Patient Name",
    placeholder: "Patient Name",
    value: "",
    type: "text",
    variant: "standard",
  },
  {
    label: "Phone Number",
    placeholder: "Phone Number",
    value: "",
    type: "number",
    variant: "standard",
  },

  {
    label: "Email",
    placeholder: "Email",
    value: "",
    type: "email",
    variant: "standard",
  },
  {
    label: "Gender",
    placeholder: "Gender",
    value: "",
    type: "select",
    variant: "standard",
    menuItems:['male','female',"others"],
  },
  {
    label: "Patient Address",
    placeholder: "Patient Address",
    value: "",
    type: "text",
    variant: "standard",
  },
  {
    label: "Appointed Reason",
    placeholder: "Appointed Reason",
    value: "",
    type: "body",
    variant: "standard",
  },

];

const Pdetails = () => {
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
            ) : (
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
