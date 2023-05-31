import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import SignIn from './templates/SignIn' ;
import SignUp from './templates/SignUp';
import Dashboard from './templates/Dashboard';
import Forgot from './templates/Forgot';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/'  Component={SignIn}/>
    <Route path='/signup'  Component={SignUp}/> 
    <Route path='/dashboard'  Component={Dashboard}/> 
    <Route path='/forgotP'  Component={Forgot}/> 



    </Routes>
   
    </BrowserRouter>
  );
}


export default App;
