import React, { useState } from "react";
import { Grid, Button, Typography, Box, Container, Paper } from "@mui/material";
import Sidebar from './Sidebar'
import DataDrivenForm from './DataDrivenForm';
import Header from "./Header";

const UpdateDetails = () => {
  const id = localStorage.getItem('id');
  useState(() => {
    document.title = 'Member Details';
  }, []);

  return (
    <div>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={3} style={{height:"100vh"}}>

                <Sidebar/>
     
          </Grid>
          <Grid item xs={9}>
            <Paper elevation={3}>
              <Box p={4}>
                <DataDrivenForm />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default UpdateDetails;
