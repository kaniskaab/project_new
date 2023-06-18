import React, { useEffect, useState } from "react";
import SidebarN from "./SidebarN";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
const ViewAllergies = () => {
  const memberId = localStorage.getItem("userId");
  const refreshToken = localStorage.getItem("token");
  const [allergies, setAllergies] = useState([]);
  const [allergy, setAllergy] = useState("");
  const [reportedBy, setReportedBy] = useState("");
  const [show, setShow] = useState([]);
  const [canAdd, setCanAdd] = useState(false);
  const navigate=useNavigate();
  const location=useLocation();
  useEffect(() => {
    document.title = "Member Allergies";
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/members/${memberId}`,
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
        const data = userData.allergies;

        data === null ? setAllergies([]) : setAllergies(data);
        console.log(allergies);
        // (allergies!==null)?setShow(allergies[0]):setShow([]);
      } catch (error) {
        console.error("An error occurred while fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  const showAllergies = () => {
    allergies.length===0?toast.warn("No allergies to show"):setShow(allergies[0]);
    show.length===0?setCanAdd(true):setCanAdd(false)
  };

  const handleAdd = async () => {
    const allergyDetail = { allergy: allergy, reportedBy: reportedBy };
    const arrayAllergy = [allergyDetail];
    const lnk = `${process.env.REACT_APP_BASE_URL}/api/members/${memberId}/allergies`;
    allergies === null
      ? setAllergies(arrayAllergy)
      : allergies.push(allergyDetail);

    const response = await fetch(lnk, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
      body: JSON.stringify([allergies]),
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      toast.success("Allergy Added");
      setAllergy("");
      setReportedBy("");
    } else {
      toast.warn(data.message);
    }
  };

  const handleDelete = async () => {
    const lnk = `${process.env.REACT_APP_BASE_URL}/api/members/${memberId}/allergies`;
    const response = await fetch(lnk, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      toast.success("Allergies deleted !");
      setAllergies([]);
    } else {
      toast.warn(data.message);
    }
    window.location.reload()
  };


  return (
    <div>
      <div className="grid grid-rows-6 grid-cols-12  grid-flow-col gap-1">
        <div className="row-span-6 col-span-3">
          <SidebarN />
        </div>
        <div className="col-span-9 row-span-6  w-3/4 m-2 h-auto border bg-gray-300 border-blue-600 flex flex-col items-center">
          <div className="mt-10 ">
            <div className="px-4 sm:px-8 max-w-5xl">
              <h1 className="text-center text-xl font-semibold underline underline-offset-2 decoration-indigo-900">
                All Allergies
              </h1>
              <h1 className="text-red-500">
                Delete all allergies before adding new
              </h1>
              <button onClick={showAllergies} className="bg-blue-500 px-2 rounded-xl m-5">Show Allergies</button>
              <ul className="border border-gray-200 rounded overflow-hidden shadow-md">
                {console.log(show)}
                {show !== [] ? (
                  show.map((allergy) => (
                    <li className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                      {allergy.allergy} reported by {allergy.reportedBy}
                    </li>
                  ))
                ) : (
                  <h1>no allergies</h1>
                )}
              </ul>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
              <div className="flex flex-col space-x-2 h-auto mt-2 w-full">
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
              <div className="flex flex-col p-3 space-x-2">
                {console.log(show)}
                {canAdd && show.length===0 &&  <button
                  onClick={handleAdd}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add
                </button>  }
            
                <div>
                  <ul className="border border-gray-200 rounded overflow-hidden shadow-md">
                    {console.log(show)}
                    {allergies.length!==0 ? (
                      allergies.map((allergy) => (
                        <li className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                          {allergy.allergy} reported by {allergy.reportedBy}
                        </li>
                      ))
                    ) : (
                      <h1>no allergies</h1>
                    )}
                  </ul>
                </div>
                {
                  canAdd && show.length===0 && <button className="p-2 roundex-xl bg-blue-500 m-2 text-white " onClick={()=>window.location.reload()} > Submit</button>

                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ViewAllergies;
