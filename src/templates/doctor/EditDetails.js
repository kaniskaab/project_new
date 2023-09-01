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
    <div style={{ display: 'flex', height: '100vh' }} className='mt-10 bg-transparent'>
      <div style={{ width: '25%' }}>
        <Sidebar />
      </div>
      <div style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>
      <div style={{ padding: '2rem' }}>

        <ComponentMapper/>
    </div>
        </div>
        </div>
    </div>
  )
}
