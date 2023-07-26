import React, { useState } from 'react';
import Header from './Header';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useEffect } from 'react';
const PrescriptionForm = () => {
    const location=useLocation();
    const [details,setDetails]=useState({});
    const [id,setId]=useState(0);

  const [prescription, setPrescription] = useState({
    notes: '',
    diagnosis: '',
    drugDetails: [
      {
        genericName: '',
        brandName: '',
        dosageInMg: 0,
        frequency: 0,
        duration: 0,
        firstTimeOrRefill: '',
        substitutionAllowed: true,
      },
    ],
    labTests: [{ testType: '' }],
  });
  useEffect(()=>
  {
    setDetails(location.state.details);
    setId(location.state.id);

  },[])

  const handleInputChange = (e, index, section) => {
    const { name, value } = e.target;
    const updatedPrescription = { ...prescription };

    if (section === 'drugDetails') {
      updatedPrescription.drugDetails[index][name] = value;
    } else if (section === 'labTests') {
      updatedPrescription.labTests[index][name] = value;
    } else {
      updatedPrescription[name] = value;
    }

    setPrescription(updatedPrescription);
  };

  const handleSubmit = () => {
    // Replace this with the actual consultation ID
    console.log(prescription);
    fetch(`${process.env.REACT_APP_BASE_URL}/api/consultations/${id}/prescription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prescription),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Handle success response if needed
        console.log('Prescription submitted successfully:', data);
      })
      .catch((error) => {
        // Handle error if needed
        console.error('Error submitting prescription:', error);
      });
  };

  const addDrugDetails = () => {
    setPrescription({
      ...prescription,
      drugDetails: [...prescription.drugDetails, { genericName: '', brandName: '', dosageInMg: 0, frequency: 0, duration: 0, firstTimeOrRefill: '', substitutionAllowed: true }],
    });
  };

  const addLabTest = () => {
    setPrescription({
      ...prescription,
      labTests: [...prescription.labTests, { testType: '' }],
    });
  };

  return (
    <div className="overflow-x-clip">
      <Header/>
      <div className='flex'>
        <Sidebar/>
      </div>
      <div className="ml-[350px] mt-[75px] flex flex-col">
        
<div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Prescription Form</h1>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Notes:</label>
        <textarea
          name="notes"
          value={prescription.notes}
          onChange={(e) => handleInputChange(e)}
          className="w-full h-20 p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Diagnosis:</label>
        <input
          type="text"
          name="diagnosis"
          value={prescription.diagnosis}
          onChange={(e) => handleInputChange(e)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Drug Details:</label>
        {prescription.drugDetails.map((drug, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              name="genericName"
              value={drug.genericName}
              onChange={(e) => handleInputChange(e, index, 'drugDetails')}
              className="flex-1 p-2 mr-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Generic Name"
            />
            <input
              type="text"
              name="brandName"
              value={drug.brandName}
              onChange={(e) => handleInputChange(e, index, 'drugDetails')}
              className="flex-1 p-2 mr-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Brand Name"
            />
            <input
              type="number"
              name="dosageInMg"
              value={drug.dosageInMg}
              onChange={(e) => handleInputChange(e, index, 'drugDetails')}
              className="w-24 p-2 mr-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Dosage in mg"
            />
            <button
              onClick={() => {
                const updatedDrugDetails = [...prescription.drugDetails];
                updatedDrugDetails.splice(index, 1);
                setPrescription({ ...prescription, drugDetails: updatedDrugDetails });
              }}
              className="px-2 py-1 bg-red-500 text-white rounded-lg"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addDrugDetails}
          className="px-4 py-2 mt-2 bg-blue-500 text-white rounded-lg"
        >
          Add Drug
        </button>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Lab Tests:</label>
        {prescription.labTests.map((test, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              name="testType"
              value={test.testType}
              onChange={(e) => handleInputChange(e, index, 'labTests')}
              className="flex-1 p-2 mr-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Test Type"
            />
            <button
              onClick={() => {
                const updatedLabTests = [...prescription.labTests];
                updatedLabTests.splice(index, 1);
                setPrescription({ ...prescription, labTests: updatedLabTests });
              }}
              className="px-2 py-1 bg-red-500 text-white rounded-lg"
            >
              Remove
            </button>
          </div>
        ))}
        <button onClick={addLabTest} className="px-4 py-2 mt-2 bg-blue-500 text-white rounded-lg">
          Add Lab Test
        </button>
      </div>

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-500 text-white rounded-lg"
      >
        Submit Prescription
      </button>
    </div>
        </div>

        </div>
      
    
  );
};

export default PrescriptionForm;



