import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DataDrivenForm from './DataDrivenForm'
import { Button } from "@mui/material";
import Header from "./Header";
import img from '../images/image3.png'

const UpdateDetails = () => {
  const id = localStorage.getItem('id')
  useState(()=>{
    document.title='Member Details'
  },[])
  return (
    <div>
      <Header />
      <div class="grid grid-rows-6 grid-cols-12 grid-flow-col gap-1 bg-no-repeat bg-cover font-mono "style={{backgroundImage:`url(${img})`}}>
        <div class="row-span-6 col-span-3 bg-transparent ">
          <Sidebar />
        </div>
        <div class="col-span-9 row-span-6 bg-transparent p-8">
         <DataDrivenForm/>
        </div>
      </div>
    </div>
  );
};

export default UpdateDetails;
