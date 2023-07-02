import React, { useEffect } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import {Grid, Paper, Box, Container} from '@mui/material'
import ComponentMapper from './AddMemberForm'
const AddMembers = () => {
  useEffect(()=>
  {
    document.title='Add members';
  },[])
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
                <ComponentMapper />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default AddMembers
