import React, { useEffect, useState } from 'react'
import Header from '../newData/Header';
import Sidebar from './Sidebar';
import BookConsultationModal from './BookConsultationModal';
const MemberBookConsultation = () => {

  const [doctors,setDoctors]=useState([]);
  const refreshToken= localStorage.getItem('token');

   useEffect( ()=>{
    document.title='Family Members'
    const getMembers=async()=>{
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/doctors`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${refreshToken}`,
          },
        }
      ); 
      const data = await response.json();
      console.log(data);
      setDoctors(data);
    }
   getMembers();

  },[])

  return (
    <div>
    <Header />
    <div className="grid grid-rows-6 grid-cols-12  grid-flow-col gap-1">
      <div className="row-span-6 col-span-3 bg-blue-400 ">
        <Sidebar />
      </div>
      <div className="col-span-9 row-span-6 bg-blue-200 ">
        {/* <!-- component --> */}
        <div className="mt-10">
          <div className="px-4 sm:px-8 max-w-5xl m-auto">
            <h1 className="text-center text-4xl font-semibold underline underline-offset-2 decoration-indigo-900 p-10">
              Available Dotors
            </h1>
            <ul className="border border-gray-200 rounded overflow-hidden shadow-md">
              {(doctors!==null)? 
              doctors.map(doctor=>
                    <li className="px-4 py-2 bg-white flex flex-row hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
               <p>{doctor.user.name} Specialized in :  {doctor.specialization}</p>
               <BookConsultationModal doctorId={doctor.id}/>
              </li>
                ):
                <h1>no doctors</h1> }
                </ul>
           
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default MemberBookConsultation
