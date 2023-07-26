import React from 'react'
import HeartAdd from '../../svg/HeartAdd'
import Members from '../../svg/Members'
import Eye from '../../svg/Eye'
import { Delete } from './DeleteUser'

export default function SidebarF() {
  return (
    <div className='flex overflow-hidden'>
        <div className='w-[400px] fixed top-[75px] bg-[#c5e2e8] rounded-tr-[164px] h-full'>
            <div className='h-[275px] w-4/5 mt-[70px]'>
                <ul className='h-full w-full flex flex-col justify-between ml-[50px]'>
                    <li className='flex'>
                        <a href='registerDoctor' className='flex p-3 w-full rounded-r-[32px] hover:bg-white/50 font-ubu text-[20px] items-center hover:scale-105 transition-all delay-200'>
                            <HeartAdd/>
                            Register Doctor

                        </a>
                    </li>
                    <li className='flex'>
                        <a href='addMembers' className='flex p-3  w-full rounded-r-[32px] hover:bg-white/50 font-ubu text-[20px] items-center hover:scale-105 transition-all delay-200'>
                            <Members/>
                            Add members

                        </a>
                    </li>
                    <li className='flex'>
                        <a href='showConsultation' className='flex p-3  w-full rounded-r-[32px] hover:bg-white/50 font-ubu text-[20px] items-center hover:scale-105 transition-all delay-200'>
                            <Eye/>
                            View Consultation

                        </a>
                    </li>
                    <li className='flex'>
                        <button className='flex p-3  w-full rounded-r-[32px] hover:bg-white/50 font-ubu text-[20px] hover:scale-105 transition-all delay-200'>
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
