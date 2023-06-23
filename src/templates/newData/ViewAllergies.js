import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Button, TextField } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import MasksIcon from '@mui/icons-material/Masks';


const ViewAllergies = () => {
  const memberId = localStorage.getItem('userId');
  const refreshToken = localStorage.getItem('token');
  const [allergies, setAllergies] = useState([]);
  const [allergy, setAllergy] = useState('');
  const [reportedBy, setReportedBy] = useState('');
  const [show, setShow] = useState([]);
  useEffect(() => {
    document.title = 'Member Allergies';
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/members/${memberId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data.');
        }

        const userData = await response.json();
        const data = userData.allergies;

        data === null ? setAllergies([]) : setAllergies(data);
      } catch (error) {
        console.error('An error occurred while fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    const allergyDetail = { allergy: allergy, reportedBy: reportedBy };
    const arrayAllergy = [allergyDetail];
    const lnk = `${process.env.REACT_APP_BASE_URL}/api/members/${memberId}/allergies`;

    allergies === null ? setAllergies(arrayAllergy) : allergies.push(allergyDetail);

    const response = await fetch(lnk, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
      body: JSON.stringify([allergies]),
    });
    const data = await response.json();

    if (response.ok) {
      toast.success('Allergy Added');
      setAllergy('');
      setReportedBy('');
    } else {
      toast.warn(data.message);
    }
  };

  const handleDelete = async () => {
    const lnk = `${process.env.REACT_APP_BASE_URL}/api/members/${memberId}/allergies`;
    const response = await fetch(lnk, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    const data = await response.json();

    if (response.ok) {
      toast.success('Allergies deleted!');
      setAllergies([]);
    } else {
      toast.warn(data.message);
    }
    window.location.reload();
  };

  return (
    <div>
      <Header />
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={9}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h4" align="center" underline="true">
              <h1 className="font-ubu text-bold">All Allergies</h1>
            </Typography>
            <ul>
              {allergies !== null ? (
                allergies.map((allergy) => (
                  <li key={allergy.id}>
                    <Paper style={{padding:"10px", marginBottom:"20px"}} >
                         <Typography variant="h6">
                          <MasksIcon style={{margin:"2px"}}/>
                        {allergy.allergy} reported by {allergy.reportedBy}
                    </Typography>
                  
                    </Paper>
                 
                  </li>
                ))
              ) : (
                <Typography variant="h6">No allergies</Typography>
              )}
            </ul>
            <Paper elevation={3}>
            <Grid container spacing={2} alignItems="center" style={{padding:"10px"}}>
              <Grid item xs={6}>
               
                <input
                  type="text"
                  placeholder="Allergy"
                  value={allergy}
                  onChange={(e) => setAllergy(e.target.value)}
                  className="border border-blue-500 p-3 rounded-xl w-full"
                />
              </Grid>
              <Grid item xs={6}>
                <input
                  type="text"
                  placeholder="Reported By"
                  value={reportedBy}
                  onChange={(e) => setReportedBy(e.target.value)}
                  className="border border-blue-500 p-3 rounded-xl w-full"
                />
              </Grid>
            </Grid>

            </Paper>
          
            <Grid container spacing={2} justifyContent="center" style={{margin:"2px"}}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAdd}
                >
                  Add
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <ToastContainer />
    </div>
  );
};

export default ViewAllergies;
