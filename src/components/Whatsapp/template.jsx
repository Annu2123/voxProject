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
import axios from "axios";
const Template = () => {
  const [messages, setMessages] = useState("hello anubrath");
  const sendMessage = async () => {
    try {
      await axios.post('http://localhost:3001/send-message', { messages });
      console.log('Message sent successfully');
      // setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
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
      <h2>Send Message</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
   
    </>
    
  );
};

export default Template;


// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:4000');

// function Template() {
//   const [message, setMessage] = useState('');
//   const [status, setStatus] = useState('');
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     socket.on('messageStatus', (data) => {
//       setStatus(data.status);
//       if (data.status === 'RECEIVED') {
//         setMessages((prevMessages) => [...prevMessages, data.message]);
//       }
//     });

//     return () => {
//       socket.off('messageStatus');
//     };
//   }, []);

//   const sendMessage = () => {
//     socket.emit('sendMessage', message);
//     setMessage('');
//   };

//   return (
//     <div>
//       <h1>Messaging System</h1>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button onClick={sendMessage}>Send</button>
//       <div>Status: {status}</div>
//       <div>
//         <h2>Messages</h2>
//         <ul>
//           {messages.map((msg, index) => (
//             <li key={index}>{msg}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Template;