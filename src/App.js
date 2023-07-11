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
import Consultation from "./templates/consultation/Consultation";
import Design from "./templates/newData/Design";
import BookC from "./templates/newData/BookC";
import BookCSelf from "./templates/newData/BookCSelf";
import Design1 from "./templates/newData/Design1";
import DoctorRegister from "./templates/newData/DoctorRegister";
import ShowConsultation from "./templates/newData/ShowConsultation";
import Doctor from "./templates/doctor/Doctor";
import EditDetails from "./templates/doctor/EditDetails";
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
          <Route path="/directConsultation" Component={Consultation}/>
          <Route path='/design' Component={Design}/>
          <Route path ='/getConsultation' Component={BookC}/>
          <Route path ='/getConsultationSelf' Component={BookCSelf}/>
          <Route path ='/design1' Component={Design1}/>
          <Route path='/registerDoctor' Component={DoctorRegister}/>
          <Route path='/showConsultation' Component={ShowConsultation}/>
          <Route path='/doctor' Component={Doctor}/>
          <Route path="/editDoctorDetails" Component={EditDetails}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
