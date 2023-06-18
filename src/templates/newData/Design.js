import React, { useState, useEffect } from "react";
import SidebarN from "./SidebarN";
import Header from "./Header";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
function Design() {
    const navigate = useNavigate()
  const refreshToken = localStorage.getItem("token");
  const id = Number(localStorage.getItem("id"));
  const [data, setData] = useState({});
  //here data.id will give member id of the user
  //id = user id
  const [family, setFamily] = useState([]);

  useEffect(() => {
    document.title = "Member DashBoard";
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
        setData(filteredData[0]);
      } catch (error) {
        console.error("An error occurred while fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  const userName = localStorage.getItem("name");
  const userId = data.id;
  const getMembers = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/members/${userId}/family-members`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setFamily(data);
  };

  const getC =(details)=>
  {
    navigate('/getConsultation', {state:{details}})
  }
  const selfConsult =()=>
  {
    navigate("/getConsultationSelf", {state:{data}})
  }

  return (
    <div>
      <div className="grid grid-cols-10 grid-flow-row grid-rows-2 h-screen w-screen overflow-hidden">
        <div className="col-span-2 row-span-2 bg-blue-300">
            <SidebarN/>
        </div>
        <div className="col-span-4 row-span-2 bg-blue-50">
          <div className="h-full w-full grid grid-cols-9 grid-rows-15 grid-flow-col">
            <div className="col-span-9 row-span-1">
              <h1 className="text-3xl text-center"> Welcome {userName}</h1>
            </div>
            <div className=" flex items-center flex-col col-start-2 col-span-7 row-start-2 row-end-6  bg-blue-600">
              <h1 className="text-3xl font-mono underline">
                General Information
              </h1>
              <div className=" flex row-span-1 col-span-1 rounded-xl text-center">
                Gender: {data.gender}
              </div>
              <div className="row-span-1 col-span-1">
                Govt Id : {data.govtId}
              </div>
              <div className="row-span-1 col-span-1">Age: {data.age}</div>
            </div>
            <div className=" flex flex-row justify-center items-center col-start-2 col-span-7 row-start-6 bg-blue-50">
              <button className="h-1/4 w-1/2 my-5 bg-gray-400 rounded-2xl hover:bg-gray-600 mx-2" onClick={selfConsult}>
                Consultation
              </button>
              <button className="h-1/4 w-1/2 my-5 bg-gray-400 rounded-2xl hover:bg-gray-600 mx-2" onClick={()=>
            {
                navigate('/updateDetails')
            }}>
                Edit
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-4 row-span-1 bg-blue-50 overflow-scroll">
          <div className="m-5 flex items-center flex-col border border-blue-500 p-2">
            <button onClick={getMembers} className="mx-3 rounded-2xl px-3 bg-blue-400">Dependents</button>
            <ul className="h-full w-full p-2">
              {family.map((member) => (
                <li className="flex flex-row items-center m-2 bg-blue-300 font-mono border border-blue-500">
                  <div className="mx-2">
                    <h1>{member.name}</h1>
                    <h2>{member.relation}</h2>
                  </div>

                  <button onClick={()=>getC(member)} className="text-blue-500 ml-auto mx-2">
                    Consult
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-4 row-span-1 overflow-scroll">
         <div className="m-5 flex items-center flex-col border border-blue-500 p-2">
         <button className="mx-3 rounded-2xl px-3 bg-blue-400">Show consultation</button>

         </div>
        </div>
      </div>
    </div>
  );
}

export default Design;
