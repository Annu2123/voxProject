import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { startRemoveUser, startUpdateUser } from "../../actions/Users/users";

const UpdateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (state) {
      setFormData(state);
    }
  }, [state]);
  console.log(state);

  const userForm = [
    {
      label: "First Name",
      placeholder: "First Name",
      value: state ? state.fname : "",
      type: "text",
      variant: "standard",
      formDataKey: "fname",
    },
    {
      label: "Last Name",
      placeholder: "Last Name",
      value: state ? state.lname : "",
      type: "text",
      variant: "standard",
      formDataKey: "lname",
    },
    {
      label: "Email",
      placeholder: "Email",
      value: state ? state.email_id : "",
      type: "email",
      variant: "standard",
      formDataKey: "email_id",
    },
    {
      label: "Role",
      placeholder: "Role",
      value: state ? state.role : "",
      type: "select",
      variant: "standard",
      menuItems: ["user", "admin"],
      formDataKey: "roles",
    },
    {
      label: "Telephony Extension Number",
      placeholder: "Telephony Extension Number",
      value: state ? state.telephone_ext : "",
      type: "multiline",
      formDataKey: "telephone_ext",
    },
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      id: state.id,
      fname: formData.fname,
      lname: formData.lname,
      roles: formData.roles,
      telephone_ext: formData.telephone_ext,
    };
    dispatch(startUpdateUser(data)).then((resultAction) => {
      if (resultAction.meta.requestStatus === "fulfilled") {
        navigate("/users");
      }
    });
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleDelete = () => {
    const data = {
      id: state.id,
    };
    dispatch(startRemoveUser(data)).then((resultAction) => {
      if (resultAction.meta.requestStatus === "fulfilled") {
        navigate("/users");
      }
    });
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
          backgroundColor: "#90e0ef",
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
          <b> Update / Remove User </b>
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          mt: 2,
        }}
      >
        <Button
          variant="contained"
          size="small"
          disableElevation
          sx={{ mb: 0, mr: 3 }}
          onClick={handleDelete}
          color="error"
        >
          Delete
        </Button>
      </Box>
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
            mb: 2,
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
                ) : field.type === "email" ? (
                  <TextField
                    sx={{ width: "60%" }}
                    size="small"
                    type={field.type}
                    label={field.label}
                    placeholder={field.placeholder}
                    name={field.formDataKey}
                    value={formData[field.formDataKey] || ""}
                    onChange={handleChange}
                    InputProps={{ readOnly: true }}
                  />
                ) : (
                  <TextField
                    sx={{ width: "60%" }}
                    size="small"
                    type={field.type}
                    label={field.label}
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

export default UpdateUser;
