import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Button, TextField } from '@material-ui/core';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

const SlotBooking = () => {
  const [selectedSlots, setSelectedSlots] = useState({}); // Object to store selected slots: { day: [slots] }
  const [customDay, setCustomDay] = useState('');
  const [customTime, setCustomTime] = useState('');

  const handleSlotSelection = (day, slot) => {
    const updatedSelectedSlots = { ...selectedSlots };

    if (!updatedSelectedSlots[day]) {
      updatedSelectedSlots[day] = [slot];
    } else {
      if (!updatedSelectedSlots[day].includes(slot)) {
        updatedSelectedSlots[day] = [...updatedSelectedSlots[day], slot];
      } else {
        updatedSelectedSlots[day] = updatedSelectedSlots[day].filter(s => s !== slot);
      }
    }

    setSelectedSlots(updatedSelectedSlots);
  };

  const handleCustomSlotSubmit = () => {
    if (customDay && customTime) {
      const updatedSelectedSlots = { ...selectedSlots };

      if (!updatedSelectedSlots[customDay]) {
        updatedSelectedSlots[customDay] = [customTime];
      } else {
        if (!updatedSelectedSlots[customDay].includes(customTime)) {
          updatedSelectedSlots[customDay] = [...updatedSelectedSlots[customDay], customTime];
        }
      }

      setSelectedSlots(updatedSelectedSlots);
      setCustomDay('');
      setCustomTime('');
    }
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {daysOfWeek.map(day => (
          <Grid item xs={12} key={day}>
            <Paper style={{ padding: '20px' }}>
              <Typography variant="h6">{day}</Typography>
              <Grid container spacing={2}>
                {timeSlots.map(slot => (
                  <Grid item key={slot}>
                    <Button
                      variant={selectedSlots[day] && selectedSlots[day].includes(slot) ? 'contained' : 'outlined'}
                      color="primary"
                      onClick={() => handleSlotSelection(day, slot)}
                    >
                      {slot}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Selected Slots:
        {Object.keys(selectedSlots).map(day => (
          <div key={day}>
            <strong>{day}:</strong> {selectedSlots[day].join(', ')}
          </div>
        ))}
      </Typography>
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Day"
            variant="outlined"
            value={customDay}
            onChange={e => setCustomDay(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Time"
            variant="outlined"
            value={customTime}
            onChange={e => setCustomTime(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button variant="contained" color="primary" onClick={handleCustomSlotSubmit}>Add Slot</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SlotBooking;
