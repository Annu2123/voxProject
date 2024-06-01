import { Box, Button } from "@mui/material";
import React from "react";
import Pdetails from "./pDetails";
import Activity from "./activity";
import { useNavigate } from "react-router";

const EditManageLeads = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box>
      <Box sx={{ display: "flex",gap:2 }}>
        <Button
          disableElevation
          size="small"
          variant="contained"
          onClick={handleBack}
        >
          Back
        </Button>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: 3,
          flexDirection: { xs: "column", md: "row" },
          mt:2
        }}
      >
        <Box sx={{ width: { md: "50%", xs: "100%" } }}>
          <Pdetails />
        </Box>
        <Box sx={{ width: { md: "50%", xs: "100%" } }}>
          <Activity />
        </Box>
      </Box>
    </Box>
  );
};

export default EditManageLeads;
