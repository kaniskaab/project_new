import React, { useState } from "react";
import DataDrivenForm from './DataDrivenForm';
import HeaderF from "./HeaderF";
import SidebarF from "./SidebarF";
const UpdateDetails = () => {
  const id = localStorage.getItem('id');
  useState(() => {
    document.title = 'Member Details';
  }, []);

  return (
    <div>
      <HeaderF/>
      <div className='flex'>
        <SidebarF/>
      </div>
      <div className="ml-[400px] mt-[75px] flex flex-col p-10">
        <DataDrivenForm/>
      </div>
    </div>
  );
};

export default UpdateDetails;
