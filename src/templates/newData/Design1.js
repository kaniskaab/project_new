import React, { useState, useEffect } from 'react';
import { Button, Typography, Container, Paper, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const Design1 = () => {
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem('token');
  const id = Number(localStorage.getItem('id'));
  const [data, setData] = useState({});
  const [family, setFamily] = useState([]);

  useEffect(() => {
    document.title = 'Member Dashboard';
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/members`, {
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
        console.log(userData);
        console.log(id);

        const filteredData = userData.filter((data) => data.user.id === id);
        console.log(filteredData[0]);
        setData(filteredData[0]);
      } catch (error) {
        console.error('An error occurred while fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const userName = localStorage.getItem('name');
  const userId = data.id;

  const getMembers = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/members/${userId}/family-members`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setFamily(data);
  };

  const getC = (details) => {
    navigate('/getConsultation', { state: { details } });
  };

  const selfConsult = () => {
    navigate('/getConsultationSelf', { state: { data } });
  };

  const getAllergy = (member) => {
    const id = member.id;
    localStorage.setItem('familyMemberId', id);
    navigate('/memberAllergies');
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Grid container>
        <Grid item xs={3}>
            <div className='-ml-20'>
                    <Sidebar/>
            </div>
      
        </Grid>
          <Grid item xs={9}>
            <Paper
              elevation={3}
              style={{
                padding: '16px',
                backgroundColor: '#fff',
              }}
            >
              <Typography variant="h4" align="center">
                Welcome {userName}
              </Typography>
              <Typography variant="h5" align="center">
                General Information
              </Typography>
              <Typography variant="body1" align="center">
                Gender: {data.gender}
              </Typography>
              <Typography variant="body1" align="center">
                Govt Id: {data.govtId}
              </Typography>
              <Typography variant="body1" align="center">
                Age: {data.age}
              </Typography>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={selfConsult}
                  style={{ marginRight: '8px' }}
                >
                  Consultation
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    navigate('/updateDetails');
                  }}
                  style={{ marginRight: '8px' }}
                >
                  Edit
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    navigate('/viewAllergies');
                  }}
                >
                  Allergies
                </Button>
              </div>
            </Paper>
            <Paper
              elevation={0}
              style={{
                marginTop: '16px',
                backgroundColor: '#fff',
                padding: '16px',
              }}
            >
              <Button fullWidth variant="contained" color="primary" onClick={getMembers}>
                Dependents
              </Button>
              <ul>
                {family.map((member) => (
                  <li key={member.id} style={{ marginBottom: '16px' }}>
                    <Paper
                      elevation={3}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '16px',
                        backgroundColor: '#fff',
                      }}
                    >
                      <div>
                        <div className="flex items-center">
                          <AssignmentIndIcon />
                          <Typography variant="h6">{member.name}</Typography>
                        </div>
                        <Typography variant="body1">{member.relation}</Typography>
                      </div>
                      <div>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => getC(member)}
                          style={{ marginRight: '8px' }}
                        >
                          Consult
                        </Button>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => getAllergy(member)}
                        >
                          Allergy
                        </Button>
                      </div>
                    </Paper>
                  </li>
                ))}
              </ul>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Design1;
