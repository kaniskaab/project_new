import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [members, setMembers] = useState([]);
  const[id,setId]=useState(0);

  //CHANGE TOKEN
  const refreshToken = localStorage.getItem('token')
        useEffect(() => {
  //FETCHING ALL MEMBERS FROM THE API
    const fetchData = async () => {
      try {
        //CHANGE FETCH LINK ACCORDINGLY
        console.log(process.env.REACT_APP_BASE_URL)
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/members`, {
          method:'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${refreshToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data.');
        }

        const userData = await response.json();
        setMembers(userData);
        console.log(userData);
      } catch (error) {
        console.error('An error occurred while fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{members}}>
      {children}
    </UserContext.Provider>
  );
};
