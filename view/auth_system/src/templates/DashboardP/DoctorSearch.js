import React, { useState } from 'react';
import Title from './Title';
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const doctorsList = [
  { id: 1, name: 'Dr. John Doe', field: 'Cardiology', email: 'johndoe@example.com', availability: true },
  { id: 2, name: 'Dr. Jane Smith', field: 'Dermatology', email: 'janesmith@example.com', availability: false },
  { id: 3, name: 'Dr. Michael Johnson', field: 'Orthopedics', email: 'michaeljohnson@example.com', availability: true },
  { id: 4, name: 'Dr. Sarah Williams', field: 'Pediatrics', email: 'sarahwilliams@example.com', availability: true },
  { id: 5, name: 'Dr. Robert Brown', field: 'Cardiology', email: 'robertbrown@example.com', availability: false },
  { id: 6, name: 'Dr. Emily Davis', field: 'Dermatology', email: 'emilydavis@example.com', availability: true },
  { id: 7, name: 'Dr. Matthew Wilson', field: 'Orthopedics', email: 'matthewwilson@example.com', availability: true },
  { id: 8, name: 'Dr. Olivia Lee', field: 'Pediatrics', email: 'olivialee@example.com', availability: false },
  { id: 9, name: 'Dr. Ethan Taylor', field: 'Cardiology', email: 'ethantaylor@example.com', availability: true },
  { id: 10, name: 'Dr. Ava Anderson', field: 'Dermatology', email: 'avaanderson@example.com', availability: true },
  { id: 11, name: 'Dr. William Clark', field: 'Orthopedics', email: 'williamclark@example.com', availability: false },
  { id: 12, name: 'Dr. Sophia Martinez', field: 'Pediatrics', email: 'sophiamartinez@example.com', availability: true },
  { id: 13, name: 'Dr. James Thomas', field: 'Cardiology', email: 'jamesthomas@example.com', availability: true },
  { id: 14, name: 'Dr. Mia Rodriguez', field: 'Dermatology', email: 'miarodriguez@example.com', availability: false },
  { id: 15, name: 'Dr. Benjamin Lopez', field: 'Orthopedics', email: 'benjaminlopez@example.com', availability: true },
  { id: 16, name: 'Dr. Charlotte Hall', field: 'Pediatrics', email: 'charlottehall@example.com', availability: true },
  { id: 17, name: 'Dr. Daniel Young', field: 'Cardiology', email: 'danielyoung@example.com', availability: false },
  { id: 18, name: 'Dr. Harper Lewis', field: 'Dermatology', email: 'harperlewis@example.com', availability: true },
  { id: 19, name: 'Dr. Samuel Turner', field: 'Orthopedics', email: 'samuelturner@example.com', availability: true },
  { id: 20, name: 'Dr. Amelia Adams', field: 'Pediatrics', email: 'ameliaadams@example.com', availability: false },
];


const DoctorList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterField, setFilterField] = useState('');
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [invitePhone, setInvitePhone] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  //only unique fields will be stored
  const doctor_list = doctorsList.map((doctor)=>doctor.field)
  const doctorsListUnique = Array.from(new Set(doctor_list));


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFieldFilterChange = (event) => {
    setFilterField(event.target.value);
  };

  const handleInviteDialogOpen = () => {
    setInviteDialogOpen(true);
  };

  const handleInviteDialogClose = () => {
    setInviteDialogOpen(false);
    setInviteName('');
    setInviteEmail('');
    setInvitePhone('');
  };

  const handleInviteDoctor = () => {
    // Implement invite doctor logic here
    console.log('Invite doctor:', inviteName, inviteEmail, invitePhone);
    handleInviteDialogClose();
  };

  const handleBookConsultation = (doctor) => {
    // Implement book consultation logic here
    console.log('Book consultation:', doctor.name);
  };

  const filteredDoctors = doctorsList.filter((doctor) => {
    const nameMatch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const fieldMatch = !filterField || doctor.field === filterField;
    return nameMatch && fieldMatch;
  });

  const getDoctorAvailabilityText = (doctor) => {
    if (doctor.availability) {
      return 'Available';
    } else if (searchTerm && doctor.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return 'Registered but not available';
    } else {
      return 'Not available';
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Title>
           <Typography variant="h3" align='center'>Doctor List</Typography>
        </Title>
       
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Search Doctors"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>Field</InputLabel>
          <Select value={filterField} onChange={handleFieldFilterChange}>
            <MenuItem value="">All</MenuItem>
            {doctorsListUnique.map((doctor)=>(
              <MenuItem value={doctor}>{doctor}</MenuItem>
            ))}
{/*             
            // <MenuItem value="Cardiology">Cardiology</MenuItem>
            // <MenuItem value="Dermatology">Dermatology</MenuItem>
            // <MenuItem value="Orthopedics">Orthopedics</MenuItem> */}
            {/* Add more field options as needed */}
          </Select>
        </FormControl>
      </Grid>

      {filteredDoctors.length === 0 ? (
        <Grid item xs={12}>
          <Typography>No doctors available.</Typography>
          <Button variant="contained" onClick={handleInviteDialogOpen}>
            Invite Doctor
          </Button>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <List>
            {filteredDoctors.map((doctor) => (
              doctor.availability ? (
                <ListItem key={doctor.id}>
                  <ListItemButton onClick={() => setSelectedDoctor(doctor)}>
                    <ListItemText primary={doctor.name} secondary={doctor.field} />
                    <Button variant="contained" onClick={() => handleBookConsultation(doctor)}>
                      Book Consultation
                    </Button>
                  </ListItemButton>
                </ListItem>
              ) : (
                <ListItem key={doctor.id}>
                  <ListItemText primary={doctor.name} secondary={doctor.field} />
                  <Typography>{getDoctorAvailabilityText(doctor)}</Typography>
                </ListItem>
              )
            ))}
          </List>
        </Grid>
      )}

      {selectedDoctor && (
        <Grid item xs={12}>
          <Typography variant="h6">Selected Doctor:</Typography>
          <List>
            <ListItem>
              <ListItemText primary={selectedDoctor.name} secondary={selectedDoctor.field} />
              {selectedDoctor.availability ? (
                <Button variant="contained" onClick={() => handleBookConsultation(selectedDoctor)}>
                  Book Consultation
                </Button>
              ) : (
                <Button variant="contained" onClick={handleInviteDialogOpen}>
                  Invite Doctor
                </Button>
              )}
            </ListItem>
          </List>
        </Grid>
      )}

      <Dialog open={inviteDialogOpen} onClose={handleInviteDialogClose}>
        <DialogTitle>Invite Doctor</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={inviteName}
            onChange={(e) => setInviteName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Phone"
            value={invitePhone}
            onChange={(e) => setInvitePhone(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleInviteDialogClose}>Cancel</Button>
          <Button onClick={handleInviteDoctor} color="primary">
            Send Invitation
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default DoctorList;
