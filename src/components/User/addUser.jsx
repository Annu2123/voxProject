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
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { startAddUser } from "../../actions/Users/users";

const userForm = [
  {
    label: "First Name",
    placeholder: "First Name",
    value: "",
    type: "text",
    variant: "standard",
    formDataKey:'fname'
  },
  {
    label: "Last Name",
    placeholder: "Last Name",
    value: "",
    type: "text",
    variant: "standard",
    formDataKey:'lname'
  },
  {
    label: "Email",
    placeholder: "Email",
    value: "",
    type: "email",
    variant: "standard",
    formDataKey:'email_id'
  },
  {
    label: "Password",
    placeholder: "Password",
    value: "",
    type: "text",
    variant: "standard",
    formDataKey:'password'
  },
  {
    label: "Confirm Password",
    placeholder: "Confirm Password",
    value: "",
    type: "text",
    variant: "standard",
    formDataKey:'confirm_password'
  },
  {
    label: "Role",
    placeholder: "Role",
    value: "",
    type: "select",
    variant: "standard",
    menuItems: ["user", "admin"],
    formDataKey:'roles'
  },
  {
    label: "Telephony Extension Number",
    placeholder: "Telephony Extension Number",
    value: "",
    type: "multiline",
    formDataKey:'telephone_ext'
  },
];

const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({});

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.password===formData.confirm_password) {
        // dispatch(startAddUser(formData))
        dispatch(startAddUser(formData)).then((resultAction) => {
            if (resultAction.meta.requestStatus === "fulfilled") {
              setFormData({})
            }
          });
    }else{
        toast.error("Password and Confirm-password should be same")
    }
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
        <Button
          variant="contained"
          size="small"
          disableElevation
          sx={{ mb: 1 }}
          onClick={handleBack}
        >
          Back
        </Button>
        <Typography variant="h6" sx={{ color: "#0077b6", mr: 2 }}>
          <b> Create User </b>
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

export default AddUser;
