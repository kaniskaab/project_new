import React, { useState, useContext } from 'react';
import { UserContext } from '../../context.js/UserContext';
const AutoSuggestionBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
    const {doctors} = useContext(UserContext)
    console.log(doctors)
    const [suggestions, setSuggestions] = useState([]);


  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    const filteredItems = doctors.filter(item =>
        item.user.name.toLowerCase().includes(value.toLowerCase())
      );
      console.log(filteredItems);
      setSuggestions(filteredItems);
    };

  const handleSuggestionClick = (selectedResult) => {
    console.log('Selected Result:', selectedResult);
    setSuggestions(null)
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <ul>
        {/* {console.log(suggestions)} */}
        {(suggestions.length===0)?<></>:suggestions.map((user) => (
          <li key={user.id} onClick={() => handleSuggestionClick(user)}>
           {user.user.name} specialized in {user.specialization}
          </li>
        )) }
      </ul>
    </div>
  );
};

export default AutoSuggestionBox;
