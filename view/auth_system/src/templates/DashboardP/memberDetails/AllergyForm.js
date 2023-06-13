import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
} from '@mui/material';


const AllergiesComponent = (props) => {




  const [allergies, setAllergies] = useState([]);
  const[newReportedBy,setNewReportedBy]=useState('')
  const [newAllergy, setNewAllergy] = useState('');
  console.log(props.fmId)

  //CHANGE TOKEN
  const refreshToken = localStorage.getItem('token')
         useEffect(() => {
    // FETCHING ALLERGIES , IF FAMILY MEMBER ID IS NOT PRESENT, IT WILL BE DONE FOR THE REGISTERED MEMBER
    const fetchAllergies = async () => {
      try {
        const response = await fetch((props.fmId)?
          `${process.env.REACT_APP_BASE_URL}/api/members/${props.value}/family-members`:`${process.env.REACT_APP_BASE_URL}/api/members/${props.new}`,{
            method:'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${refreshToken}`,
          }},
        );
        const data = await response.json();


        if (data && props.fmId) {
          const filter = data.filter((d)=>(
            d.id===props.fmId
          ))
          console.log(filter)

          (filter[0].allergies===null)?setAllergies(null):setAllergies(filter[0].allergies)
        }
        else if(data){
          const data = await response.json();
          (data.allergies)?setAllergies(data.allergies):setAllergies([]);
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
      console.log(allergies[0])
      console.log(refreshToken)
      const response = await fetch((props.fmId)?
        `${process.env.REACT_APP_BASE_URL}/api/members/${props.value}/family-members/${props.fmId}/allergies`: `${process.env.REACT_APP_BASE_URL}/api/members/${props.new}/allergies`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${refreshToken}`,
          },
          body: JSON.stringify(
            [allergies[0]]
          )

         } );
         const data = await response.json()
         console.log(data);


    } catch (error) {
      console.error('An error occurred while adding allergy:', error);
    }
  };

  const handleDeleteAllergy = async allergyId => {
    // Make DELETE request to remove allergy
    try {
      //CHANGE LINK ACCORINGLY
      const response = await fetch((props.fmId)?
        `${process.env.REACT_APP_BASE_URL}/api/members/${props.value}/family-members/${props.fmId}/allergies`:`${process.env.REACT_APP_BASE_URL}/api/members/${props.new}/allergies`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${refreshToken}`,
          },
        }
      );
      const data = await response.json()
      console.log(data);
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
      <ul>
  {
        allergies.map((allergy)=>(
            <li>{allergy.allergy} reported by {allergy.reportedBy}</li>
        ))
      }


      </ul>
    

     </Typography>
    </div>
  );
};

export default AllergiesComponent;
