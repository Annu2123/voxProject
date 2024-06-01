import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";

const Template = () => {
  return (
    <>
    <Typography sx={{mt:1,p:1}}>You are chatting with xxxxxxxx </Typography>
      <Box
        sx={{
          mt: 2,
          p: 1,
          mb: 1,
          display: "flex",
          gap: 2,
          width: "100%",
          backgroundColor: "#FFFFFF",
          borderRadius: "8px",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <FormControl sx={{ width: "100%" }} size="small">
            <InputLabel id="choose-template">Choose template</InputLabel>
            <Select id="choose-template" size="small" variant="standard">
              <MenuItem>Template list</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>Preview</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Button
          variant="contained"
          color="success"
          disableElevation
          size="small"
        >
          Send
        </Button>
      </Box>
    </>
  );
};

export default Template;
