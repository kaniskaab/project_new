import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
} from '@mui/material';


const AllergiesComponent = (props) => {




  const [allergies, setAllergies] = useState([
    {allergy:"123",reportedBy:"Doctor"}]);
  const[newReportedBy,setNewReportedBy]=useState('')
  const [newAllergy, setNewAllergy] = useState('');

  //CHANGE TOKEN 
  const refreshToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoiYW5vdGhlcnRvbmV5MkBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NjU2OTI2NiwiZXhwIjoxNjg2NTcyODY2LCJhdWQiOiJsb2NhbGhvc3Q6ODAwMCIsImlzcyI6ImxvY2FsaG9zdDo4MDAwIn0.T2mJnjA9FcSXFDFKTHXX3lch3kEoY_A4rxDQm5uBcPw'
         useEffect(() => {
    // FETCHING ALLERGIES , IF FAMILY MEMBER ID IS NOT PRESENT, IT WILL BE DONE FOR THE REGISTERED MEMBER
    const fetchAllergies = async () => {
      try {
        const response = await fetch((props.fmId)?
          `http://[::1]:3333/api/members/${props.value}/family-members`:`http://[::1]:3333/api/members/${props.new}`,{
            method:'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${refreshToken}`,
          }},
        );

        if (response.ok && props.fmId) {
          const data = await response.json();
          console.log(data);
          const filter = data.filter((d)=>(
            d.id===props.fmId
          ))
          console.log(filter)
          (filter[0].allergies===null)?setAllergies([]):setAllergies(filter[0].allergies)
        }
        else if(response.ok){
          const data = await response.json();
          (data.allergies)?setAllergies(data.allergies):setAllergies([]);
          console.log(data)
        }
        
        else {
          console.error('Failed to fetch allergies.');
        }
      } catch (error) {
        console.error('An error occurred while fetching allergies:', error);
      }
    };
   

    fetchAllergies();
  },[]);

  const handleAddAllergy = async () => {
    // Make POST request to add allergy
    try {
      allergies.push({allergy:newAllergy,reportedBy:newReportedBy})
      console.log(allergies)
      //CHANGE LINK ACCORDINGLY
      const response = await fetch((props.fmId)?
        `http://[::1]:3333/api/members/${props.value}/family-members/${props.fmId}/allergies`: `http://[::1]:3333/api/members/${props.new}/allergies`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${refreshToken}`,
          },
          body: JSON.stringify(
            allergies
          )
        
         } );

      if (response.ok) {
       alert('allergyAdded')
      } else {
        alert('Not added')
        console.error('Failed to add allergy.');
      }
    } catch (error) {
      console.error('An error occurred while adding allergy:', error);
    }
  };

  const handleDeleteAllergy = async allergyId => {
    // Make DELETE request to remove allergy
    try {
      //CHANGE LINK ACCORINGLY
      const response = await fetch((props.fmId)?
        `http://[::1]:3333/api/members/${props.value}/family-members/${props.fmId}/allergies`:`http://[::1]:3333/api/members/${props.new}/allergies`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${refreshToken}`,
          },
        }
      );
      const data = await response

      if (data.ok) {
        console.log(response.json())
        alert('deleted');
      } else {
        console.error('Failed to delete allergy.');
      }
    } catch (error) {
      console.error('An error occurred while deleting allergy:', error);
    }
  };
  return (
    <div>
      <TextField
        label="Add Allergy"
        value={newAllergy}
        onChange={e => setNewAllergy(e.target.value)}
      />
      <TextField
          type="text"
          label="Reported By"
          value={newReportedBy}
          onChange={e=>setNewReportedBy(e.target.value)}
        />

      <Button variant="contained" onClick={handleAddAllergy}>
        Add
      </Button>
      <Button value="Delete" onClick={handleDeleteAllergy}>
        Delete
        </Button>
     <Typography>
      allergies
    
    
     </Typography>
    </div>
  );
};

export default AllergiesComponent;
