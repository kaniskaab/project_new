import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import HeaderF from './HeaderF'
import SidebarF from './SidebarF'
import Group from "../../svg/Group.png";
import Age from "../../svg/Age";
import Key from "../../svg/Key";
import Watch from "../../svg/Watch";
import Allergy from "../../svg/Allergy";
import Edit from "../../svg/Edit";
import Person from "../../svg/Person";

export default function MemberDashboard() {
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem("token");
  const id = Number(localStorage.getItem("id"));
  const [data, setData] = useState({});
  const [family, setFamily] = useState([]);
  const userId = data.id;
  localStorage.setItem("userId",userId)


  useEffect(() => {
    document.title = "Member Dashboard";
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/members`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }

        const userData = await response.json();
        console.log(userData);
        console.log(id);

        

        const filteredData = userData.filter((data) => data.user.id === id);
        console.log(filteredData[0]);
        setFamily(filteredData[0].familyMembers)
        setData(filteredData[0]);

        //getting consultations 
        const fetchConsultation=  await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/consultations/find/1`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        const consultation= await fetchConsultation.json();
        console.log(consultation)
      } catch (error) {
        console.error("An error occurred while fetching user data:", error);
      }
    };
    
    fetchData();
    }, []);

  const userName = localStorage.getItem("name");

  const getC = (details) => {
    navigate("/getConsultation", { state: { details } });
  };

  const selfConsult = () => {
    navigate("/getConsultationSelf", { state: { data } });
  };

  const getAllergy = (member) => {
    const id = member.id;
    // console.log(member)
    localStorage.setItem("familyMemberId", id);
    navigate("/memberAllergies");
  };

  return (
    <div className="overflow-x-clip">
      <HeaderF/>
      <div className='flex'>
        <SidebarF/>
      </div>
      <div className="ml-[400px] mt-[75px] flex flex-col">
    <div className="bg-no-repeat h-[300px] mx-auto bg-contain w-1/2" style={{backgroundImage:`url(${Group})`}}></div>
    <div className="text-[20px] font-bold font-mono text-center">Welcome {userName}
</div>
    <div className=" w-[630px] pb-2 mx-auto bg-[#c5d5e8] rounded-[91px] flex flex-col items-center">
      <div className="h-[50px] w-[500px] rounded-[77px] bg-white flex items-center justify-center mt-2"><text className="text-[20px] font-bold font-ubu">General Information</text></div>
      <div className=" w-4/5 bg-white mt-[20px] rounded-[22px]">
        <ul className="flex flex-col p-5 justify-around text-[15px] leading-[20px]">
          <li className="flex items-center">
            <Allergy/><text className="px-2">Gender:</text> <text className="pl-2">{data.gender}</text>
          </li>
          <li className="flex items-center">
            <Key/><text className="px-2">Government Id:</text> <text className="pl-2">{data.govtId}</text>
          </li>
          <li className="flex items-center">
            <Watch/> <text className="px-2">Age:</text> <text className="pl-2">{data.age}</text>
          </li>
          <li className="flex items-baseline">
            <div className="flex items-center"><Age/> <text className="px-2">Allergy:</text></div>
              <ul className="">
              {data.allergies && data.allergies[0] && data.allergies[0].map((allergy)=>
                
                <li>{allergy.allergy} reported by {allergy.reportedBy}</li>
              )}
              </ul>
          </li>
        </ul>
      </div>
      <div className="w-full flex items-end justify-end mt-3 mr-[100px]">
                <a href="updateDetails">
                  <Edit/>

                </a>
      </div>

    </div>
    <div className="h-[50px] w-full flex items-center justify-center my-5">
      <div className="h-full w-[600px] flex justify-between">
         <button className="text-[20px] font-ubu rounded-2xl border border-black w-2/5" onClick={selfConsult}>Consult</button>
         <button className="text-[20px] font-ubu rounded-2xl bg-[#c5d5e8] border-black w-2/5" onClick={()=>navigate('/viewAllergies')}>Allergies</button>
      </div>
      </div>
      <div className="h-[50px] w-[626px] mx-auto rounded-[77px] z-10 bg-white flex items-center justify-center"><text className="text-[20px] font-bold font-ubu flex">Dependents</text></div>

      <div className=" w-[90%] mx-auto bg-[#c5d5e8] -mt-[60px] rounded-[91px] flex flex-col items-center mb-10 pb-10">
      {
        family&& family.map((member)=>
        (
          <div className=" p-2 w-4/5 bg-white mt-[75px] rounded-[22px] flex">
        <div className="h-full flex justify-center items-center"><Person/></div>
        <ul className="flex flex-col p-5">
        <li className="flex items-center">
<text className="px-2 text-[15px]">{member.name}</text> 
          </li>
          <li className="flex items-center">
            <Allergy/><text className="px-2">Relation: {member.relation}</text>
          </li>
          <li className="flex items-center">
            <Key/><text className="px-2">Government Id:</text> <text className="pl-2">{member.govtId}</text>
          </li>
          <li className="flex items-center">
            <Watch/> <text className="px-2">Age:</text> <text className="pl-2">{member.age}</text>
          </li>
          <li className="flex items-baseline">
            <div className="flex items-center"><Age/> <text className="px-2">Allergy:</text></div>
              <ul className="">
              {member.allergies && member.allergies.map((allergy)=>
                
                <li>{allergy.allergy} reported by {allergy.reportedBy}</li>
              )}
              </ul>
          </li>
        </ul>
        <div className="h-full flex flex-col justify-center ml-auto mr-1 w-[200px]">
        <button className="text-[20px] font-ubu rounded-2xl border border-black w-full" onClick={()=>getC(member)}>Consult</button>
         <button className="text-[20px] font-ubu rounded-2xl mt-2 bg-[#c5d5e8] border-black w-full" onClick={()=>getAllergy(member)}>Allergies</button>
     

        </div>

      </div>
        ))
      }


    </div>
      </div>
    </div>
  )
}
