import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

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
        <Button onClick={logout}>Logout</Button>
    </div>
  )
}
