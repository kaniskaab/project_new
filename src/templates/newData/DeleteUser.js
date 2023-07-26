import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useNavigate } from 'react-router-dom';
import Remove from '../../svg/Remove';
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
    <Popup trigger={<button className='flex items-center'><Remove/>Delete your Account?</button>} position="right center">
     <div className="grid grid-cols-1 grid-rows-2 ">
        
        <div className="row-span-1">
         Clicking on "Yes" will delete your Account ! 
        </div>
        <div className="row-span-1 justify-center items-center">
          <button
            onClick={HandleDelete}
            className="bg-red-500 px-5 rounded-xl text-xl"
            
          >
            Yes
          </button>
        </div>
      </div>
  </Popup>
)
  }