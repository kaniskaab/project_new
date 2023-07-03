import React, { useState, useEffect, useContext } from 'react';
import SidebarN from './Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../context.js/UserContext';
import { Grid, Typography, TextField, Button, Paper, List, ListItem } from '@mui/material';
import Header from './Header';
import { CalendarToday, Search, PersonAdd } from '@mui/icons-material';
import Autocomplete from "@mui/material/Autocomplete";


const BookC = () => {
  const location = useLocation();
  const refreshToken = localStorage.getItem('token');
  const details = location.state.details;
  console.log(location.state.details);
  const userId = localStorage.getItem("userId")

  const [doctors, setDoctors]=useState([]);
  useEffect( ()=>{
  const fetchData = async()=>
  {
    try{
      const response2 = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/doctors`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      const data = await response2.json();
      console.log(data);
      setDoctors(data);

    }
    catch(error){
      console.log(error)
    }
  }
  fetchData();
 },[])


  const userName = localStorage.getItem('name');
  const [date, setDate] = useState('');
  const [doctorId, setDoctorId] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    const filteredItems = doctors.filter((item) =>
      item.user.name.toLowerCase().includes(value.toLowerCase())
    );
    console.log(filteredItems);
    setSuggestions(filteredItems);
  };

  const handleSuggestionClick = (selectedResult) => {
    console.log(selectedResult.user.name);
    setSearchTerm(selectedResult.user.name);
    setDoctorId(selectedResult.id);
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      doctorId: doctorId,
      memberId: userId,
      familyMemberId: details.id,
      dateOfAppointment: date,
      fees: 0,
      force: 'false',
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
        Accept: 'application/json',
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

  const Handle = (e, newValue)=>
  {
    setValue(newValue)
    doctors.map((doctor)=>doctor.user.name===newValue?setDoctorId(doctor.id):"")
  }


  return (
    <>
    <Header/>
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '25%', backgroundColor: '#f5f5f5' }}>
        <SidebarN />
      </div>
      <div style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>

        <Grid container spacing={3}>
          <Grid item xs={12}>
              <Typography variant="h5" component="h1" gutterBottom>
                Book Consultation for {details.name}
              </Typography>
              <Paper elevation={3} style={{ padding: '1rem', marginTop: '2rem' }}>
                <Typography variant="h6" gutterBottom>
                  Patient Details:
                </Typography>
                <ul>
                  <li>Relation: {details.relation}</li>
                  <li>Government Id: {details.govtId}</li>
                  <li>Age: {details.age}</li>
                  <li>Gender: {details.gender}</li>
                </ul>
              </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
              <Typography variant="h6" gutterBottom>
                Select Date and Time
              </Typography>
              <TextField
                fullWidth
                id="date"
                type="datetime-local"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
              <Typography variant="h6" gutterBottom>
                Search Doctor
              </Typography>
              <Autocomplete
                    {...flatProps}
                    id="controlled-demo"
                    value={value}
                    onChange={(event, newValue) => {Handle(event,newValue)
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Doctor"
                        variant="standard"
                      />
                    )}
                  />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
              <Typography variant="h6" gutterBottom>
                Consultation Booked by {userName}
              </Typography>
              <Typography variant="subtitle1">for</Typography>
              <Typography variant="h6">{details.name}</Typography>
              <Typography variant="subtitle1">on</Typography>
              <Typography variant="h6">
                {date} with {value}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                style={{ marginTop: '2rem' }}
                onClick={handleSubmit}
              >
                <PersonAdd style={{ marginRight: '0.5rem' }} />
                Submit Consultation
              </Button>
            </Paper>
          </Grid>
        </Grid>
        </Paper>

        <ToastContainer />
      </div>
    </div>
    </>
  );
};

export default BookC;
