import React, { useState } from 'react';
import { Button, Input, List, ListItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const InputContainer = styled('div')({
  marginBottom: '16px',
});

const AllergyForm = () => {
  const [allergy, setAllergy] = useState('');
  const [allergiesList, setAllergiesList] = useState([]);

  const handleInputChange = (event) => {
    setAllergy(event.target.value);
  };

  const handleAddAllergy = () => {
    if (allergy.trim() === '') return;

    const newAllergy = {
      id: new Date().getTime(),
      name: allergy,
    };

    setAllergiesList([newAllergy, ...allergiesList]);
    setAllergy('');
  };

  const handleSaveToLocalStorage = () => {
    const updatedDetails = {
      ...localStorage.getItem('Details'),
      allergies: allergiesList,
    };
    localStorage.setItem('Details', JSON.stringify(updatedDetails));
  };

  return (
    <div>
      <InputContainer>
        <Input
          type="text"
          value={allergy}
          onChange={handleInputChange}
          placeholder="Enter allergy"
          fullWidth
        />
      </InputContainer>
      <Button variant="contained" sx={{padding:'10px', margin:'10px'}} onClick={handleAddAllergy}>
        Add
      </Button>
      <Button variant="contained" sx={{padding:'10px', margin:'10px'}} onClick={handleSaveToLocalStorage}>
        Save Changes
      </Button>
      <List>
        {allergiesList.map((item) => (
          <ListItem key={item.id}>
            <Typography>{item.name}</Typography>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default AllergyForm;
