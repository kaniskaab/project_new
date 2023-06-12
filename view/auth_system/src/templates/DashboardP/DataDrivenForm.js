import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function FamilyMemberForm(props) {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');
  const [govtId, setGovtId] = useState('');
  const [relation, setRelation] = useState('');

  //CHANGE TOKEN
  const refreshToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoiYW5vdGhlcnRvbmV5MkBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NjU2OTI2NiwiZXhwIjoxNjg2NTcyODY2LCJhdWQiOiJsb2NhbGhvc3Q6ODAwMCIsImlzcyI6ImxvY2FsaG9zdDo4MDAwIn0.T2mJnjA9FcSXFDFKTHXX3lch3kEoY_A4rxDQm5uBcPw'
    const handleSubmit = async (event) => {
    event.preventDefault();

    const familyMember = {
      name,
      age,
      gender,
      govtId,
      relation,
    };

    //ADDING A FAMILY MEMBER

    try {
      //CHANGE FETCH LINK ACCORDINGLY
      const response = await fetch(`http://[::1]:3333/api/members/${props.value}/family-members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${refreshToken}`
        },
        body: JSON.stringify(familyMember),
      });

      if (response.ok) {
        console.log(response.json())
        alert('Family member added successfully!');
      } else {
        console.error('Failed to add family member.');
      }
    } catch (error) {
      console.error('An error occurred while adding a family member:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Age"
        value={age}
        onChange={(event) => setAge(parseInt(event.target.value))}
        variant="outlined"
        type="number"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Gender"
        value={gender}
        onChange={(event) => setGender(event.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Government ID"
        value={govtId}
        onChange={(event) => setGovtId(event.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Relation"
        value={relation}
        onChange={(event) => setRelation(event.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}

export default FamilyMemberForm;



 