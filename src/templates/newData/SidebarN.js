import React from 'react'
import { Link } from 'react-router-dom'
export default function SidebarN() {
  return (
    <div className='h-full w-full'>
      <ul className='flex flex-col items-center h-full w-full mt-5 p-3'>
        <li className='w-full bg-blue-500 px-10 rounded-2xl m-3 py-1 text-center'><Link link to="/design" >Home</Link></li>
        <li className='w-full  bg-blue-500 px-3 rounded-2xl m-3 py-1 text-center'><Link >My Consultation</Link></li>
      </ul>
    </div>
  )
}
