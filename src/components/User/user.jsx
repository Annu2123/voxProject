import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CustomTable from "../Table/customTable";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { startGetUserList } from "../../actions/Users/users";
// import Recevie from "../RabbitMQ/receive";

const columns = [
  {
    id: "sl_no",
    align: "center",
    disablePadding: false,
    label: "SL No",
  },
  {
    id: "first_name",
    align: "center",
    disablePadding: false,
    label: "First Name",
  },
  {
    id: "last_name",
    align: "center",
    disablePadding: false,
    label: "Last Name",
  },
  {
    id: "email",
    align: "center",
    disablePadding: false,
    label: "Contacts",
  },
  {
    id: "extension_Number",
    align: "center",
    disablePadding: false,
    label: "Extension Number",
  },
  {
    id: "action",
    align: "center",
    disablePadding: false,
    label: "Action",
  },
];

const rows = [];

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreate = () => {
    navigate("create");
  };

  useEffect(() => {
    dispatch(startGetUserList());
  }, [dispatch]);

  const data = useSelector((state) => {
    return state.usersSlice.userList;
  });

  const list = data?.map((l,i) => ({
    sl_no:i+1,
    first_name: l.fname,
    last_name: l.lname,
    email: l.email_id,
    extension_Number: l.telephone_ext,
    action: (
      <Button
        variant="contained"
        size="small"
        disableElevation
        color="warning"
        onClick={() => handleEdit(l)}
      >
        Edit
      </Button>
    ),
  }));

  const handleEdit = (l) => {
    navigate("edit", { state: l });
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
      {/* <Recevie/> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 1.5,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ color: "#0077b6" }}>
          <b> Users </b>
        </Typography>
        <Button
          variant="contained"
          size="small"
          disableElevation
          sx={{ mb: 1, mr: 2 }}
          onClick={handleCreate}
        >
          Create
        </Button>
      </Box>
      <Divider />

      <Box sx={{ mt: 2, p: 2 }}>
        <CustomTable columns={columns} rows={list} />
      </Box>
    </Box>
  );
};

export default User;
