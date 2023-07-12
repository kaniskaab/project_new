import React, { useState, useEffect } from "react";
import { Button, Typography, Container, Paper, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
export default function Doctor() {
  const navigate = useNavigate();
  const[details, setDetails]=useState([])
  const refreshToken = localStorage.getItem("token");
  const id = Number(localStorage.getItem("id"));
  const [consultation, setConsultation] = useState([]);
  console.log(id);
  const [doctor, setDoctor] = useState([]);
  const [data, setData] = useState("");
  const[view,setView]=useState(false)
  const[viewId,setViewId]=useState()
  const[link,setLink]=useState('');
  const[qr,setQr]=useState('');
  const[showQr, setShowQr]=useState(false);
  const [qrViewId, setQrViewId]=useState(false);
  console.log(refreshToken)
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

  const viewConsultation =async (newId)=>
  {
try{
  console.log(newId)

  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/consultations/find/${newId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );
  console.log(response)

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  const userData = await response.json();
  console.log(userData);


}catch(err){console.log(err)}
  }

  const showDetails=async (id, fmId,e)=>{
    try{
    setViewId(e.id)
    setDetails([]);
      if(fmId){
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
        const data= await response.json();
        setDetails((data.filter((e)=>e.id==fmId.id))[0])
        // console.log(data[0])

      }
      else{
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
        const data= await response1.json();
        setDetails(data)
        console.log(data)
      }
      setView(true)


    }catch(err){console.log(err)}
  }


  const getQr = async (id, docId)=>
  {
   try{
     setQrViewId(id)
            const response2 = await fetch(
         `${process.env.REACT_APP_BASE_URL}/api/consultations/${id}/qrcode`,
         {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
             'Accept': 'application/json',
             Authorization: `Bearer ${refreshToken}`,
           },
         }
       );

       console.log(response2)

       const data =await response2.blob();
       console.log(data);
       setQr(data)
       setShowQr(true)



       const response1 = await fetch(
         `${process.env.REACT_APP_BASE_URL}/api/consultations/${id}/link`,
         {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
             'Accept': 'application/json',
             Authorization: `Bearer ${refreshToken}`,
           },
         }
       );
       const url =await response1.json();
       setLink(url.url)
       

   }
       catch(err){
           console.log(err)
       }

  }
console.log(details)
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={3}>
            <div className="-ml-20">
              <Sidebar />
            </div>
          </Grid>
          <Grid item xs={9}>
            <Paper
              elevation={3}
              style={{
                padding: "16px",
                backgroundColor: "#fff",
              }}
            >
              <Typography variant="h4" align="center">
                Welcome Doctor {data.name}
              </Typography>
              <Typography variant="h5" align="center">
                General Information
              </Typography>
              <Typography variant="body1" align="center">
                License Number: {doctor.licenseNumber}
              </Typography>
              <Typography variant="body1" align="center">
                Specialization: {doctor.specialization}
              </Typography>
              {/* <Typography variant="body1" align="center">
                Age: {data.age}
              </Typography> */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "16px",
                }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ marginRight: "8px" }}
                >
                  Show Consultation
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    navigate("/editDoctorDetails");
                  }}
                  style={{ marginRight: "8px" }}
                >
                  Edit
                </Button>
                {/* <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    navigate("/viewAllergies");
                  }}
                >
                  Allergies
                </Button> */}
              </div>
            </Paper>
            <Paper
              elevation={0}
              style={{
                marginTop: "16px",
                backgroundColor: "#fff",
                padding: "16px",
              }}
            >
              <Button fullWidth variant="contained" color="primary">
                Upcoming Consultations
              </Button>
              <ul>
                {console.log(consultation)}
                {consultation &&
                  consultation.map((e) => (
                    <div>
                      {new Date() < new Date(e.dateOfAppointment) && (
                        <li key={e.code} style={{ marginBottom: "16px" }}>
                          <Paper
                            elevation={3}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "16px",
                              backgroundColor: "#fff",
                            }}
                          >
                            <div>
                              <div className="flex items-center">
                                <AssignmentIndIcon />
                                <Typography variant="h6">{}</Typography>
                              </div>
                              <Typography variant="body1">
                                Consultation Code: e{e.code}
                              </Typography>
                              <Typography variant="body1">
                                Fees: {e.fees}
                              </Typography>
                              <Typography variant="body1">
                                <h1 className="flex">
                                  {" "}
                                  Date:
                                  <h1 className="flex flex-row-reverse">
                                    {" "}
                                    {e.dateOfAppointment.split("T")[0]}
                                  </h1>
                                </h1>
                                <h1 className="flex">
                                  {" "}
                                  Time:
                                  <h1 className="flex flex-row-reverse">
                                    {" "}
                                    {e.dateOfAppointment
                                      .split("T")[1]
                                      .slice(0, 5)}
                                    IST
                                  </h1>
                                </h1>

                              </Typography>
                              {details && console.log(details[0])}                            
                                {view  && details &&  viewId==e.id &&
                              <Typography variant="body1">
                                <div>Name:{e.familyMember && details?details.name:(details.user)?details.user.name:""}</div>
                                {console.log(details)}
                               <div>Age: {details.age}</div>
                               <div>Allergies: <ul>{ details.allergies &&  details.allergies.map((allergy)=><li>{allergy.allergy} reported by {allergy.reportedBy}</li>)}</ul></div>

                              </Typography>
                              
                              }
                                  {showQr && e.id===qrViewId &&<><img src={`${URL.createObjectURL(qr)}`} alt="Qr" className='h-[200px] w-[200px]'/> <h1 className='text-[15px] text-blue-500'>Link: {link}</h1></>}

                            </div>
                            <div>
                              <Button
                                variant="outlined"
                                color="primary"
                                 onClick={() => showDetails(e.createdBy,e.familyMember,e)}
                                style={{ marginRight: "8px" }}
                              >
                                View More
                              </Button>
                              <Button onClick={()=>getQr(e.id, e.doctor.id)}>Show QR and Link</Button>

                            </div>
                          </Paper>
                        </li>
                      )}
                    </div>
                  ))}
              </ul>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
