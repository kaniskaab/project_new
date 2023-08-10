import React, { useState } from "react";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import Allergy from "../../svg/Allergy";
import Age from "../../svg/Age";
import Key from "../../svg/Key";
import Remove from "../../svg/Remove";
import Watch from "../../svg/Watch";
const PrescriptionForm = () => {
  const location = useLocation();
  const [details, setDetails] = useState({});
  const [id, setId] = useState(0);
  const refreshToken = localStorage.getItem("token");
const[verify,setVerify]=useState();
  const [prescription, setPrescription] = useState({
    notes: "",
    diagnosis: "",
    drugDetails: [
      {
        genericName: "",
        brandName: "",
        dosageInMg: 0,
        frequency: 0,
        duration: 0,
        firstTimeOrRefill: "",
        substitutionAllowed: true,
      },
    ],
    labTests: [{ testType: "" }],
  });
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPopUp, setShowPopUp]=useState(false);

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };
  useEffect(() => {
    setDetails(location.state.details);
    setId(location.state.id);
    console.log(location.state.details);
  }, []);
  const handleVerify = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/consultations/${id}/prescription/${verify.id}/verify`, {
        method: 'POST',
        body: JSON.stringify({ "otpCode": otp }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(otp)
      if (response.ok) {
        setMessage('Prescription verified');
      } else {
        setMessage('Verification failed');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e, index, section) => {
    const { name, value } = e.target;
    const updatedPrescription = { ...prescription };

    if (section === "drugDetails") {
      updatedPrescription.drugDetails[index][name] = value;
    } else if (section === "labTests") {
      updatedPrescription.labTests[index][name] = value;
    } else {
      updatedPrescription[name] = value;
    }

    setPrescription(updatedPrescription);
  };

  const handleSubmit = () => {
    // Replace this with the actual consultation ID
    console.log(prescription);
    // setVerify(prescription)
    fetch(
      `${process.env.REACT_APP_BASE_URL}/api/consultations/${id}/prescription`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
        body: JSON.stringify(prescription),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle success response if needed
        console.log("Prescription submitted successfully:", data);
        setVerify(data);
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error submitting prescription:", error);
      });
  };

  const addDrugDetails = () => {
    setPrescription({
      ...prescription,
      drugDetails: [
        ...prescription.drugDetails,
        {
          genericName: "",
          brandName: "",
          dosageInMg: 0,
          frequency: 0,
          duration: 0,
          firstTimeOrRefill: "",
          substitutionAllowed: true,
        },
      ],
    });
  };

  const addLabTest = () => {
    setPrescription({
      ...prescription,
      labTests: [...prescription.labTests, { testType: "" }],
    });
  };


  return (
    <div className="overflow-x-clip">
      <Header />
      <div className="flex">
        <Sidebar />
      </div>
      <div className="ml-[350px] mt-[75px] flex">
      <div className="w-2/5 bg-white mt-[75px] rounded-[22px] overflow-y-scroll">
        <div className="flex w-full items-center justify-center font-ubu text-[20px]">Details for: {details.user? <h1>{details.user.name}</h1>:<h1>{details.name}</h1>}</div>
        <ul className="flex flex-col p-5 justify-around text-[15px] leading-[40px]">
          <li className="flex items-center">
            <Allergy/><text className="px-2">Gender:</text> <text className="pl-2">{details.gender}</text>
          </li>
          {/* <li className="flex items-center">
            <Key/><text className="px-2">Government Id:</text> <text className="pl-2">{data.govtId}</text>
          </li> */}
          <li className="flex items-center">
            <Watch/> <text className="px-2">Age:</text> <text className="pl-2">{details.age}</text>
          </li>
          <li className="flex items-baseline">
            <div className="flex items-center"><Age/> <text className="px-2">Allergy:</text></div>
              <ul className="">
              {details.allergies && details.allergies.map((allergy)=>
                
                <li>{allergy.allergy} reported by {allergy.reportedBy}</li>
              )}
              </ul>
          </li>
        </ul>
        <div className="flex items-center justify-center text-center font-mono text-[15px]">
      {verify && <div className="">
         <ul>
          <li>Status: {verify.status}</li>
          <li>Notes: {verify.notes}</li>
          <li>Diagnosis: {verify.diagnosis}</li>
          <li>Drug Details: {verify.drugDetails.map((drug)=>
          <ul>
            <li>Generic Name: {drug.genericName}</li>
            <li>Brand Name: {drug.brandName}</li>
            <li>Dosage in Mg: {drug.dosageInMg}</li>
            <li>Frequency: {drug.frequency}</li>
            <li>Duration: {drug.duration}</li>
            <li>First Time Or Refill: {drug.firstTimeOrRefill}</li>
            <li>Substitution Allowed: {drug.substitutionAllowed}</li>


          </ul>)}</li>



          <li>Lab Tests: {verify.labTests.map((test)=>
          <ul>
            <li>Test Type: {test.testType}</li>
          </ul>)}</li>
         </ul>
         <button
            onClick={()=>setShowPopUp(true)}
            className="px-4 py-2 bg-gray-200 rounded-lg w-full font-bold hover:scale-105 hover:bg-gray-300 transition-all delay-100 my-5"
          >
            Verify Subscription
          </button>
        </div>}

      </div>
      { showPopUp &&  <div className="fixed inset-0 flex justify-center items-center z-10 bg-gray-500 bg-opacity-50">
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-80">
        <span className="flex justify-between">
        <h2 className="text-lg font-semibold mb-4">OTP Verification</h2>
            <button onClick={()=>setShowPopUp(false)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg></button>
        </span>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={handleOtpChange}
          className="border border-gray-300 rounded-md p-2 w-full mb-4"
        />
        <button
          onClick={handleVerify}
          className="bg-gray-700 text-white px-4 py-2 rounded-md w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify OTP'}
        </button>
        {message && <p className="mt-4 text-gray-600">{message}</p>}
      </div>
    </div>}
      </div>
      
      

        <div className="p-8 w-3/5 overflow-y-scroll h-screen">
          <h1 className="text-2xl font-bold mb-4 font-ubu text-center text-[20px]">Prescription Form</h1>

          <div className="mb-4">
            <label className="block mb-2 text-[15px] font-mono font-thin">Notes:</label>
            <textarea
              name="notes"
              value={prescription.notes}
              onChange={(e) => handleInputChange(e)}
              className="w-full h-20 p-2 border rounded-lg focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-[15px] font-mono font-thin">Diagnosis:</label>
            <input
              type="text"
              name="diagnosis"
              value={prescription.diagnosis}
              onChange={(e) => handleInputChange(e)}
              className="w-full p-2 border rounded-lg focus:outline-none "
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-[15px] font-mono font-thin">Drug Details:</label>
            {prescription.drugDetails.map((drug, index) => (
              <div key={index} className="flex flex-col mb-2">
                <input
                  type="text"
                  name="genericName"
                  value={drug.genericName}
                  onChange={(e) => handleInputChange(e, index, "drugDetails")}
                  className="flex-1 p-2 mr-2 border rounded-lg my-2"
                  placeholder="Generic Name"
                />
                <input
                  type="text"
                  name="brandName"
                  value={drug.brandName}
                  onChange={(e) => handleInputChange(e, index, "drugDetails")}
                  className="flex-1 p-2 mr-2 border rounded-lg focus:outline-none my-2"
                  placeholder="Brand Name"
                />
               
                <div className="flex items-center w-full justify-between">
                <input
                  type="number"
                  name="dosageInMg"
                  onChange={(e) => handleInputChange(e, index, "drugDetails")}
                  className="w-[120px] p-2 mr-2 border rounded-lg focus:outline-none my-2"
                  placeholder="Dosage mg"
                />
                <input
                  type="number"
                  name="frequency"
                  onChange={(e) => handleInputChange(e, index, "drugDetails")}
                  className="w-[120px] p-2 mr-2 border rounded-lg focus:outline-none my-2"
                  placeholder="Frequency"
                />
                <input
                  type="number"
                  name="duration"
                  onChange={(e) => handleInputChange(e, index, "drugDetails")}
                  className="w-[120px] p-2 mr-2 border rounded-lg focus:outline-none my-2"
                  placeholder="Duration"
                />
                </div>
                
                <input
                  type="text"
                  name="firstTimeOrRefill"
                  value={drug.firstTimeOrRefill}
                  onChange={(e) => handleInputChange(e, index, "drugDetails")}
                  className="flex-1 p-2 mr-2 border rounded-lg focus:outline-none my-2"
                  placeholder="First Time or Refill"
                />
                <select
                  name="substitutionAllowed"
                  value={drug.substitutionAllowed}
                  onChange={(e) => handleInputChange(e, index, "drugDetails")}
                  className="w-24 p-2 mr-2 border rounded-lg focus:outline-none my-2"
                >
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </select>
              <div>

              </div>
                <button
                  onClick={() => {
                    const updatedDrugDetails = [...prescription.drugDetails];
                    updatedDrugDetails.splice(index, 1);
                    setPrescription({
                      ...prescription,
                      drugDetails: updatedDrugDetails,
                    });
                  }}
                  className="px-2 py-1 rounded-full bg-gray-200 w-10 h-10 hover:scale-105 hover:bg-gray-300 transition-all delay-200"
                >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

                </button>
              </div>
            ))}
            <button
              onClick={addDrugDetails}
              className="-mt-10 bg-gray-200 h-10 w-10 flex items-center justify-center text-white rounded-full ml-auto hover:scale-105 hover:bg-gray-300 transition-all delay-200"
            >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

            </button>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-thin font-mono text-[15px]">Lab Tests:</label>
            {prescription.labTests.map((test, index) => (
              <div key={index} className="flex mb-2 flex-col">
                <input
                  type="text"
                  name="testType"
                  value={test.testType}
                  onChange={(e) => handleInputChange(e, index, "labTests")}
                  className="flex-1 p-2 mr-2 border rounded-lg focus:outline-none"
                  placeholder="Test Type"
                />
                <button
                  onClick={() => {
                    const updatedLabTests = [...prescription.labTests];
                    updatedLabTests.splice(index, 1);
                    setPrescription({
                      ...prescription,
                      labTests: updatedLabTests,
                    });
                  }}
                  className="rounded-full mt-2 bg-gray-200 h-10 w-10 flex items-center justify-center hover:scale-105 hover:bg-gray-300 transition-all delay-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
                </button>
              </div>
            ))}
            <button
              onClick={addLabTest}
              className=" -mt-10 bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center hover:scale-105 hover:bg-gray-300 transition-all delay-200 ml-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-gray-200 rounded-lg w-full font-bold hover:scale-105 hover:bg-gray-300 transition-all delay-100"
          >
            Submit Prescription
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionForm;
