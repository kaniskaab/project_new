import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import BookConsultationModal from "../familyMembers/BookConsultationModal";
import Header from "../newData/Header";
import { useNavigate } from "react-router-dom";
const Consultation = () => {
  const refreshToken = localStorage.getItem("token");
  const memberId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [members, setMember] = useState([]);
  const [inputValue, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filter, setFilter] = useState("");
  const [show, setShow] = useState([]);
  const [search, setSearch] = useState([]);
  useEffect(() => {
    document.title = "Book Consultation";
    const getMembers = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/doctors`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setDoctors(data);
      setSearch(data);
    };
    getMembers();
  }, []);
  const handleFilter = (e) => {
    if (e.target.value === "") {
      setDoctors(search);
    } else {
      const filterValue = search.filter(
        (item) =>
          item.specialization
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          item.user.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setDoctors(filterValue);
      setShow(filterValue);
    }

    setFilter(e.target.value);
  };

  // handle input change event
  const handleInputChange = (value) => {
    setValue(value);
  };

  // handle selection
  const handleChange = (value) => {
    setSelectedValue(value);
    const id = selectedValue.id;
  };

  const getMembers = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/members/${memberId}/family-members`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    const data = await response.json();
    setMember(data);
    return data;
  };
  const handleClick = ()=>
  {
   navigate("/doctorRegistration");
  }

  return (
    <div>
      <Header />
      <div className="grid grid-cols-2 grid-rows-4 grid-flow-row h-screen w-screen">
        <div className="col-span-1 row-span-4 bg-blue-200">
          <AsyncSelect
            cacheOptions
            defaultOptions
            value={selectedValue}
            getOptionLabel={(e) => e.name}
            getOptionValue={(e) => e.id}
            loadOptions={getMembers}
            onInputChange={handleInputChange}
            onChange={handleChange}
          />
          {selectedValue.length === 0 ? (
            <h1>Select a member</h1>
          ) : (
            <h1>
              Book Consultation for {selectedValue.name}{" "}
              {localStorage.setItem("familyMemberId", selectedValue.id)}
            </h1>
          )}
        </div>
        <div className="col-span-1 row-span-4 bg-blue-300">
          <div className="px-4 sm:px-8 max-w-5xl m-auto">
            <h1 className="text-center text-2xl font-semibold underline underline-offset-2 decoration-indigo-900 p-2">
              Available Doctors
            </h1>
            <input
              placeholder="Search Doctor"
              value={filter}
              onInput={(e) => handleFilter(e)}
              className="mb-5 flex w-1/2 items-center h-10 ml-60"
            />
            <ul className="border border-gray-200 rounded overflow-hidden shadow-md">
              {doctors.length !== 0 ? (
                doctors.map((doctor) => (
                  <li className="px-4 py-2 bg-white flex flex-row hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                    <p>
                      {doctor.user.name} Specialized in :{" "}
                      {doctor.specialization}
                    </p>
                    {selectedValue.length !== 0 ? (
                      <BookConsultationModal doctorId={doctor.id} />
                    ) : (
                      <></>
                    )}
                  </li>
                ))
              ) : (
                <h1>
                  <button className="mt-2" onClick={handleClick}>Add Doctor</button>
                </h1>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
