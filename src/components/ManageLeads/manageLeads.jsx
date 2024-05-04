import { Box, Button, MenuItem, TextField } from "@mui/material";
import React from "react";
import CustomTable from "../Table/customTable";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router";

const columns = [
  {
    id: "sl_no",
    align: "center",
    disablePadding: false,
    label: "SL No",
  },
  {
    id: "phone",
    align: "center",
    disablePadding: false,
    label: "Phone",
  },
  {
    id: "name",
    align: "center",
    disablePadding: false,
    label: "Name",
  },
  {
    id: "doc_name",
    align: "center",
    disablePadding: false,
    label: "Doctor Name",
  },
  {
    id: "options",
    align: "center",
    disablePadding: false,
    label: "Options",
  },
];

const ManageLeads = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("edit_leads");
  };

  const rows = [
    {
      options: (
        <Button size="small" variant="outlined" onClick={handleNavigate}>
          <EditIcon fontSize="small" />
        </Button>
      ),
    },
  ];
  
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: {xs:1,md:2},
          justifyContent: "center",
          border: "1px solid lightgray",
          mt: 1,
          p:2,
          minHeight: "100px",
          width:"100%",
          borderRadius: "8px",
          flexDirection:{xs:'column',md:"row"}
        }}
      >
        <TextField
          label="Choose Leads"
          select
          size="small"
          sx={{ width:{xs:'100%',md:"14%"} }}
        >
          <MenuItem value="pNumber">Phone Number</MenuItem>
          <MenuItem value="name">Name</MenuItem>
        </TextField>

        <TextField placeholder="Search for Leads..." size="small"  sx={{ width:{xs:'100%',md:"24%"} }}/>
        <Button size="small" variant="contained" disableElevation color="error">
          Search
        </Button>
        <Button size="small" variant="contained" disableElevation>
          Show All
        </Button>
      </Box>

      <Box sx={{ mt: 2 }}>
        <CustomTable columns={columns} rows={rows} />
      </Box>
    </>
  );
};

export default ManageLeads;
