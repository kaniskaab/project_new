import React, { useState } from 'react';
import { Typography, Grid, Paper, TextField, Button } from '@mui/material';
import Title from './Title'
const UpcomingConsultation = () => {
  const [consultations, setConsultations] = useState([]);
  const [newConsultation, setNewConsultation] = useState({
    id: '',
    date: '',
    title: '',
    description: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewConsultation((prevConsultation) => ({
      ...prevConsultation,
      [name]: value,
    }));
  };

  const handleAddConsultation = () => {
    setConsultations((prevConsultations) => [...prevConsultations, newConsultation]);
    setNewConsultation({
      id: '',
      date: '',
      title: '',
      description: '',
    });
  };

  return (
    <div>
      <Typography variant="h6"><Title alignItems="center"><div>Upcoming Consulatation</div></Title></Typography>
      {consultations.map((consultation) => (
        <Paper key={consultation.id} style={{ padding: '16px', marginBottom: '16px' }}>
          <Typography variant="subtitle2" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
            {consultation.date}
          </Typography>
          <Typography variant="h6" style={{ marginBottom: '8px' }}>
            {consultation.title}
          </Typography>
          <Typography variant="body2" style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
            {consultation.description}
          </Typography>
        </Paper>
      ))}
      <Grid container spacing={2}>
        <Grid item xs={8} sm={4}>
          <TextField
            label="Date"
            name="date"
            value={newConsultation.date}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={8} sm={4}>
          <TextField
            label="Title"
            name="title"
            value={newConsultation.title}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={8} sm={4}>
          <TextField
            label="Description"
            name="description"
            value={newConsultation.description}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={8} sm={4}
        justifyContent="center" alignItems="center"
        
        >
          <Button variant="outlined" onClick={handleAddConsultation}>
            Add Consultation
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default UpcomingConsultation;
