import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./templates/SignIn";
import SignUp from "./templates/SignUp";
import Forgot from "./templates/Forgot";
import DoctorRegistrationForm from "./templates/doctor/DoctorRegistration";
import Patient from "./templates/newData/Patient";
import Sidebar from "./templates/newData/Sidebar";
import UpdateDetails from "./templates/newData/UpdateDetails";
import ViewAllergies from "./templates/newData/ViewAllergies";
import FamilyMembers from "./templates/newData/FamilyMembers";
import Member from "./templates/familyMembers/Member";
import MemberAllergies from "./templates/familyMembers/MemberAllergies";
import MemberBookConsultation from "./templates/familyMembers/MemberBookConsultation";
import AddMembers from "./templates/newData/AddMembers";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={SignIn} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/doctorRegistration" Component={DoctorRegistrationForm}  />
          <Route path="/patient" Component={Patient} />
          <Route path="/sidebar" Component={Sidebar} />
          <Route path="/updateDetails" Component={UpdateDetails} />
          <Route path="/viewAllergies" Component={ViewAllergies} />
          <Route path="/familymembers" Component={FamilyMembers} />
          <Route path="/member" Component={Member} />
          <Route path="/memberAllergies" Component={MemberAllergies}/>
          <Route path="/memberBookConsultation" Component={MemberBookConsultation}/>
          <Route path ="/addMembers" Component={AddMembers}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
