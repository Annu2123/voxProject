import { Box ,FormControl,FormLabel,RadioGroup,FormControlLabel,Radio, Typography, Divider} from "@mui/material";
import React, { useState } from "react";
import Template from "./template";

const Whatsapp = () => {
    const [chatType,setChatType] = useState('')

    const handleChange =(e)=>{
        setChatType(e.target.value);
    }

  return (
    <>
      <Box sx={{display:"flex", justifyContent:""}}>
      <FormControl sx={{ p: 0 }}>
        <FormLabel id="demo-controlled-radio-buttons-group">
          Choose your requirment
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={chatType}
          onChange={handleChange}
        >
          <FormControlLabel
            value="template"
            control={<Radio />}
            label="Template"
          />
          <FormControlLabel
            value="chat"
            control={<Radio />}
            label="Chat"
          />
        </RadioGroup>
      </FormControl>
      
      </Box>
      <Divider sx={{width:'100%',mt:1}} orientation="horizontal"/>
      {
        chatType === 'template' && (
            <Template/>
        )
      }
       {
        chatType === 'chat' && (
            <Typography>chat</Typography>
        )
      }
    </>
  );
};

export default Whatsapp;
