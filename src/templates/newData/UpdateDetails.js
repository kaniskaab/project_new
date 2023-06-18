import React, { useState } from "react";
import Sidebar from "./Sidebar";
import SidebarN from "./SidebarN";
import DataDrivenForm from './DataDrivenForm'
import { Button } from "@mui/material";
import Header from "./Header";

const UpdateDetails = () => {
  const id = localStorage.getItem('id')
  useState(()=>{
    document.title='Member Details'
  },[])
  return (
    <div className="overflow-y-hidden">
      <div class="grid grid-rows-6 grid-cols-12 grid-flow-col gap-1 bg-no-repeat bg-cover font-mono overflow-hidden">
        <div class="row-span-6 col-span-3 bg-transparent ">
          <SidebarN />
        </div>
        <div class="col-span-9 row-span-6 bg-transparent p-8">
         <DataDrivenForm/>
        </div>
      </div>
    </div>
  );
};

export default UpdateDetails;
