import React from 'react'
import Health from '../../svg/Health'
import Home from '../../svg/Home.js'
import Logout from '../Logout.js'

export default function HeaderF() {
  return (
    <div className='w-full overflow-hidden'>
      <div className='fixed top-0 h-[75px] w-screen flex justify-between overflow-hidden bg-white/70 z-20'>
        <div className='logo flex items-center ml-[50px] '>
            <div className='bg-gray-200 rounded-2xl '><Health/></div>
            <text>Doctor App</text>
        </div>
        <div className='left-element flex items-center justify-around w-1/6'>
            <a href='design1'>
                <Home/>
            </a>
            <Logout/>
        </div>

      </div>
    </div>
  )
}
