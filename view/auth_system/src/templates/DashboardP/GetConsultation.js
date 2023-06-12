import React, { useEffect, useState } from 'react';
import { Button, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
const GetConsultation = (props) => {
  const [doctors, setDoctors] = useState([]);
const location=useLocation();
  useEffect(() => {
    fetchDoctors();
  }, []);

  //CHANGE TOKEN ACCORDINGLY


  const refreshToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoiYW5vdGhlcnRvbmV5MkBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NjU2OTI2NiwiZXhwIjoxNjg2NTcyODY2LCJhdWQiOiJsb2NhbGhvc3Q6ODAwMCIsImlzcyI6ImxvY2FsaG9zdDo4MDAwIn0.T2mJnjA9FcSXFDFKTHXX3lch3kEoY_A4rxDQm5uBcPw'
     const fetchDoctors = async () => {
  


    //GET ALL THE DOCTORS
    //CHANGE FETCH LINK ACCORDINGLY
   const response= await fetch('http://[::1]:3333/api/doctors', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`,
        }
      })
       const data = await response.json();
       console.log(data);
       setDoctors(data)
  };

  //BOOKING CONSULTATION

  const bookConsultation = (doctorId) => {
    const appointmentData = {
      doctorId: doctorId,
      memberId: location.state.mainId, 
      familyMemberId: location.state.fmId, 
      dateOfAppointment: new Date().toISOString(),
      force: true,
      fees: 0
    };
//CHANGE FETCH LINK ACCORDINGLY
    fetch('http://[::1]:3333/api/consultations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${refreshToken}`,
      },
      body: JSON.stringify(appointmentData)
    })
      .then(response => {
        if (response.ok) {
          alert('Consultation booked with ID: ' + doctorId);
        } else {
          alert('Failed to book consultation.');
        }
      })
      .catch(error => {
        console.error('Failed to book consultation:', error);
        alert('Failed to book consultation.');
      });
  };

  return (
    <Container>
      <h1>Get Consultation</h1>
      <div>
        {doctors.map((doctor) => (
          <div key={doctor.id}>
            <p><h3>{doctor.user.name}</h3></p>
            <Button
              variant="contained"
              onClick={() => bookConsultation(doctor.id)}
            >
              Book Consultation
            </Button>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default GetConsultation;
