import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
} from '@mui/material';

const DataDrivenForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    allergies: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddAllergy = () => {
    const { allergies } = formData;
    const newAllergy = { id: new Date().getTime(), allergyName: '' };
    setFormData((prevFormData) => ({
      ...prevFormData,
      allergies: [...allergies, newAllergy],
    }));
  };

  const handleAllergyInputChange = (event, index) => {
    const { value } = event.target;
    setFormData((prevFormData) => {
      const updatedAllergies = [...prevFormData.allergies];
      updatedAllergies[index].allergyName = value;
      return { ...prevFormData, allergies: updatedAllergies };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const jsonData = JSON.stringify(formData);
    console.log(jsonData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} style={{ marginTop: '16px' }}>
        <Grid item xs={12}>
          <Typography variant="h6">Personal Information</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: '16px' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: '16px' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Weight"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: '16px' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Height"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: '16px' }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Allergies</Typography>
          {formData.allergies.map((allergy, index) => (
            <TextField
              key={allergy.id}
              label="Allergy"
              value={allergy.allergyName}
              onChange={(event) => handleAllergyInputChange(event, index)}
              fullWidth
              style={{ marginBottom: '16px' }}
            />
          ))}
          <Button
            variant="outlined"
            onClick={handleAddAllergy}
            style={{ marginLeft: '8px' }}
          >
            Add Allergy
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default DataDrivenForm;