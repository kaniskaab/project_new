import React, { useState, useEffect, useContext } from "react";
import SidebarN from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../context.js/UserContext";
import LocalHospitalTwoToneIcon from '@mui/icons-material/LocalHospitalTwoTone';import Autocomplete from "@mui/material/Autocomplete";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
} from "@mui/material";
import { CalendarToday, Search, PersonAdd } from "@mui/icons-material";
import Header from "./Header";

const BookCSelf = () => {
  const location = useLocation();
  const refreshToken = localStorage.getItem("token");
  // console.log(location.state.details);
  const details = location.state.data;
  // const { doctors } = useContext(UserContext);
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");

  const [doctorId, setDoctorId] = useState([]);
  const[newDate, setNewDate]=useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response2 = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/doctors`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        const data = await response2.json();
        console.log(data);
        setDoctors(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setNewDate]);

  const flatProps = {
    options: doctors.map((option) => option.user.name),
  };
  const [value, setValue] = React.useState(null);
  console.log(details);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      doctorId: doctorId,
      memberId: details.user.id,
      dateOfAppointment: date,
      fees: 0,
      force: true,
    };
    console.log(formData);
    if (
      doctorId === [] ||
      !formData.memberId ||
      formData.dateOfAppointment === ""
    ) {
      toast.warn("Fill all the details before proceeding");
    }
    console.log(refreshToken);
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/consultations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      toast.success("Consultation Booked!");
    } else {
      toast.warn(data.message);
    }
  };
  const Handle = (e, newValue) => {
    console.log(newValue);
    setValue(newValue);
    doctors.map((doctor) =>
      doctor.user.name === newValue ? setDoctorId(doctor.id): ""
    );
  };

  return (
    <div className="trial h-screen w-screen overflow-hidden">
      <Header />
      <div style={{ display: "flex", height: "100vh" }} className="bg-white/40">
        <div className="m-2 p-2 -mb-[200px] h-[450px] overflow-hidden rounded-[5px]">
          <SidebarN />
        </div>
        <div style={{ flex: 1, padding: "2rem", overflow: "auto" }}>
          <div>
            <div>
              <div className="first text-blue-500 font-ubu font-semibold flex justify-center text-[20px] rounded-[10px] p-2 bg-white/50">
                Self Consult
              </div>
              <div className=" flex">
                <div className="2nd w-1/2 bg-white/50 text-blue-500 font-mono flex m-2 p-2 flex-col justify-center items-center rounded-[5px]">
                  <div className="text-[25px] font-ubu font-bold">
                    Your details
                  </div>
                  <hr className="w-full" />
                  <ul className="text-[15px] leading-[30px]">
                    <li>Booking consultation for Self</li>
                    <li>Government Id is {details.govtId}</li>
                    <li>Age is {details.age}</li>
                    <li>Your gender is{details.gender}</li>
                  </ul>
                </div>
                <div className=" m-2 max-w-sm w-1/2 h-1/2">
                  <div className="text-[15px] font-ubu font-bold text-blue-500">
                    Select Date and Time
                  </div>
                  <input
                    className="w-full border h-[60px] px-5 text-[15px] rounded-[5px] bg-[#4894FE] text-white"
                    fullWidth
                    id="date"
                    type="datetime-local"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <div className="text-[15px] font-ubu font-bold text-blue-500">
                    Select Doctor
                  </div>

                  <Autocomplete
                    {...flatProps}
                    id="controlled-demo"
                    value={value}
                    style={{
                      backgroundColor: "#4894FE",
                      borderRadius: "5px",
                      color: "#ffffff",
                      padding: "3px",
                      height: "60px",
                    }}
                    onChange={(event, newValue) => {
                      Handle(event, newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} style={{ color: "white" }} />
                    )}
                  />
                </div>
              </div>
                <div className="bg-white/40 rounded-[5px] m-2 p-2 flex justify-between">
                  <div>
                <div className="text-[25px] font-ubu font-bold text-blue-500 ">
                    Consultation Summary
                  </div>
                  <div className="flex justify-between items-center font-ubu font-semibold text-[20px]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="#4894FE" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
</svg>
<div className="flex flex-col w-full">
  <div className="text-[20px] font-ubu text-blue-500" >{value && <>Dr {value}</>}</div>
</div>

</div>
<div className="my-5 flex items-center text-[20px] font-ubu font-thin text-blue-500"> 
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4894FE" class="w-6 h-6">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
</svg>
{/* {(Date(date)).slice(0,16)} at {(Date(date)).slice(17,21)} */}
{(date.slice(0,10))} at {date.slice(11)}
</div>

                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "2rem", height:"50px", width:"px" }}
                    onClick={handleSubmit}
                  >
                    <PersonAdd style={{ marginRight: "0.5rem" }} />
                    Submit Consultation
                  </Button>
                </div>
            </div>
          </div>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default BookCSelf;
