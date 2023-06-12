import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [members, setMembers] = useState([]);
  const[id,setId]=useState(0);

  //CHANGE TOKEN 
  const refreshToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoiYW5vdGhlcnRvbmV5MkBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NjU2OTI2NiwiZXhwIjoxNjg2NTcyODY2LCJhdWQiOiJsb2NhbGhvc3Q6ODAwMCIsImlzcyI6ImxvY2FsaG9zdDo4MDAwIn0.T2mJnjA9FcSXFDFKTHXX3lch3kEoY_A4rxDQm5uBcPw'
         useEffect(() => {
  //FETCHING ALL MEMBERS FROM THE API
    const fetchData = async () => {
      try {
        //CHANGE FETCH LINK ACCORDINGLY
        const response = await fetch('http://[::1]:3333/api/members', {
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
    <UserContext.Provider value={{members,id,setId}}>
      {children}
    </UserContext.Provider>
  );
};
