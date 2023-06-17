import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Delete = () => {
  const refreshToken = localStorage.getItem("token");
  const userId = Number(localStorage.getItem("userId"));
  const familyMember_Id = Number(localStorage.getItem("familyMemberId"));
  const navigate = useNavigate();

  const HandleDelete = async (e) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/members/${userId}/family-member/${familyMember_Id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      const data = await response.json();
      if (data.message) {
        navigate("/familyMembers");
      } else {
        toast.warn("Member not deleted!!");
      }
      navigate("/familyMembers");
    } catch (err) {
      console.log("Error : ", err);
    }
  };
  return (
    <Popup trigger={<button >Delete User?</button>} position="right center">
      <div className="grid grid-cols-1 grid-rows-2 ">
        
        <div className="row-span-1">
         Clicking on "Yes" will delete the member ! 
        </div>
        <div className="row-span-1 justify-center items-center">
          <button
            onClick={HandleDelete}
            className="bg-red-500 px-5 rounded-xl text-xl"
            
          >
            Yes
          </button>
        </div>
      </div>
      <ToastContainer />
    </Popup>
  );
};
