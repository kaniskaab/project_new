import React from 'react'
import { useNavigate } from 'react-router-dom'
import LoginCurve from '../svg/LoginCurve'
export default function Logout() {
    const navigate=useNavigate()
    const logout =()=>
    {
localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')   
  localStorage.removeItem('role')
  localStorage.removeItem('id')
  localStorage.removeItem('name')
        navigate('/')
    }
  return (
    <div>
        <button onClick={logout} className='text-black bg-[#d9d9d9] flex mx-2 px-2 w-[102px] h-[35px] rounded-xl hover:scale-105 transition-all delay-200 items-center justify-around'><LoginCurve/>Logout</button>
    </div>
  )
}
