import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Grid, Typography, TextField, Button, Paper, List, ListItem } from '@mui/material';
import { CalendarToday, Search, PersonAdd } from '@mui/icons-material';
import Autocomplete from "@mui/material/Autocomplete";
import ComponentMapper from './EditDoctorForm';
export default function EditDetails() {
  return (
    <div>
         <Header/>
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '25%', backgroundColor: '#f5f5f5' }}>
        <Sidebar />
      </div>
      <div style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>

        <ComponentMapper/>
    </Paper>
        </div>
        </div>
    </div>
  )
}
