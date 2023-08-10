import React from 'react'
import Sidebar from './SidebarF';
import { Grid, Typography, TextField, Button, Paper, List, ListItem } from '@mui/material';
import Header from './HeaderF';
import { useState, useEffect } from 'react';
import Eye from '../../svg/Eye';
import Add from '../../svg/Add';
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
    const[viewpres,setViewPres]=useState(false);
    const[viewpresId,setViewPresId]=useState('');

    
    const [consultations, setConsultations]=useState([])
  const viewPres= (id)=>
  {
    setViewPresId(id);
    setViewPres(true);
  }
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
    <div>
    <Header/>
    <div className='flex'>
      <Sidebar/>
    </div>
    <div className="ml-[400px] mt-[75px] flex flex-col">
      <div></div>
      <div className="h-[153px] w-[626px] mx-auto rounded-[77px] z-10 bg-white flex items-center justify-center"><text className="text-[36px] font-bold font-ubu flex">Upcoming Consultations</text></div>

      <div className="h-[554px] w-[90%] mx-auto bg-[#c5d5e8] -mt-[100px] pt-[110px] rounded-[91px] flex flex-col items-center overflow-y-scroll mb-10">
      {
                    consultations.map((e)=>(
                        <>
                        {
                         new Date(e.dateOfAppointment)>new Date () &&
                         <ul className='flex flex-col border rounded-[10px] shadow-xl w-4/5 p-3 mb-3 text-[18px] font-ubu bg-white'>
                          <text className='font-bold text-[20px]'>                            {e.familyMember? <>CONSULTATION FOR {e.familyMember.name}</>:<>CONSULTATION FOR SELF</>}
</text>
                         <li>Date <text>{(e.dateOfAppointment).slice(0,10)}</text> </li>
                         <li>Time <text>{(e.dateOfAppointment).slice(11,16)}</text> </li>

                         <li>Code {e.code}</li>
                         <li>Status {e.status}</li>
                         {/* <li>QR code {e.qrCodeImageLocation}</li> */}
                         {console.log(doctorView)}
                         {showQr && e.id===viewId &&<div className='w-[450px] fixed bg-[#C5D5E8] shadow-2xl  flex flex-col justify-center items-center rounded-lg p-5 top-[100px] border-5 z-20'>
                          <div className='bg-white flex flex-col justify-center items-center rounded-lg p-1 border-5 z-20 font-ubu text-[20px] font-bold'>
                          <text>Consultation with Dr. {doctorView.user.name}</text> <text>Specialization: {doctorView.specialization}</text> <img src={`${URL.createObjectURL(qr)}`} alt="Qr" className='h-[200px] w-[200px]'/> <h1 className='text-[15px] text-blue-500'>Link: {link}</h1>
                        <button className='bg-gray-200 rounded-full rotate-90 p-2 font-bold mt-1 hover:bg-gray-300 hover:scale-105 transition-all delay-100' onClick={()=>setShowQr(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

                        </button></div>
                      
                         </div>}
                         { viewpres && viewpresId==e.id && <div className='fixed bg-white h-1/2 w-1/2 top-[100px] border rounded-lg p-1 border-5 z-20 font-ubu text-[20px] font-bold overflow-y-scroll'>
                          <div className='flex w-full items-center justify-between h-10'><text>Prescription</text> 
                          <button onClick={()=>setViewPres(false)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
                          </button >
                          

                          </div>
                          {e.prescriptions &&
                            e.prescriptions.map((prescription)=>(
                              <ul className='flex flex-col'>
                                <li>
                                 Notes: {prescription.notes}
                                </li>
                                <li>Diagnosis: {prescription.diagnosis}</li>
                                <li>Drug Details: {prescription.drugDetails.map((drug)=>
                                <ul className='flex flex-col'>
                                  <li>Generic Name: {drug.genericName}</li>
                                  <li>Brand Name: {drug.brandName}</li>
                                  <li>Dosage in Mg: {drug.dosageInMg}</li>
                                  <li>Frequency: {drug.frequency}</li>
                                  <li>Duration: {drug.duration}</li>
                                  <li>First time or refill: {drug.firstTimeOrRefill}</li>
                                  <li>Substitution: {drug.substitutionAllowed}</li>



                                </ul>

                                )}</li>
                                <li>Tests: {prescription.labTests && prescription.labTests.map((test)=>
                                <ul className='flex flex-col'>
                                  <li>Test Type: {test.testType}</li>
                                </ul>)}</li>
                                
                              </ul>
                            ))
                          }
                         {!e.prescriptions && <div>No Prescription</div>}


                        </div>
                        }
                         <button onClick={()=>getQr(e.id, e.doctor.id)} className=' w-4/5 h-10 rounded-full flex bg-gray-200 items-center justify-center hover:bg-gray-300 hover:scale-105 transition-all delay-100 mx-auto'><Eye/><span className='ml-2'>Show QR and Link</span></button>
                         <button onClick={()=>viewPres(e.id)} className=' w-4/5 h-10 rounded-full flex bg-gray-200 items-center justify-center hover:bg-gray-300 hover:scale-105 transition-all delay-100 mx-auto mt-2'><Eye/><span className='ml-2'>View Prescription</span></button>

                         </ul>
                        }</>
                    ))
                }
        </div>
        <div className="h-[153px] w-[626px] mx-auto rounded-[77px] z-10 bg-white flex items-center justify-center"><text className="text-[36px] font-bold font-ubu flex">Past Consultations</text></div>

        <div className="h-[554px] w-[90%] mx-auto bg-[#c5d5e8] -mt-[100px] pt-[110px] rounded-[91px] flex flex-col items-center overflow-y-scroll mb-10">
      {
                    consultations.map((e)=>(
                        <>
                        {
                         new Date(e.dateOfAppointment)<new Date () &&
                         <ul className='flex flex-col border rounded-[10px] shadow-xl w-4/5 p-3 mb-3 text-[18px] font-ubu bg-white'>
                          <text className='font-bold text-[20px]'>                            {e.familyMember? <>CONSULTATION FOR {e.familyMember.name}</>:<>CONSULTATION FOR SELF</>}
</text>
                         <li>Date <text>{(e.dateOfAppointment).slice(0,10)}</text> </li>
                         <li>Time <text>{(e.dateOfAppointment).slice(11,19)}</text> </li>

                         <li>Code {e.code}</li>
                         <li>Status {e.status}</li>
                         {/* <li>QR code {e.qrCodeImageLocation}</li> */}
                         {console.log(doctorView)}
                         {showQr && e.id===viewId &&<div className='w-[450px] fixed bg-[#C5D5E8] shadow-2xl  flex flex-col justify-center items-center rounded-lg p-5 top-[100px] border-5 z-20'>
                          <div className='bg-white flex flex-col justify-center items-center rounded-lg p-1 border-5 z-20 font-ubu text-[20px] font-bold'>
                          <text>Consultation with Dr. {doctorView.user.name}</text> <text>Specialization: {doctorView.specialization}</text> <img src={`${URL.createObjectURL(qr)}`} alt="Qr" className='h-[200px] w-[200px]'/> <h1 className='text-[15px] text-blue-500'>Link: {link}</h1>
                        <button className='bg-gray-200 rounded-full rotate-90 p-2 font-bold mt-1 hover:bg-gray-300 hover:scale-105 transition-all delay-100' onClick={()=>setShowQr(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

                        </button></div>
                       
                         </div>}
                         { viewpres && viewpresId==e.id && <div className='fixed bg-white h-1/2 w-1/2 top-[100px] border rounded-lg p-1 border-5 z-20 font-ubu text-[20px] font-bold overflow-y-scroll'>
                          <div className='flex w-full items-center justify-between h-10'><text>Prescription</text> 
                          <button onClick={()=>setViewPres(false)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
                          </button >
                          

                          </div>
                          {e.prescriptions &&
                            e.prescriptions.map((prescription)=>(
                              <ul className='flex flex-col'>
                                <li>
                                 Notes: {prescription.notes}
                                </li>
                                <li>Diagnosis: {prescription.diagnosis}</li>
                                <li>Drug Details: {prescription.drugDetails.map((drug)=>
                                <ul className='flex flex-col'>
                                  <li>Generic Name: {drug.genericName}</li>
                                  <li>Brand Name: {drug.brandName}</li>
                                  <li>Dosage in Mg: {drug.dosageInMg}</li>
                                  <li>Frequency: {drug.frequency}</li>
                                  <li>Duration: {drug.duration}</li>
                                  <li>First time or refill: {drug.firstTimeOrRefill}</li>
                                  <li>Substitution: {drug.substitutionAllowed}</li>



                                </ul>

                                )}</li>
                                <li>Tests: {prescription.labTests && prescription.labTests.map((test)=>
                                <ul className='flex flex-col'>
                                  <li>Test Type: {test.testType}</li>
                                </ul>)}</li>
                                
                              </ul>
                            ))
                          }
                          {!e.prescriptions && <div>No Prescription</div>}

                        </div>
                        }
                         <button onClick={()=>getQr(e.id, e.doctor.id)} className=' w-4/5 h-10 rounded-full flex bg-gray-200 items-center justify-center hover:bg-gray-300 hover:scale-105 transition-all delay-100 mx-auto'><Eye/><span className='ml-2'>Show QR and Link</span></button>
                         <button onClick={()=>viewPres(e.id)} className=' w-4/5 h-10 rounded-full flex bg-gray-200 items-center justify-center mt-2 hover:bg-gray-300 hover:scale-105 transition-all delay-100 mx-auto'><Eye/><span className='ml-2'>View Prescription</span></button>

                         </ul>
                        }</>
                    ))
                }
        </div>
    </div>
    </div>
    </div>
    
  )
}


// <div>
//         <Header/>
//     <div style={{ display: 'flex', height: '100vh' }}>
//       <div style={{ width: '25%', backgroundColor: '#f5f5f5' }}>
//         <SidebarN />
//       </div>
//       <div style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>
//       <Paper elevation={3} style={{ padding: '2rem' }}>

//         <Grid container spacing={3}>
//         <Grid item xs={12}>
//             {consultations.length!==0 ?
//           <Typography variant="h10" gutterBottom>
//                 <h1 className='text-bold font-mono text-[20px] leading-5 text-blue-500'>Upcoming Consultations</h1>

               
//                   <h1 className='text-bold font-mono text-[20px] leading-5 text-blue-500'>Past Consultations</h1>

// {
//     consultations.map((e)=>(
//         <>
//      {
//                          new Date(e.dateOfAppointment)<new Date () &&
//                          <ul className='mx-2 my-5 flex  flex-col border rounded-[10px] shadow-xl p-5'>
//                           {e.familyMember? <>Consultation for: {e.familyMember.name}</>:<>Consultation for SELF</>}
//                          <li>Consultation on <text>{(e.dateOfAppointment).slice(0,10)}</text> </li>
//                          <li>Consultation time <text>{(e.dateOfAppointment).slice(11,19)}</text> </li>

//                          <li>Consultation code {e.code}</li>
//                          <li>Status is {e.status}</li>
//                          <li>QR code {e.qrCodeImageLocation}</li>
//                          {console.log(doctorView)}
//                          {showQr && e.id===viewId &&<><>Doctor: {doctorView.user.name}</> <img src={`${URL.createObjectURL(qr)}`} alt="Qr" className='h-[200px] w-[200px]'/> <h1 className='text-[15px] text-blue-500'>Link: {link}</h1></>}
//                          <Button onClick={()=>getQr(e.id, e.doctor.id)}>Show QR and Link</Button>
//                          </ul>
//                         }</>
//     ))
// }
             
//           </Typography>
//             :"No consultation"}
          
//         </Grid>
//         </Grid>
//         </Paper>
//         </div>
//         </div>
//     </div>
