import React from 'react'
import Sidebar from './Sidebar';
import Header from '../newData/Header';
import { useLocation } from 'react-router-dom'
const Member = () => {
    const location= useLocation();
    const memberDetails = location.state.data;
    const familyMemberId = memberDetails.id;
    localStorage.setItem('familyMemberId',familyMemberId)
  return (

    <div className="overflow-x-hidden">
    <Header />
    <div class="grid grid-rows-6 grid-cols-12  grid-flow-col gap-1">
      <div class="row-span-6 col-span-3 bg-blue-400 ">
        <Sidebar memberDetails={memberDetails}/>
      </div>
      <div class="col-span-9 row-span-6 bg-blue-200 ">
      hello {memberDetails.name}
      <ul>
        <li>{memberDetails.age}</li>
        <li>{memberDetails.govtId}</li>
        <li>{memberDetails.gender}</li>
        <li>{memberDetails.relation}</li>
      </ul>
    </div>
   </div>
   </div>
  )
}

export default Member
