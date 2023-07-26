import React, { useEffect } from 'react'
import Header from './HeaderF'
import Sidebar from './SidebarF'
import ComponentMapper from './AddMemberForm'
const AddMembers = () => {
  useEffect(()=>
  {
    document.title='Add members';
  },[])
  return (
    <div>
    <div>
    <Header/>
    <div className='flex'>
      <Sidebar/>
    </div>
    <div className="ml-[400px] mt-[75px] flex flex-col p-10">
      <ComponentMapper/>
      </div>
      </div>
      </div>
   
  );
}

export default AddMembers
