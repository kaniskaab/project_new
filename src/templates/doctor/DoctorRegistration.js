import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DoctorRegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: 0,
    licenseNumber: '',
    specialization: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const refreshToken= localStorage.getItem("token")
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData)
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/doctors`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${refreshToken}`,
        },
        body:JSON.stringify(
          formData
        )
      }
    ); 
    const data = await response.json();
    console.log(data)
    if(response.ok)
    {
      toast.success("Doctor Added Successfully!")
      const nextPage= ()=>
      {
        navigate("/design1");
      }
      setTimeout(nextPage,3000)
    }
    else
    {
      toast.warn("Doctor not added")
    }
   };
  

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          backgroundColor: '#F5F5F5',
          borderRadius: '8px',
          padding: '32px',
          marginTop: '64px',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Doctor Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="userId"
            label="userId"
            type="number"
            value={formData.userId}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            name="licenseNumber"
            label="licenseNumber"
            type="text"
            value={formData.licenseNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            name="specialization"
            label="Specialization"
            type='text'
            value={formData.specialization}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
      </Box>
        <ToastContainer/>
    </Container>
  );
};

export default DoctorRegistrationForm;
