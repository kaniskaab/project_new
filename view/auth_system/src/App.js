import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import SignIn from './templates/SignIn' ;
import SignUp from './templates/SignUp';
import Forgot from './templates/Forgot';
import Dashboard2 from './templates/DashboardD/Dashboard2'
import Patient1 from './templates/DashboardP/Patient1';
import MemberDetailsPage from './templates/DashboardP/MemberDetails';
import DoctorSearch from './templates/DashboardP/DoctorSearch';
import DoctorRegistrationForm from './templates/DoctorRegistration';
import GetConsultation from './templates/DashboardP/GetConsultation';
function App() {

  return (
   <>
    <BrowserRouter>
    <Routes>
    <Route path='/'  Component={SignIn}/>
    <Route path='/signup'  Component={SignUp}/> 
    <Route path='/dashboard' exact Component={Patient1}/> 
    <Route path='/dashboard2'  Component={Dashboard2}/> 
    <Route path='/forgotP'  Component={Forgot}/> 
    <Route path='/memberDetails' Component={MemberDetailsPage}/>
    <Route path='/doctorSearch' Component={DoctorSearch}/>
    <Route path='/doctorRegistration' Component={DoctorRegistrationForm}/>
    <Route path='/getC' Component={GetConsultation}/>
    </Routes>
    </BrowserRouter>
 </>
  );
}


export default App;
