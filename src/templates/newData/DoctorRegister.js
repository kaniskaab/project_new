import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./SidebarF";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../context.js/UserContext";
import { Paper } from "@mui/material";
import Header from "./HeaderF";

export default function DoctorRegister() {
  const refreshToken = localStorage.getItem("token");
  const [qr, setQr] = useState("");
  // const [qrView, setQrView] = useState("");

  useEffect(() => {
    document.title = "Doctor Registration";
    const fetchData = async () => {
      try {
        const responseNew = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/qrcode/doctor-registration-qr-code`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        if (!responseNew.ok) {
          throw new Error("Failed to fetch user data.");
        }
        if (responseNew.ok) {
          // console.log(responseNew);
          const data = await responseNew.blob();
           setQr(data);
          console.log(data);
          toast.success("Qr code fetched");
        }
      } catch (error) {
        console.error("An error occurred while fetching user data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div>
        <div>
          <Header />
          <div className="flex">
            <Sidebar />
          </div>
          <div className="ml-[400px] mt-[75px] flex flex-col">
          <img src={`${URL.createObjectURL(qr)}`} alt="Qr" className='h-[200px] w-[200px]'/>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
