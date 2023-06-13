import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useLocation } from "react-router-dom";
const Patient = () => {
  const refreshToken = localStorage.getItem("token");
  const id = Number(localStorage.getItem('id')) 
  const [data,setData] = useState({})



  useEffect(() => {
    document.title='Member DashBoard'
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/members`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${refreshToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }

        const userData = await response.json();
        console.log(userData);
        console.log(id);

        const filteredData = userData.filter(data=>data.user.id===id)
        console.log(filteredData[0]);
        setData(filteredData[0])

      } catch (error) {
        console.error("An error occurred while fetching user data:", error);
        
      }
    };
    fetchData();
  }, []);
  const userName= localStorage.getItem('name')
  localStorage.setItem("userId",data.id)


  return (
    <div>
      <Header />
      <div class="grid grid-rows-6 grid-cols-12  grid-flow-col gap-1">
        <div class="row-span-6 col-span-3 bg-blue-400 ">
          <Sidebar
          memberdata={data}
            id={id}
             />
        </div>
        <div class="col-span-9 row-span-6 bg-blue-600 ">
          <div className="text-4xl text-white text-center font-mono">
            Welcome {userName}
          </div>
          <div className="grid grid-cols-2 grid-row-2 grid-flow-row">
            <div className="row-span-1 col-span-1">
              <div className="row-span-1 col-span-1">Gender: {data.gender}</div>
              <div className="row-span-1 col-span-1">Govt Id : {data.govtId}</div>
              <div className="row-span-1 col-span-1">Age: {data.age}</div>
              <div className="row-span-1 col-span-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;
