

import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { Grid} from '@mui/material';
import DetailPage from './DetailPage';
import Title from './Title';
import { useLocation } from 'react-router-dom';




export default function PersistentDrawerRight() {

  const location = useLocation();
  console.log(location.state.value)
  const member = location.state.familyMembers;
  console.log(location.state.familyMembers)
  const final = member[location.state.value-1];
  console.log(final);
  console.log(final.id)

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
    <Box 
    >
      <Typography variant="h4" align='center'>Member Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} >
       
        <DetailPage mainId={location.state.mainId} fmId={final.id}/>
        </Grid>
      </Grid>
      <Box sx={{backgroundColor:"#C9D1D5" , borderRadius:"15px" , padding:"10px"}}>
        <Title>
            <Typography variant="h4" align="center" fontWeight="bold" sx={{ marginTop: '20px' }}>
                Prescription
            </Typography>
          </Title>
      <Box style={{ padding: '16px', marginTop: '16px' }}>      </Box>
      </Box>
      
    </Box>
    </Box>
  );
}