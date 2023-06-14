import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useNavigate } from 'react-router-dom';

export const Delete = () =>
 {
    const refreshToken= localStorage.getItem('token');
    const userId = Number(localStorage.getItem('userId'));
    const navigate = useNavigate();
    const HandleDelete=async (e)=>
    {
        const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/api/members/${userId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${refreshToken}`,
              }
            }
          ); 
          const data = await response.json();
          console.log(data);
        //   navigate('/')

    }
    return(
    <Popup trigger={<button>Delete your Account?</button>} position="right center">
    <div className='grid grid-cols-2 grid-rows-1 '>
        <div className='row-span-1'><button onClick={HandleDelete} className='bg-red-500 px-5 rounded-xl text-xl'>Yes</button></div>
        <div className='row-span-1'><button className='bg-green-500 px-5 rounded-xl text-xl'>No</button></div>
    </div>
  </Popup>
)
  }