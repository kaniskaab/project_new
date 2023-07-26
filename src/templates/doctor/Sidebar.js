import React from 'react'
import { Delete } from '../doctor/Delete'
import Remove from '../../svg/Remove'
export default function Sidebar() {
  return (
    <div className='flex overflow-hidden'>
        <div className='w-[350px] fixed top-[75px] bg-[#c5e2e8] rounded-tr-[164px] h-full'>
            <div className='h-[275px] w-4/5 mt-[70px]'>
                <ul className='h-full w-full flex flex-col justify-between ml-[50px]'>
                 
                 
                    
                    <li className='flex'>
                      <button className='flex p-3 mr-3 w-full rounded-r-[32px] hover:bg-white/50 font-ubu text-[20px] hover:scale-105 transition-all delay-200'>
                        <Remove/>
                            <Delete/>

                        </button>
                        
                    </li>

                </ul>
            </div>
        </div>
        <div></div>
      
    </div>
  )
}

