import React from 'react'
import { Delete } from '../doctor/Delete'
export default function Sidebar() {
  return (
    <div className='flex overflow-hidden'>
        <div className='w-[400px] fixed top-[75px] bg-[#c5e2e8] rounded-tr-[164px] h-full'>
            <div className='h-[275px] w-4/5 mt-[70px]'>
                <ul className='h-full w-full flex flex-col justify-between ml-[50px]'>
                 
                 
                    
                    <li className='flex'>
                      <a><button className='flex p-3  w-full rounded-r-[32px] hover:bg-white/50 font-ubu text-[20px] hover:scale-105 transition-all delay-200'>
                            <Delete/>

                        </button></a>
                        
                    </li>

                </ul>
            </div>
        </div>
        <div></div>
      
    </div>
  )
}
