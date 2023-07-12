import React from 'react'
import SidebarN from './Sidebar';
import { Grid, Typography, TextField, Button, Paper, List, ListItem } from '@mui/material';
import Header from './Header';
import { useState, useEffect } from 'react';
export default function ShowConsultation() {
    const refreshToken = localStorage.getItem('token');
    const userId = Number(localStorage.getItem("id"))
    const [user,setUser]=useState('')
    const [qr,setQr]=useState('')
    const [showQr, setShowQr]=useState(false)
    const[viewId,setViewId]=useState('')
    const[link,setLink]=useState('')
    const [doctor, setDoctor]=useState([]);
    const[doctorView, setDoctorView]=useState('');
    
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
        const filtered= consult.filter((e)=>e.createdBy===userId)
        console.log(filtered)
        setConsultations(filtered)

        const response1 = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/doctors`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              'Accept': 'application/json',
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        const dataD =await response1.json();
        setDoctor(dataD)
        
  
      }

      catch(error){
        console.log(error)
      }
    }
    fetchData();
   },[])

   const getQr = async (id, docId)=>
   {
    try{
      setViewId(id)
      setDoctorView((doctor.filter((e)=>e.id==docId))[0])
        const response2 = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/consultations/${id}/qrcode`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              'Accept': 'application/json',
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        console.log(response2)

        const data =await response2.blob();
        console.log(data);
        setQr(data)
        setShowQr(true)



        const response1 = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/consultations/${id}/link`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              'Accept': 'application/json',
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        const url =await response1.json();
        setLink(url.url)
        

    }
        catch(err){
            console.log(err)
        }

   }
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
                          {e.familyMember? <>Consultation for: {e.familyMember.name}</>:<>Consultation for SELF</>}
                         <li>Consultation on <text>{(e.dateOfAppointment).slice(0,10)}</text> </li>
                         <li>Consultation time <text>{(e.dateOfAppointment).slice(11,19)}</text> </li>

                         <li>Consultation code {e.code}</li>
                         <li>Status is {e.status}</li>
                         <li>QR code {e.qrCodeImageLocation}</li>
                         {console.log(doctorView)}
                         {showQr && e.id===viewId &&<><>Doctor: {doctorView.user.name}</> <img src={`${URL.createObjectURL(qr)}`} alt="Qr" className='h-[200px] w-[200px]'/> <h1 className='text-[15px] text-blue-500'>Link: {link}</h1></>}
                         <Button onClick={()=>getQr(e.id, e.doctor.id)}>Show QR and Link</Button>
                         </ul>
                        }</>
                    ))
                }
                  <h1 className='text-bold font-mono text-[20px] leading-5 text-blue-500'>Past Consultations</h1>

{
    consultations.map((e)=>(
        <>
     {
                         new Date(e.dateOfAppointment)>new Date () &&
                         <ul className='mx-2 my-5 flex  flex-col border rounded-[10px] shadow-xl p-5'>
                          {e.familyMember? <>Consultation for: {e.familyMember.name}</>:<>Consultation for SELF</>}
                         <li>Consultation on <text>{(e.dateOfAppointment).slice(0,10)}</text> </li>
                         <li>Consultation time <text>{(e.dateOfAppointment).slice(11,19)}</text> </li>

                         <li>Consultation code {e.code}</li>
                         <li>Status is {e.status}</li>
                         <li>QR code {e.qrCodeImageLocation}</li>
                         {console.log(doctorView)}
                         {showQr && e.id===viewId &&<><>Doctor: {doctorView.user.name}</> <img src={`${URL.createObjectURL(qr)}`} alt="Qr" className='h-[200px] w-[200px]'/> <h1 className='text-[15px] text-blue-500'>Link: {link}</h1></>}
                         <Button onClick={()=>getQr(e.id, e.doctor.id)}>Show QR and Link</Button>
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
