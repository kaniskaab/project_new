import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import img from '../images/image3.png'
import {motion} from 'framer-motion'
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
    <>
    <Header />
    <div className="h-auto w-screen bg-no-repeat bg-cover overflow-hidden" style={{backgroundImage:`url(${img})`}} >
      <div class="grid grid-rows-6 grid-cols-12  grid-flow-col gap-1">
        <div class="row-span-6 col-span-3 ">
          <Sidebar
          memberdata={data}
            id={id}
             />
        </div>
        <motion.div class="col-span-9 row-span-6 bg-transparent flex flex-col items-center h-full w-full overflow-hidden"
        animate={{scale:1.1, opacity:1}}
        transition={{ease: "easeOut", duration:1, type:"tween" }}
        initial={{scale:1 , opacity:0}}
       
        >
          {}
          <div className=" flex text-7xl text-[#132540] font-dance  text-transform:capitalise mt-10 items-center" >
            Welcome {userName}
          </div>
          <div className="grid grid-cols-2 grid-row-2 grid-flow-col text-xl ">
            <motion.div className=" flex flex-col row-span-1 col-span-1 m-3 p-5 items-center b hover:bg-blue-800 hover:bg-opacity-50 rounded-2xl "
            animate={{scale:1.1, marginLeft:"2px", opacity:1}}
            transition={{ease: "easeOut", duration:1, type:"tween" }}
            initial={{scale:0, opacity:0.5}}
            >
              <h1 className="text-3xl font-dance underline">General Information</h1>
              <div className=" flex row-span-1 col-span-1 rounded-xl text-center">Gender: {data.gender}</div>
              <div className="row-span-1 col-span-1">Govt Id : {data.govtId}</div>
              <div className="row-span-1 col-span-1">Age: {data.age}</div>
              <div className="row-span-1 col-span-1"></div>
            </motion.div>
            <motion.div className="flex flex-col m-3 p-5 items-center  rounded-2xl hover:bg-blue-800 hover:bg-opacity-50 "
            animate={{scale:1.1, marginLeft:"2px", opacity:1}}
            transition={{ease: "easeOut", duration:1, type:"tween" }}
            initial={{scale:0, opacity:0.5}}
            >
            <h1 className=" text-3xl font-dance underline">Upcoming Consultation</h1>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default Patient;
