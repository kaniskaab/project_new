import * as React from 'react';
import  Button from '@mui/material/Button'
import BookIcon from '@mui/icons-material/Book';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Title from './Title';
import AllergyForm from './AllergyForm';
import PastConsultation from './PastConsultation';
import UpcomingConsultation from './UpcomingConsulatation';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function DetailPage() {
  return (
    <>
    <Box
      sx={{ width: '100%' }}
      >
    <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        justifyContent="center"
    alignItems="center"
    minWidth="80%">
        <Item>
          <Title>
            Allergies
          </Title>
          <AllergyForm/>

        </Item>
        <Item>
          <PastConsultation/>
        </Item>
        <Item><UpcomingConsultation/></Item>
      </Stack>
      </Box>
      <Box
  m={1}
  display="flex"
  justifyContent="center"
  alignItems="center"
>
  <Button variant="contained" color="primary" sx={{ height: 40 }}>
    Book Consultation
  </Button>
</Box>
    </>
  
      
        
      
  );
}