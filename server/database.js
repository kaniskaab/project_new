const axios = require('axios');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password:'kaniskaa',
    host: 'localhost',
    port: 2000, // the port number of your PostgreSQL server
    database:'login_system'
  });

//   async function postUser(username, password) {
//     try {
//       // Construct the POST data
//       const postData = {
//         username,
//         password,
//       };
      
//       // Make the POST request using axios
//       const response = await axios.post('http://localhost:2000/api/users', postData);
      
//       console.log('User posted successfully:', response.data);
//     } catch (error) {
//       console.error('Error posting user:', error);
//     }
//   }

//   module.exports= postUser

//   const createTblQry = `CREATE TABLE accounts(
//     user_id serial PRIMARY KEY,
//     username VARCHAR (50) UNIQUE NOT NULL,
//     password VARCHAR (50) UNIQUE NOT NULL
//   );`


//   pool.query(createTblQry).then((response)=>{
//     console.log("Database created")
//     console.log(response)
//   })
//   .catch((err)=>{
//     console.log(err)

//   });

  module.exports = pool

//   async function postUser(username, password, userType) {
//     try {
//       // Construct the POST data
//       const postData = {
//         username,
//         password,
//         userType,
//       };
      
//       // Make the POST request using axios
//       const response = await axios.post('http://localhost:2000/api/users', postData);
      
//       console.log('User posted successfully:', response.data);
//     } catch (error) {
//       console.error('Error posting user:', error);
//     }
//   }
  
  