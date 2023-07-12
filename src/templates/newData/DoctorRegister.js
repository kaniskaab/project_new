import React, { useState, useEffect, useContext } from "react";
import SidebarN from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../context.js/UserContext";
import {

  Paper,

} from "@mui/material";
import Header from "./Header";

export default function DoctorRegister() {
  const refreshToken = localStorage.getItem("token");
  const [qr, setQr] = useState('');
  // const [qrView, setQrView] = useState("");

  useEffect(() => {
    document.title = "Doctor Registration";
    const fetchData = async () => {
      try {
       

        const responseNew = await fetch(
          `http://localhost:3000/registerDoctor/api/qrcode/doctor-registration-qrcode`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${refreshToken}`,

            }
          }
        );
        if (!responseNew.ok) {
          throw new Error("Failed to fetch user data.");
        }
        if(responseNew.ok)
        {
             console.log(responseNew)
             const data = await responseNew.text()
            //  setQr(data);
             console.log(data)
        toast.success("Qr code fetched")
        }
       
      } catch (error) {
        console.error("An error occurred while fetching user data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Header />
      <div style={{ display: "flex", height: "100vh" }}>
        <div style={{ width: "25%", backgroundColor: "#f5f5f5" }}>
          <SidebarN />
        </div>
        <div style={{ flex: 1, padding: "2rem", overflow: "auto" }}>
          {/* {console.log(qr)} */}
          <Paper elevation={2} className="w-full h-auto">
            <div className="flex flex-col m-10">
              <h1>
                {/* {qr && <span>Registration Link : {qr}</span>}{" "} */}
              </h1>
            </div>
          </Paper>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
