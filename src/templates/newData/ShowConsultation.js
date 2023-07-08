import React from 'react'
import SidebarN from './Sidebar';
import { Grid, Typography, TextField, Button, Paper, List, ListItem } from '@mui/material';
import Header from './Header';
import { useState, useEffect } from 'react';
export default function ShowConsultation() {
    const refreshToken = localStorage.getItem('token');
    const userId = Number(localStorage.getItem("id"))
    const [user,setUser]=useState('')
    
    const [consultations, setConsultations]=useState([])
  
    useEffect( ()=>{
    const fetchData = async()=>
    {
      try{
        const response2 = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/members/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        const data = await response2.json();
        console.log(data);
        setUser(data);

        const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/api/consultations`,
            {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${refreshToken}`,
                },
              }
        )
        const consult= await response.json()
        console.log(consult)
        const filtered= consult.filter((e)=>e.createdBy===userId)
        console.log(filtered)
        setConsultations(filtered)
  
      }

      catch(error){
        console.log(error)
      }
    }
    fetchData();
   },[])
   const time = new Date()
   console.log(time)
  return (
    
    <div>
        <Header/>
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '25%', backgroundColor: '#f5f5f5' }}>
        <SidebarN />
      </div>
      <div style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>

        <Grid container spacing={3}>
        <Grid item xs={12}>
            {consultations.length!==0 ?
          <Typography variant="h10" gutterBottom>
                <h1 className='text-bold font-mono text-[20px] leading-5 text-blue-500'>Upcoming Consultations</h1>

                {
                    consultations.map((e)=>(
                        <>
                        {
                         new Date(e.dateOfAppointment)>new Date () &&
                         <ul className='mx-2 my-5 flex  flex-col border rounded-[10px] shadow-xl p-5'>
                         <li>Consultation for SELF </li>
                         <li>Consultation on {Date(e.dateOfAppointment)}</li>
                         <li>Consultation code {e.code}</li>
                         <li>Status is {e.status}</li>
                         <li>QR code {e.qrCodeImageLocation}</li>
                         </ul>
                        }</>
                    ))
                }
                  <h1 className='text-bold font-mono text-[20px] leading-5 text-blue-500'>Past Consultations</h1>

{
    consultations.map((e)=>(
        <>
       {
        new Date(e.dateOfAppointment)< new Date () &&
        <ul className='mx-2 my-5 flex  flex-col items-center border rounded-[10px] shadow-xl p-5'>
        <li>Consultation for SELF </li>
        <li>Consultation code {e.code}</li>
        <li>Status {e.status}</li>
        <li>QR code {e.qrCodeImageLocation}</li>
        </ul>
       }</>
    ))
}
             
          </Typography>
            :"No consultation"}
          
        </Grid>
        </Grid>
        </Paper>
        </div>
        </div>
    </div>
  )
}
