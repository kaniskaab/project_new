import React , {useEffect, useState} from "react";
import Sidebar from "./Sidebar";
import Header from "../newData/Header";
import { useLocation } from "react-router-dom";
const MemberAllergies = () => {


 
  const memberId = localStorage.getItem("userId")
  const familyMemberId = Number(localStorage.getItem("familyMemberId"));
  console.log(familyMemberId)
  const refreshToken = localStorage.getItem("token")
  const [allergies,setAllergies] = useState([])
  const [allergy, setAllergy] = useState('');
  const [reportedBy, setReportedBy] = useState('');
  const location= useLocation();
  console.log(location.state)

  useState(()=>{
    const fetchAllergies = async()=>{
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/members/${memberId}/family-members`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${refreshToken}`,
        }})
        const data = await response.json();
        // console.log(data);
        const details = data.filter((data)=>data.id===familyMemberId)
        console.log(details[0].allergies)
        setAllergies(details[0].allergies)
    }
    fetchAllergies();
  },[])

  const handleAdd = async () => {

    const allergyDetail ={"allergy":allergy, "reportedBy":reportedBy}
    const arrayAllergy =[allergyDetail];
    const lnk = `${process.env.REACT_APP_BASE_URL}/api/members/${memberId}/family-members/${familyMemberId}/allergies`;
    allergies===null?setAllergies(arrayAllergy):allergies.push(allergyDetail)

    const response = await fetch(lnk, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${refreshToken}`,
      },
      body: JSON.stringify([
        allergyDetail
      ]
      )})
      const data = await response.json();
      console.log(data);
    setAllergy('');
    setReportedBy('');
    
  };

  const handleDelete =async () => {
   

    const lnk = `${process.env.REACT_APP_BASE_URL}/api/members/${memberId}/family-member/${familyMemberId}/allergies`;
    const response = await fetch(lnk, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${refreshToken}`,
      }})
      const data = await response.json();
      console.log(data);
      window.location.reload()
  };

  return (
  
    <div>
      <Header />
      <div className="grid grid-rows-6 grid-cols-12  grid-flow-col gap-1">
        <div className="row-span-6 col-span-3 bg-blue-400 ">
          <Sidebar />
        </div>
        <div className="col-span-9 row-span-6 bg-blue-200 ">
          {/* <!-- component --> */}
          <div className="mt-10">
            <div className="px-4 sm:px-8 max-w-5xl m-auto">
              <h1 className="text-center text-4xl font-semibold underline underline-offset-2 decoration-indigo-900 p-10">
                All Allergies
              </h1>
              <ul className="border border-gray-200 rounded overflow-hidden shadow-md">
                {(allergies!==null)? 
                allergies.map(allergy=>
                      <li className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                 {allergy.allergy} reported by {allergy.reportedBy}
                </li>
                  ):
                  <h1>no allergies</h1> }
           

              </ul>
              <div className="flex space-x-2 h-auto mt-2 w-full">
              <input
        type="text"
        placeholder="Allergy"
        value={allergy}
        onChange={(e) => setAllergy(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded p-2"
      />
      <input
        type="text"
        placeholder="Reported By"
        value={reportedBy}
        onChange={(e) => setReportedBy(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded"
      />
    </div>
        <div className="flex flex-row p-3 space-x-2">
     
        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberAllergies;
