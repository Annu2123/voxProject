import React, { useState, useEffect } from 'react';

import {
    Box,
    Button,
    Modal,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    MenuItem,
    TextField,
    Tooltip,
    Typography,
  } from "@mui/material"
const PopupModal = () => {
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [otherField1, setOtherField1] = useState('');
  const [otherField2, setOtherField2] = useState('');

  

  const handleSave = () => {
    // Implement your save logic here
  };

  const handleViewDetails = () => {
    // Implement your view details logic here
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Incoming
        </Typography>
        <TextField
          label="Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Other Field 1"
          value={otherField1}
          onChange={(e) => setOtherField1(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Other Field 2"
          value={otherField2}
          onChange={(e) => setOtherField2(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSave} style={{ marginRight: '10px' }}>
          Save
        </Button>
        <Button variant="contained" color="primary" onClick={handleViewDetails}>
          View Details
        </Button>
      </div>
    </Modal>
  );
};

export default PopupModal;
