import React, { useState, useEffect, useContext } from 'react';
import { Grid, Typography, TextField, Button, Paper } from '@mui/material';
import { CalendarToday, Search, PersonAdd } from '@mui/icons-material';
import Autocomplete from "@mui/material/Autocomplete";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../context.js/UserContext';
import Header from './Header';
import SidebarN from './Sidebar';
import {motion} from 'framer-motion'

const BookC = () => {
  const location = useLocation();
  const refreshToken = localStorage.getItem('token');
  const details = location.state.details;
  console.log(location.state.details);
  const userId = Number(localStorage.getItem('id'));
  console.log(refreshToken);

  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response2 = await fetch(`${process.env.REACT_APP_BASE_URL}/api/doctors`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshToken}`,
          },
        });
        const data = await response2.json();
        console.log(data);
        setDoctors(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const userName = localStorage.getItem('name');
  const [date, setDate] = useState('');
  const [doctorId, setDoctorId] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      doctorId: doctorId,
      memberId: userId,
      familyMemberId: details.id,
      dateOfAppointment: date,
      fees: 130,
      force: 'true',
    };
    console.log(formData);
    if (
      doctorId === [] ||
      !formData.memberId ||
      !formData.familyMemberId ||
      formData.dateOfAppointment === ''
    ) {
      toast.warn('Fill all the details before proceeding');
    }
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/consultations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      toast.success('Consultation Booked!');
    } else {
      toast.warn(data.message);
    }
  };

  const flatProps = {
    options: doctors.map((option) => option.user.name),
  };
  const [value, setValue] = React.useState(null);

  const Handle = (e, newValue) => {
    setValue(newValue);
    doctors.map((doctor) => (doctor.user.name === newValue ? setDoctorId(doctor.id) : ''));
  };

  return (
      <>
        <Header />
        <div className="flex h-screen">
          <div className="w-1/4 bg-white">
            <SidebarN />
          </div>
          <div className="flex-1 p-8 overflow-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <div className="bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold mb-8">Book Consultation for {details.name}</h1>
                <div className="bg-white shadow-md rounded-md p-4 mb-8">
                  <h2 className="text-xl font-semibold mb-2">Patient Details:</h2>
                  <ul>
                    <li>Relation: {details.relation}</li>
                    <li>Government Id: {details.govtId}</li>
                    <li>Age: {details.age}</li>
                    <li>Gender: {details.gender}</li>
                  </ul>
                </div>
                <div className="bg-white shadow-md rounded-md p-8 mb-8">
                  <h2 className="text-xl font-semibold mb-2">Select Date and Time</h2>
                  <TextField
                    fullWidth
                    id="date"
                    type="datetime-local"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="bg-white shadow-md rounded-md p-8 mb-8">
                  <h2 className="text-xl font-semibold mb-2">Search Doctor</h2>
                  <Autocomplete
                    {...flatProps}
                    id="controlled-demo"
                    value={value}
                    onChange={(event, newValue) => {
                      Handle(event, newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Doctor"
                        variant="standard"
                      />
                    )}
                  />
                </div>
                <div className="bg-white shadow-md rounded-md p-8 mb-8">
                  <h2 className="text-xl font-semibold mb-2">Consultation Booked by {userName}</h2>
                  <Typography variant="subtitle1" className="mb-2">for</Typography>
                  <Typography variant="h6" className="mb-2">{details.name}</Typography>
                  <Typography variant="subtitle1" className="mb-2">on</Typography>
                  <Typography variant="h6">
                    {date} with {value}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className="mt-8"
                    onClick={handleSubmit}
                  >
                    <PersonAdd className="mr-2" />
                    Submit Consultation
                  </Button>
                </div>
              </div>
            </motion.div>
            <ToastContainer />
          </div>
        </div>
      </>
  )};
  
  export default BookC;