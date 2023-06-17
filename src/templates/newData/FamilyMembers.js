import React, {useEffect, useState} from "react";
import Sidebar from "./Sidebar";
import { Link, useLocation,useNavigate } from "react-router-dom";
import Header from "./Header";
const FamilyMembers = () => {
  const refreshToken = localStorage.getItem('token');

  const location = useLocation();
  const navigate= useNavigate();
  const memberId = localStorage.getItem("userId")
  const [family, setFamily] = useState([]);
  useEffect( ()=>{
    document.title="Family Members"
    const getMembers=async()=>{
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/members/${memberId}/family-members`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${refreshToken}`,
          },
        }
      ); 
      const data = await response.json();
      console.log(data);
      setFamily(data);
    }
   getMembers();

  },[])

const handleClick=(data)=>{
  console.log(data)
  navigate('/member', {state:{data}})
}

  return (
    <div className="overflow-x-hidden">
      <Header />
      <div class="grid grid-rows-6 grid-cols-12  grid-flow-col gap-1">
        <div class="row-span-6 col-span-3 bg-blue-400 ">
          <Sidebar />
        </div>
        <div class="col-span-9 row-span-6 bg-blue-200 ">
          <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
            
              <div class="flex flex-wrap w-full mb-8 ml-80">
                <div class="w-full mb-6 lg:mb-0">
                  <h1 class="sm:text-4xl text-5xl font-medium title-font mb-2 text-gray-900 -mt-5">
                    Family Members
                  </h1>
                  <div class="h-1 w-20 bg-indigo-500 rounded"></div>
                </div>
              </div>
              <div class="flex flex-wrap -m-4">
              {family.map((member)=>(
                <div class="p-4 lg:w-1/3 w-1/2">
                <div class="flex rounded-lg h-full bg-gradient-to-r from-blue-600 to-blue-400 p-8 flex-col">
                  <div class="flex items-center mb-3">
                    <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <h2 class="text-white text-lg title-font font-medium">
                      {member.name}
                    </h2>
                  </div>
                  <div class="flex-grow">
                    <p class="leading-relaxed text-base text-white">
                      <ul>
                        <li>Age {member.age}</li>
                        <li>Gender {member.gender}</li>
                        <li>Relation {member.relation}</li>
                      </ul>
                    </p>
                    <button
                      onClick={()=>handleClick(member)}
                      class="mt-3 p-3 text-white hover:text-gray-900 inline-flex items-center hover:bg-blue-400 rounded-2xl"
                    >
                      View More
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              ))}
                
                {/* post aother box */}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FamilyMembers;
