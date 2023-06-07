import React, { useState } from 'react';
// details=Details[0];
const AllergyForm = () => {
  const [allergy, setAllergy] = useState('');
  const [allergiesList, setAllergiesList] = useState([]);

  const handleInputChange = (event) => {
    setAllergy(event.target.value);
  };

  const handleAddAllergy = () => {
    if (allergy.trim() === '') return;

    const newAllergy = {
      id: new Date().getTime(),
      name: allergy,
    };

    setAllergiesList([newAllergy, ...allergiesList]);
    setAllergy('');
  };

  const handleSaveToLocalStorage = () => {
    const updatedDetails = {
      ...localStorage.getItem('Details'),
      allergies: allergiesList,
    };
    localStorage.setItem('Details', JSON.stringify(updatedDetails));
  };

  return (
    <div>
      <input
        type="text"
        value={allergy}
        onChange={handleInputChange}
        placeholder="Enter allergy"
      />
      <button onClick={handleAddAllergy}>Add</button>
      <button onClick={handleSaveToLocalStorage}>Save Changes</button>
      <ul>
        {allergiesList.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AllergyForm;