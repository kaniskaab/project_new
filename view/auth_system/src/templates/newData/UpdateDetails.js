import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DataDrivenForm from './DataDrivenForm'
import { Button } from "@mui/material";
import Header from "./Header";
const UpdateDetails = () => {
  const id = localStorage.getItem('id')
  useState(()=>{
    document.title='Member Details'
  },[])
  return (
    <div>
      <Header />
      <div class="grid grid-rows-6 grid-cols-12  grid-flow-col gap-1">
        <div class="row-span-6 col-span-3 bg-blue-400 ">
          <Sidebar />
        </div>
        <div class="col-span-9 row-span-6 bg-blue-200 p-8">
          {/* <!-- component --> */}
         <DataDrivenForm/>
        </div>
      </div>
    </div>
  );
};

export default UpdateDetails;
