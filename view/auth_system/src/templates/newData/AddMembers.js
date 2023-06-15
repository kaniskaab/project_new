import React, { useEffect } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import ComponentMapper from './AddMemberForm'
const AddMembers = () => {
  useEffect(()=>
  {
    document.title='Add members';
  },[])
  return (
    <div>
      <Header />
      <div class="grid grid-rows-6 grid-cols-12  grid-flow-col gap-1">
        <div class="row-span-6 col-span-3 bg-blue-400 ">
          <Sidebar />
        </div>
        <div class="col-span-9 row-span-6 bg-blue-200 ">
            <ComponentMapper/>
        </div>
    </div>
    </div>
  )
}

export default AddMembers
