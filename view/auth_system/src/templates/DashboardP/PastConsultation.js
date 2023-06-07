import React from 'react';
import { Typography, Paper } from '@mui/material';

const PastConsultation = () => {
  const consultationHistory = [
    {
      id: 1,
      date: '2023-06-01',
      title: 'Check-up Appointment',
      description: 'Routine check-up and general consultation',
    },
    {
      id: 2,
      date: '2023-05-25',
      title: 'Follow-up Appointment',
      description: 'Follow-up on previous treatment and medication',
    },
    // Add more consultation objects as needed
  ];

  return (
    <div>
      <Typography variant="h6">Past Consultations</Typography>
      {consultationHistory.map((consultation) => (
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
    </div>
  );
};

export default PastConsultation;
