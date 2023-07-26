import React, { useState, useEffect, useContext } from "react";
import { Autocomplete, TextField } from "@mui/material";
import Sidebar from "./SidebarF";
import Age from "../../svg/Age";
import Key from "../../svg/Key";
import Watch from "../../svg/Watch";
import Allergy from "../../svg/Allergy";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../context.js/UserContext";

import Header from "./HeaderF";
import Copy from "../../svg/Copy";

const BookC = () => {
  const location = useLocation();
  const refreshToken = localStorage.getItem('token');
  const details = location.state.details;
  console.log(location.state.details);
  const userId = Number(localStorage.getItem('id'));
  console.log(refreshToken);

  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response2 = await fetch(`${process.env.REACT_APP_BASE_URL}/api/doctors`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshToken}`,
          },
        });
        const data = await response2.json();
        console.log(data);
        setDoctors(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const userName = localStorage.getItem('name');
  const [date, setDate] = useState('');
  const [doctorId, setDoctorId] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      doctorId: doctorId,
      memberId: userId,
      familyMemberId: details.id,
      dateOfAppointment: date,
      fees: 130,
      force: 'true',
    };
    console.log(formData);
    if (
      doctorId === [] ||
      !formData.memberId ||
      !formData.familyMemberId ||
      formData.dateOfAppointment === ''
    ) {
      toast.warn('Fill all the details before proceeding');
    }
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/consultations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      toast.success('Consultation Booked!');
    } else {
      toast.warn(data.message);
    }
  };

  const flatProps = {
    options: doctors.map((option) => option.user.name),
  };
  const [value, setValue] = React.useState(null);

  const Handle = (e, newValue) => {
    setValue(newValue);
    doctors.map((doctor) => (doctor.user.name === newValue ? setDoctorId(doctor.id) : ''));
  };

  return (
    <div>
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
      </div>

      <div className="ml-[400px] mt-[75px] flex flex-col">
       
        <div className="h-[153px] w-[626px] mx-auto rounded-[77px] z-10 bg-white flex items-center justify-center">
          <text className="text-[36px] font-bold font-ubu flex">
            Book Consultation for {details.relation}
          </text>
        </div>

        <div className="h-[554px] w-[90%] mx-auto bg-[#c5d5e8] -mt-10 rounded-[91px] flex flex-col items-center overflow-y-scroll mb-10">
          <div className="flex w-[90%] justify-between mt-[50px]">
            <div className="h-[250px] w-1/2 bg-white mt-[75px] rounded-[22px] overflow-y-scroll">
              <text className="w-full text-center flex text-[20px] font-ubu p-2">              Details for {details.name}
</text>
              <ul className="flex flex-col p-5 justify-around text-[15px] leading-[40px]">

                <li className="flex items-center">
                  <Allergy />
                  <text className="px-2">Gender:</text>{" "}
                  <text className="pl-2">{details.gender}</text>
                </li>
                <li className="flex items-center">
                  <Key />
                  <text className="px-2">Government Id:</text>{" "}
                  <text className="pl-2">{details.govtId}</text>
                </li>
                <li className="flex items-center">
                  <Watch /> <text className="px-2">Age:</text>{" "}
                  <text className="pl-2">{details.age}</text>
                </li>
                <li className="flex items-baseline">
                  <div className="flex items-center">
                    <Age /> <text className="px-2">Allergy:</text>
                  </div>
                  <ul className="">
                    {details.allergies &&
                      details.allergies &&
                      details.allergies.map((allergy) => (
                        <li>
                          {allergy.allergy} reported by {allergy.reportedBy}
                        </li>
                      ))}
                  </ul>
                </li>
              </ul>
            </div>
            {/* we will add the date and doctor */}
            <div className="mt-[50px]">
              <div>
                <span>Select Doctor</span>
              </div>
              <Autocomplete
                {...flatProps}
                id="controlled-demo"
                value={value}
                style={{
                  borderRadius: "5px",
                  color: "#ffffff",
                  padding: "3px",
                  height: "60px",
                }}
                onChange={(event, newValue) => {
                  Handle(event, newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} style={{ color: "black" }} />
                )}
              />
              <span>Select Date</span>

              <input
                className="w-full border h-[60px] px-5 text-[15px] rounded-[5px]"
                fullWidth
                id="date"
                type="datetime-local"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <div className="w-4/5 px-2 rounded-lg items-center flex bg-white mt-5 mb-2 flex-col">
            <div className="text-[25px] font-ubu font-bold ">
              Consultation Summary
            </div>
            <div className="w-full">
              <div className="flex w-full justify-between ">
                <div className="flex flex-col font-ubu font-semibold text-[20px] w-1/2">
                  
                  <div className="text-[20px] font-ubu flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1"
                    stroke="black"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                    />
                  </svg>
                    {value && <>Dr {value}</>}
                  </div>
                  <div className="my-5 flex items-center text-[20px] font-ubu font-thin">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="black"
                      class="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    {/* {(Date(date)).slice(0,16)} at {(Date(date)).slice(17,21)} */}
                    {date.slice(0, 10)} at {date.slice(11)}
                  </div>
                 
                </div>
                <button className="flex w-1/2 bg-gray-200 h-10 items-center justify-center rounded-full my-auto hover:bg-gray-300 hover:scale-105 transition-all delay-100" onClick={handleSubmit}>
                  <Copy/>
                  <text className="flex pl-2 font-ubu font-bold">Submit Consultation</text>
                </button>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer />
  </div>
  )};
  
  export default BookC;