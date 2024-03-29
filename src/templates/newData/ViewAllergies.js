import React, { useEffect, useState } from 'react';
import Header from './HeaderF';
import Sidebar from './SidebarF';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import MasksIcon from '@mui/icons-material/Masks';
import Alarm from '../../svg/Alarm';
import Add from '../../svg/Add';
import Bag from '../../svg/Bag';


const ViewAllergies = () => {
  const memberId = localStorage.getItem('userId');
  const refreshToken = localStorage.getItem('token');
  const [allergies, setAllergies] = useState([]);
  const [allergy, setAllergy] = useState('');
  const [reportedBy, setReportedBy] = useState('');
  const [show, setShow] = useState([]);
  useEffect(() => {
    document.title = 'Member Allergies';
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/members/${memberId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data.');
        }

        const userData = await response.json();
        const data = userData.allergies;

        data === null ? setAllergies([]) : setAllergies(data);
      } catch (error) {
        console.error('An error occurred while fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    const allergyDetail = { allergy: allergy, reportedBy: reportedBy };
    const arrayAllergy = [allergyDetail];
    const lnk = `${process.env.REACT_APP_BASE_URL}/api/members/${memberId}/allergies`;

    allergies === null ? setAllergies(arrayAllergy) : allergies.push(allergyDetail);

    const response = await fetch(lnk, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
      body: JSON.stringify([allergies]),
    });
    const data = await response.json();

    if (response.ok) {
      toast.success('Allergy Added');
      setAllergy('');
      setReportedBy('');
    } else {
      toast.warn(data.message);
    }
  };

  const handleDelete = async () => {
    const lnk = `${process.env.REACT_APP_BASE_URL}/api/members/${memberId}/allergies`;
    const response = await fetch(lnk, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    const data = await response.json();

    if (response.ok) {
      toast.success('Allergies deleted!');
      setAllergies([]);
    } else {
      toast.warn(data.message);
    }
    window.location.reload();
  };

  return (
    <div>
      <div>
      <Header/>
      <div className='flex'>
        <Sidebar/>
      </div>
      <div className="ml-[400px] mt-[75px] flex flex-col">
      <div className="h-[153px] w-[626px] mx-auto rounded-[77px] z-10 bg-white flex items-center justify-center"><text className="text-[36px] font-bold font-ubu flex">All allergies</text></div>

<div className="h-[554px] w-[90%] mx-auto bg-[#c5d5e8] -mt-10 rounded-[91px] flex flex-col items-center overflow-y-scroll mb-10">
  <ul className='w-[90%]'>
    {allergies && allergies[0] && allergies[0].map((allergy)=>
    (
      <li className='bg-white rounded-xl flex w-full items-center justify-between mt-[70px] p-3'>
        <span className='text-[20px] font-ubu font-bold '><Alarm/></span>
        <text className='text-[20px] font-ubu font-bold '>{allergy.allergy}</text>
        <span className='text-[20px] font-ubu'>reported by</span>
        <text className='text-[20px] font-ubu font-bold '>{allergy.reportedBy}</text>
      </li>
    ))}
  </ul>
  <div className='flex w-[90%] justify-between mt-[50px]'>
      <input
type="text"
placeholder="Allergy"
value={allergy}
onChange={(e) => setAllergy(e.target.value)}
className="border border-black p-3 rounded-xl w-full"
/>
<input
type="text"
placeholder="Reported By"
value={reportedBy}
onChange={(e) => setReportedBy(e.target.value)}
className="border border-black p-3 rounded-xl w-full"
/>
  </div>
  <div className='w-1/4 flex justify-between items-center mt-10 mb-2'>
    <button className='bg-white rounded-full' onClick={handleAdd}><Add/></button>
    <button className='bg-gray-200 p-3 rounded-full' onClick={handleDelete}><Bag/></button>
  </div>
</div>

      </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ViewAllergies;





