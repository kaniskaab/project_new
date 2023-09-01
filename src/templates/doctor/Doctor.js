import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as YourSvg } from "../../svg/doctor.svg";
import SidebarF from "./Sidebar";
import HeaderF from "./Header";
import Info from "../../svg/Info";
import Age from "../../svg/Age";
import Key from "../../svg/Key";
import Edit from "../../svg/Edit";
import Eye from "../../svg/Eye";
import Watch from "../../svg/Watch";
export default function Doctor() {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const refreshToken = localStorage.getItem("token");
  const id = Number(localStorage.getItem("id"));
  const [consultation, setConsultation] = useState([]);
  // console.log(id);
  const [doctor, setDoctor] = useState([]);
  const [data, setData] = useState("");
  const [view, setView] = useState(false);
  const [viewId, setViewId] = useState();
  const [link, setLink] = useState("");
  const [qr, setQr] = useState("");
  const [showQr, setShowQr] = useState(false);
  const [qrViewId, setQrViewId] = useState(false);
  const [viewpres, setViewPres] = useState(false);
  const [viewpresId, setViewPresId] = useState("");

  console.log(refreshToken);
  const viewPres = (id) => {
    setViewPresId(id);
    setViewPres(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        //CHANGE FETCH LINK ACCORDINGLY
        console.log(process.env.REACT_APP_BASE_URL);
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/users/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }

        const userData = await response.json();
        setData(userData);
        console.log(userData);

        const response2 = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/doctors`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        const data = await response2.json();
        console.log(data);
        // setDoctors(data);
        const filterData = data.filter((e) => e.user.name == userData.name);
        console.log(filterData);
        setDoctor(filterData[0]);
        localStorage.setItem("doctorId", filterData[0].id);
        //set Consultation Data

        const responseC = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/consultations/doctor`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        const dataC = await responseC.json();
        // console.log(responseC)
        setConsultation(dataC);
        console.log(dataC);
      } catch (error) {
        console.error("An error occurred while fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  //viewConsultation to find a consultation

  // const viewConsultation = async (newId) => {
  //   try {
  //     console.log(newId);

  //     const response = await fetch(
  //       `${process.env.REACT_APP_BASE_URL}/api/consultations/1/prescription`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${refreshToken}`,
  //         },
  //         body: {},
  //       }
  //     );
  //     console.log(response);

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch data.");
  //     }

  //     // const userData = await response.json();
  //     // console.log(userData);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const getQr = async (id, docId) => {
    try {
      setQrViewId(id);
      const response2 = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/consultations/${id}/qrcode`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      //  console.log(response2)

      const data = await response2.blob();
      //  console.log(data);
      setQr(data);
      setShowQr(true);
      const response1 = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/consultations/${id}/link`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      const url = await response1.json();
      setLink(url.url);
    } catch (err) {
      console.log(err);
    }
  };

  const showDetails = async (id, fmId, e) => {
    try {
      console.log(e.id);
      getQr(e.id, e.doctor.id);
      setViewId(e.id);
      setDetails([]);
      if (fmId) {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/members/${id}/family-members`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        const data = await response.json();
        setDetails(data.filter((e) => e.id == fmId.id)[0]);
        // console.log(data[0])
      } else {
        const response1 = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/members/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        const data = await response1.json();
        setDetails(data);
        // console.log(data)
      }
      setView(true);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(details)
  return (
    <div className="overflow-x-clip">
      <HeaderF />
      <div className="flex">
        <SidebarF />
      </div>
      <div className="ml-[350px] mt-[75px] flex flex-col">
        <div className="flex items-end">
          <YourSvg />
          <div className="flex flex-col text-[20px] font-bold font-ubu ">
            <div>Welcome</div>
            <div>Doctor {data.name}</div>
          </div>
        </div>
        <div className="flex w-full">
          <div className="w-1/2">
            <div className="w-[95%] h-[300px] bg-[#C5D5E8] rounded-[36px] pt-5 px-2 ml-1">
              <div className="w-3/5 text-[20px] flex items-center text-center mx-auto justify-center bg-gray-200 rounded-full h-[50px] ">
                <Info />
                <span className="px-2">Details</span>
              </div>
              <div className=" h-1/2 w-4/5 bg-white mx-auto rounded-lg mt-5">
                <ul>
                  <li className="flex p-2 items-center text-[20px]">
                    <Key />
                    <span className="px-2">License Number</span>
                    <span>{doctor.licenseNumber}</span>
                  </li>
                  <li className="flex p-2  items-center text-[20px]">
                    <Age />
                    <span className="px-2">Specialization</span>
                    <span>{doctor.specialization}</span>
                  </li>
                </ul>
              </div>
              <button
                className="bg-gray-200 flex mx-auto w-4/5 rounded-[36px] items-center justify-center h-10 p-2 my-2 font-ubu text-[20px] hover:bg-gray-300 hover:scale-105 transition-all delay-100"
                onClick={() => navigate("/editDoctorDetails")}
              >
                <Edit />
                <span className="pl-2">Edit details</span>
              </button>
            </div>
          </div>
          <div className="w-1/2 mt-[70px]">
            <div className="  w-4/5 py-2 mx-auto rounded-[91px] bg-white relative z-10 -mt-[200px] flex items-center justify-center">
              {" "}
              <text className="text-[20px] font-bold font-ubu">
                Upcoming Consultation
              </text>
            </div>
            <div className="bg-[#C5D5E8] w-full rounded-[70px] -mt-[60px] pt-[60px] pb-10">
              <ul>
                {consultation &&
                  consultation.map((e) => (
                    <div>
                      {new Date() < new Date(e.dateOfAppointment) && (
                        <div className="bg-white m-2 text-[15px] p-2 rounded-[20px]">
                          <li>
                            <h1 className="flex">
                              {" "}
                              Date:
                              <h1 className="flex flex-row-reverse">
                                {" "}
                                {e.dateOfAppointment.split("T")[0]}
                              </h1>
                            </h1>
                          </li>

                          <li>
                            <h1 className="flex">
                              {" "}
                              Time:
                              <h1 className="flex flex-row-reverse">
                                {" "}
                                {e.dateOfAppointment.split("T")[1].slice(0, 5)}
                                {" "}IST
                              </h1>
                            </h1>
                          </li>
                          <li>
                            <h1 className="flex">
                              {" "}
                              Status:
                              <h1 className="flex flex-row-reverse">
                                {" "}
                                {e.status}
                              </h1>
                            </h1>
                          </li>
                          <li>Fees: {e.fees}</li>
                          <button
                            className="flex items-center justify-center w-4/5 bg-gray-200 mx-auto h-10 rounded-[40px] font-bold font-ubu hover:bg-gray-300 hover:scale-105 transition-all delay-100"
                            onClick={() =>
                              showDetails(e.createdBy, e.familyMember, e)
                            }
                          >
                            <Eye />
                            <span>Show Details and Continue</span>
                          </button>
                          <button
                            className="flex items-center justify-center w-4/5 bg-gray-200 mx-auto h-10 mt-2 rounded-[40px] font-bold font-ubu hover:bg-gray-300 hover:scale-105 transition-all delay-100"
                            onClick={() => viewPres(e.id)}
                          >
                            <Eye />
                            <span>View Prescription</span>
                          </button>
                          {view && details && viewId == e.id && showQr && (
                            <div className=" bg-[#C5D5E8] w-[400px] fixed top-[60px] z-20 rounded-lg items-center justify-center shadow-lg p-2">
                              <div className=" bg-white/70 rounded-lg justify-center px-2 overflow-x-clip ">
                                <ul className="flex flex-col items-center justify-center text-[15px]">
                                  <li>
                                    <img
                                      src={`${URL.createObjectURL(qr)}`}
                                      alt="Qr"
                                      className="h-[200px] w-[200px] m-2"
                                    />
                                  </li>
                                  <li className="w-full">{link}</li>
                                  <div>
                                    <li className="font-bold font-ubu text-[20px]">
                                      Consultation for{" "}
                                      {e.familyMember && details
                                        ? details.name
                                        : details.user
                                        ? details.user.name
                                        : ""}
                                    </li>
                                    <li className="flex items-center text-[16px] font-semibold">
                                      <div className="px-2">
                                        <Watch />
                                      </div>
                                      Age: {details.age}
                                    </li>
                                    <li className="flex text-[16px] font-semibold items-baseline mt-2">
                                      <div className="px-2">
                                        {" "}
                                        <Age />
                                      </div>
                                      Allergies:{" "}
                                      <ul className="flex flex-col items-baseline">
                                        {details.allergies && details.name &&
                                          details.allergies.map((allergy) => (
                                            <li>
                                              {allergy.allergy} reported by{" "}
                                              {allergy.reportedBy}
                                            </li>
                                          ))}
                                            {details.allergies && details.user && details.user.name &&
                                          details.allergies[0].map((allergy) => (
                                            <li>
                                              {allergy.allergy} reported by{" "}
                                              {allergy.reportedBy}
                                            </li>
                                          ))}
                                      </ul>
                                    </li>
                                  </div>
                                  <div className="flex">
                                    <button
                                      className="bg-gray-200 rounded-full p-2 m-2 hover:bg-gray-300 hover:scale-105 transition-all delay-100"
                                      onClick={() => setView(false)}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-6 h-6"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M6 18L18 6M6 6l12 12"
                                        />
                                      </svg>
                                    </button>
                                    <button
                                      className="bg-gray-200 rounded-full p-2 m-2 hover:bg-gray-300 hover:scale-105 transition-all delay-100"
                                      onClick={() =>
                                        navigate("/prescriptionForm", {
                                          state: { details: details, id: e.id },
                                        })
                                      }
                                    >
                                      Continue
                                    </button>
                                  </div>
                                </ul>
                              </div>
                            </div>
                          )}
                          {viewpres && viewpresId == e.id && (
                            <div className="fixed bg-white h-1/2 w-1/2 right-2 top-[100px] border rounded-lg p-1 border-5 z-20 font-ubu text-[20px] font-bold overflow-y-scroll">
                              <div className="flex w-full items-center justify-between h-10">
                                <text>Prescription</text>
                                <button onClick={() => setViewPres(false)}>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                </button>
                              </div>
                              {e.prescriptions &&
                            e.prescriptions.map((prescription)=>(
                              <ul className='flex flex-col'>
                                <li>
                                 Notes: {prescription.notes}
                                </li>
                                <li>Diagnosis: {prescription.diagnosis}</li>
                                <li>Drug Details: {prescription.drugDetails.map((drug)=>
                                <ul className='flex flex-col'>
                                  <li>Generic Name: {drug.genericName}</li>
                                  <li>Brand Name: {drug.brandName}</li>
                                  <li>Dosage in Mg: {drug.dosageInMg}</li>
                                  <li>Frequency: {drug.frequency}</li>
                                  <li>Duration: {drug.duration}</li>
                                  <li>First time or refill: {drug.firstTimeOrRefill}</li>
                                  <li>Substitution: {drug.substitutionAllowed}</li>



                                </ul>

                                )}</li>
                                <li>Tests: {prescription.labTests && prescription.labTests.map((test)=>
                                <ul className='flex flex-col'>
                                  <li>Test Type: {test.testType}</li>
                                </ul>)}</li>
                                
                              </ul>
                            ))
                          }
                                {!e.prescriptions && <div>No Prescriptions</div>}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
              </ul>
            </div>
            <div className=" py-2 w-4/5 mx-auto rounded-[91px] bg-white relative z-10 flex items-center justify-center mt-10">
              {" "}
              <text className="text-[20px] font-bold font-ubu">
                Past Consultation
              </text>
            </div>
            <div className="bg-[#C5D5E8] w-full mx-2 rounded-[60px] -mt-[60px] pt-[60px] overflow-y-scroll pb-10">
              <ul>
                {consultation &&
                  consultation.map((e) => (
                    <div>
                      {new Date() > new Date(e.dateOfAppointment) && (
                        <div className="bg-white m-2 text-[15px] p-2 rounded-[20px]">
                          <li>
                            <h1 className="flex">
                              {" "}
                              Date:
                              <h1 className="flex flex-row-reverse">
                                {" "}
                                {e.dateOfAppointment.split("T")[0]}
                              </h1>
                            </h1>
                          </li>

                          <li>
                            <h1 className="flex">
                              {" "}
                              Time:
                              <h1 className="flex flex-row-reverse">
                                {" "}
                                {e.dateOfAppointment.split("T")[1].slice(0, 5)}
                                IST
                              </h1>
                            </h1>
                          </li>
                          <li>Fees: {e.fees}</li>
                          <button
                            className="flex items-center justify-center w-4/5 bg-gray-200 mx-auto h-10 rounded-[40px] font-bold font-ubu hover:bg-gray-300 hover:scale-105 transition-all delay-100"
                            onClick={() =>
                              showDetails(e.createdBy, e.familyMember, e)
                            }
                          >
                            <Eye />
                            <span>Show Details and Continue</span>
                          </button>
                          <button
                            className="flex items-center justify-center w-4/5 bg-gray-200 mx-auto h-10 mt-2 rounded-[40px] font-bold font-ubu hover:bg-gray-300 hover:scale-105 transition-all delay-100"
                            onClick={() => viewPres(e.id)}
                          >
                            <Eye />
                            <span>View Prescription</span>
                          </button>
                          {view && details && viewId == e.id && showQr && (
                            <div className=" bg-[#C5D5E8] w-[400px] fixed top-[60px] z-20 rounded-lg items-center justify-center shadow-lg p-2">
                            <div className=" bg-white/70 rounded-lg justify-center px-2 overflow-x-clip ">
                              <ul className="flex flex-col items-center justify-center text-[15px]">
                                  <li>
                                    <img
                                      src={`${URL.createObjectURL(qr)}`}
                                      alt="Qr"
                                      className="h-[200px] w-[200px] m-2"
                                    />
                                  </li>
                                  <li className="w-full">{link}</li>
                                  <div>
                                    <li className="font-bold font-ubu text-[20px]">
                                      Consultation for{" "}
                                      {e.familyMember && details
                                        ? details.name
                                        : details.user
                                        ? details.user.name
                                        : ""}
                                    </li>
                                    <li className="flex items-center text-[16px] font-semibold">
                                      <div className="px-2">
                                        <Watch />
                                      </div>
                                      Age: {details.age}
                                    </li>
                                    <li className="flex text-[16px] font-semibold items-baseline mt-2">
                                      <div className="px-2">
                                        {" "}
                                        <Age />
                                      </div>
                                      Allergies:{" "}
                                      <ul>
                                      {details.allergies && details.name &&
                                          details.allergies.map((allergy) => (
                                            <li>
                                              {allergy.allergy} reported by{" "}
                                              {allergy.reportedBy}
                                            </li>
                                          ))}
                                            {details.allergies && details.user && details.user.name &&
                                          details.allergies[0].map((allergy) => (
                                            <li>
                                              {allergy.allergy} reported by{" "}
                                              {allergy.reportedBy}
                                            </li>
                                          ))}
                                      </ul>
                                    </li>
                                  </div>
                                  <div className="flex">
                                    <button
                                      className="bg-gray-200 rounded-full p-2 m-2 hover:bg-gray-300 hover:scale-105 transition-all delay-100"
                                      onClick={() => setView(false)}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-6 h-6"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M6 18L18 6M6 6l12 12"
                                        />
                                      </svg>
                                    </button>
                                    <button
                                      className="bg-gray-200 rounded-full p-2 m-2 hover:bg-gray-300 hover:scale-105 transition-all delay-100"
                                      onClick={() =>
                                        navigate("/prescriptionForm", {
                                          state: { details: details, id: e.id },
                                        })
                                      }
                                    >
                                      Continue
                                    </button>
                                  </div>
                                </ul>
                              </div>
                            </div>
                          )}
                          {viewpres && viewpresId == e.id && (
                            <div className="fixed bg-white h-1/2 w-1/2 right-2 top-[100px] border rounded-lg p-1 border-5 z-20 font-ubu text-[20px] font-bold overflow-y-scroll">
                              <div className="flex w-full items-center justify-between h-10">
                                <text>Prescription</text>
                                <button onClick={() => setViewPres(false)}>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                </button>
                              </div>
                              {e.prescriptions &&
                            e.prescriptions.map((prescription)=>(
                              <ul className='flex flex-col'>
                                <li>
                                 Notes: {prescription.notes}
                                </li>
                                <li>Diagnosis: {prescription.diagnosis}</li>
                                <li>Drug Details: {prescription.drugDetails.map((drug)=>
                                <ul className='flex flex-col'>
                                  <li>Generic Name: {drug.genericName}</li>
                                  <li>Brand Name: {drug.brandName}</li>
                                  <li>Dosage in Mg: {drug.dosageInMg}</li>
                                  <li>Frequency: {drug.frequency}</li>
                                  <li>Duration: {drug.duration}</li>
                                  <li>First time or refill: {drug.firstTimeOrRefill}</li>
                                  <li>Substitution: {drug.substitutionAllowed}</li>



                                </ul>

                                )}</li>
                                <li>Tests: {prescription.labTests && prescription.labTests.map((test)=>
                                <ul className='flex flex-col'>
                                  <li>Test Type: {test.testType}</li>
                                </ul>)}</li>
                                
                              </ul>
                            ))
                          }
                          {!e.prescriptions && <div>No Prescription</div>}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
