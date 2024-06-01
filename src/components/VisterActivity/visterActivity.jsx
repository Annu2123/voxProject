import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const userForm = [
  {
    label: "Phone Number",
    placeholder: "Phone Number",
    value: "",
    type: "number",
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
    label: "Hospital Number",
    placeholder: "Hospital Number",
    value: "",
    type: "text",
    variant: "standard",
  },
  {
    label: "Alternative Phone Number",
    placeholder: "Alternative Phone Number",
    value: "",
    type: "number",
    variant: "standard",
  },
  {
    label: "Service",
    placeholder: "Service",
    value: "",
    type: "select",
    variant: "standard",
    menuItems: ['none'],
  },
  {
    label: "Billing Amount",
    placeholder: "Billing Amount",
    value: "",
    type: "number",
    variant: "standard",
  },
  {
    label: "Referal",
    placeholder: "Referal",
    value: "",
    type: "datetime-local",
    variant: "standard",
  },
];

const VisterActivity = () => {
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
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        minHeight: "70vh",
        borderRadius: "9px",
        mt: 2,
        borderTop: "1px solid lightgray",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 1.5,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ color: "#0077b6", mr: 2 }}>
          <b> Visit Activity </b>
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: { xs: "100%", md: "50%" },
            backgroundColor: "#FAFAFA",
            mt: 2,
            borderRadius: "8px",
            border: "1px solid lightgray",
            mb:2
          }}
        >
          <Grid container spacing={1.5} mt={2}>
            {userForm.map((field, index) => (
              <Grid
                key={index}
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                {field.type === "select" ? (
                  <TextField
                    sx={{ width: "60%" }}
                    size="small"
                    type={field.type}
                    // variant={field.variant}
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
                ) : field.type === "multiline" ? (
                    
                      <TextField
                        sx={{ width: "60%", mt: 1 }}
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
                  ) : (
                  <TextField
                    sx={{ width: "60%" }}
                    size="small"
                    type={field.type}
                    label={field.label}
                    // variant={field.variant}
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
            sx={{ display: "flex", justifyContent: "center", mt: 1.5, mb: 1.5 }}
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
        </Box>
      </Box>
    </Box>
  );
};

export default VisterActivity;
