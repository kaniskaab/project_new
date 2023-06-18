import React, { useState, useEffect, useContext } from "react";
import SidebarN from "./SidebarN";
import { ToastContainer, toast } from "react-toastify";

import { useLocation } from "react-router-dom";
import { UserContext } from "../../context.js/UserContext";
const BookCSelf = () => {
    const location = useLocation();
    const refreshToken = localStorage.getItem("token");
    console.log(location.state.data);
    const details = location.state.data
    const {doctors}=useContext(UserContext);
   
    //here details.id = familyMemberId
    //details.memberRelatedTo.id = userId
    const userName = localStorage.getItem("name");
    const [date, setDate] = useState("");
    const [doctorId, setDoctorId] = useState([]);
  //   console.log(date);
  
    const [suggestions, setSuggestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  
  
    const handleInputChange = (event) => {
      const { value } = event.target;
      setSearchTerm(value);
      const filteredItems = doctors.filter(item =>
          item.user.name.toLowerCase().includes(value.toLowerCase())
        );
        console.log(filteredItems);
        setSuggestions(filteredItems); 
      };
  
    const handleSuggestionClick = (selectedResult) => {
      //here selectedResult.id = doctorId;
      console.log(selectedResult.user.name);
      setSearchTerm(selectedResult.user.name)
      setDoctorId(selectedResult.id)
      setSuggestions([]);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData=({
          doctorId:doctorId,
          memberId:details.id,
          dateOfAppointment: date,
          fees: 0,
          force:"false"
        });
        if(doctorId===[]|| !formData.memberId|| formData.dateOfAppointment==="")
        {
          toast.warn("Fill all the details before proceeding")
        }
        console.log(formData)
      const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/consultations`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept":"application/json",
              "Authorization": `Bearer ${refreshToken}`,
            },
            body:JSON.stringify(
              formData
            )
          }
        ); 
        const data = await response.json();
        console.log(data);
        console.log(data);
        if(response.ok)
        {
          toast.success("Consultation Booked!")
        }
        else
        {
          toast.warn(data.message)
        }
    };
  
    return (
      <div>
        <div className="grid grid-rows-10 grid-cols-12 h-screen w-screen overflow-hidden">
          <div className="col-start-1 col-span-2 row-start-1 row-span-10 h-full"><SidebarN/></div>
          <div className="col-start-3 col-span-4 row-start-1 row-span-4 row-end-4 ">
            <div className="flex flex-col items-center ">
              <h1 className="text-2xl">Book Consultation for Self</h1>
              <div className="text-xl flex flex-cols items-center justify-center px-20 mt-3 border border-blue-500 bg-gray-300">
                <ul>
                  <li>Relation: Self</li>
                  <li>Government Id: {details.govtId}</li>
                  <li>Age: {details.age}</li>
                  <li>Gender: {details.gender}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center flex-col col-start-3 col-span-4 row-start-5">
           <h1 className="text-2xl font-ubu">
              Select Date and Time
           </h1>
              <input
              className="w-1/2"
                id="date"
                type="datetime-local"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
          </div>
  
          <div className="col-start-7 col-span-6 row-start-1 row-span-6 p-5">
          <div className="w-full h-full flex items-center flex-col border pt-2 bg-gray-300 border-blue-600">
              <h1 className="text-2xl font-ubu mb-2"> Search Doctor</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search..."
        />
        <ul>
  
          {(suggestions.length===0)?<></>:suggestions.map((user) => (
            <li key={user.id} onClick={() => handleSuggestionClick(user)}>
             {user.user.name} specialized in {user.specialization}
            </li>
          )) }
        </ul>
      </div>
          </div>
          <div className="col-start-7 col-span-6 row-start-7 row-span-4  p-5">
              <div className="w-full h-full flex items-center flex-col border pt-2 bg-gray-300 border-blue-600 text-xl font-ubu">
                  <h1> Consultation Booked by {userName}</h1>
                      <h1 className="text-sm"> for</h1>
                      <h1>Self</h1> 
                      <h1 className="text-sm"> on </h1>
                      <h1>{date} with {searchTerm}</h1>
                  <button className="m-10 p-2 bg-gray-600 rounded-xl" onClick={handleSubmit}>Submit Consultation</button>
              </div>
             
            
          </div>
        </div>
        <ToastContainer/>
      </div>
    );
  };

export default BookCSelf
