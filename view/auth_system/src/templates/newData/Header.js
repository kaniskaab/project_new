import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      {/* <!--Second navbar--> */}
      <nav class="relative flex w-full flex-wrap items-center justify-between bg-teal-500 bg-opacity-40 py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 lg:py-4">
        <div class="flex w-full flex-wrap items-center justify-between px-3">
          <div >
            <Link
              className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 "
              href="#"
            >
              DOCTOR-APP
            </Link>
          </div>
          <div>
            <Link link to="/patient" className="m-2 hover:text-blue-900 text-[#132540]">
              Home
            </Link>
            <Link
              link
              to="/directConsultation"
              className="m-2 hover:text-blue-900 text-[#132540]" 
            >
              Get Consultation
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
