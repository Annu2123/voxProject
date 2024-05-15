import { Box, TextField, Typography } from "@mui/material";
import React from "react";

const CustomFromToDate = ({ day, obj, setFinalObj, finalObj }) => {
  const handleStartTimeChange = (e) => {
    const value = e.target.value;
    setFinalObj({ ...finalObj, [day]: { ...finalObj[day], "start_time": value } });
  };

  const handleEndTimeChange = (e) => {
    const value = e.target.value;
    setFinalObj({ ...finalObj, [day]: { ...finalObj[day], "end_time": value } });
  };
// console.log(day,obj,finalObj)

  return (
    <Box sx={{ display: "flex", flexDirection: "column" ,p:2}}>
      <Typography>{day}</Typography>
      <Box sx={{ display: "flex", flexDirection: "row" ,gap:2,}}>
        <TextField
          label="fromTime"
          type="time"
          fullWidth
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300,
          }}
        //   value={obj[day]["start_time"]}
          onChange={handleStartTimeChange}
        />
        <TextField
          label="fromTime"
          type="time"
          size="small"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300,
          }}
        //   value={obj[day]["end_time"]}
          onChange={handleEndTimeChange}
        />
      </Box>
    </Box>
  );
};

export default CustomFromToDate;
