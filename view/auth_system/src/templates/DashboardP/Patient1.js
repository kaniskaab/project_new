import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TextField, Container } from "@mui/material";
import { useState} from "react";
import AddMember from "./AddMember";
import DetailPage from "./DetailPage";
import Title from "./Title";
import { useNavigate, useLocation } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function Patient1() {

  const location = useLocation();



const [members,setMembers]=useState(location.state.members)

const allMember = members.filter((member)=>
(
  member.user.id===location.state.data.user.id
))   

const val = String(location.state.data.user.name)

  const familyMembers = allMember[0].familyMembers
  console.log(allMember[0])
  const handleSubmit = (event) => {
    const value = event;
    const mainId= allMember[0].id;
    navigate('/memberDetails',{state:{value,familyMembers,mainId}});
  };




  //CHANGE TO VALID TOKEN
  const refreshToken =process.env.REACT_APP_REFRESH_TOKEN

// GET REQUEST TO GET ALL MEMBERS
  const userSubmit=async()=>
  {
    try {
      //CHANGE FETCH LINK ACCORDINGLY
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/members/${allMember[0].id}`, {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`,
          // Add other headers as needed
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
  }

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navigate=useNavigate();
 

  //DELETE A  FAMILY MEMBER
 const handleDelete = async (id)=>{
  try {
    //CHANGE FETCH LINK ACCORDINGLY
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/members/${allMember[0].id}/family-member/${id}`, {
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${refreshToken}`,
        // Add other headers as needed
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete');
    }

    const data = await response.json();
    console.log(data)
    alert('Member Deleted')
  } catch (error) {
    console.error('An error occurred while fetching user data:', error);
  }

 }

 //DELETE USER
 const deleteUser=async ()=>{
  try {
    //CHANGE FETCH LINK ACCORDINGLY
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/members/${allMember[0].id}`, {
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${refreshToken}`,
        // Add other headers as needed
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete');
    }

    const data = await response.json();
    console.log(data)
    alert('Member Deleted')
  } catch (error) {
    console.error('An error occurred while fetching user data:', error);
  }
 }





//DONE TO PATCH USER DETAILS



 const [name, setName] = useState('');
 const [username, setUsername] = useState('');
 const [email, setEmail] = useState('');
 const [role, setRole] = useState('');
  const [data, setData]= useState('');

 const handlesubmit = () => {
  //GETTING INITIAL DETAILS
  //CHANGE FETCH LINK ACCORDINGLY
   fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${location.state.data.user.id}/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${refreshToken}`,
    }
  })
    .then(response => {
      if (response.ok) {
        setData(response.json())
      } else {
        alert('Failed to update profile.');
      }
    })
    .catch(error => {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile.');
    });
};

//UPDATING ALL EXCEPT MEMBERS AND DOCTORS
 
const requestBody = {
  name: name,
  username: username,
  email: email,
  role: role,
  member: data.member,
  doctor: data.doctor
};

//PATCHING
//CHNAGE FETCH LINK ACCORDINGLY
   fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${location.state.data.user.id}/profile`, {
     method: 'PATCH',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${refreshToken}`,
     },
     body: JSON.stringify(requestBody)
   })
     .then(response => {
       if (response.ok) {
         alert('Profile updated successfully!');
       } else {
         alert('Failed to update profile.');
       }
     })
     .catch(error => {
       console.error('Failed to update profile:', error);
       alert('Failed to update profile.');
     });
  
  
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            Welcome {val}!
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
        <DetailPage id={allMember[0].id} />

        <Grid
          container
          // display="flex"
          justifyContent="center"
          // minHeight="100vh"
        >
          <Box sx={{ width: "70%" }}>
            <Title>
              <Typography
                variant="h5"
                align="center"
                fontWeight="bold"
                sx={{ marginTop: "20px" }}
              >
                Add Member Details or Book New Consultation
              </Typography>
            </Title>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12}>
                <Item>
                  <AddMember value={allMember[0].id} />
                </Item>
              </Grid>
              <Grid item xs={12}
            marginTop={2}
            textAlign="center"
        >
          <Title>
            <Typography variant="h4" align="center" fontWeight="bold" sx={{ marginTop: '20px' }}>
                Update Details
            </Typography>
          </Title>
      <Container>
      <h1>User Profile</h1>
      <div>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <Button variant="contained" onClick={handlesubmit}>
          Update Profile
        </Button>
      </div>
    </Container>
        </Grid> 
        <Grid item xs={6}>
        <Button onClick={deleteUser}>
          Delete account?
        </Button>
        </Grid>
            </Grid>
          </Box>
        </Grid>
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          <Button onClick={userSubmit}>
            Update Users
          </Button>
        
          {allMember[0].familyMembers.map((member) => (
              <ListItem key={member.id} disablePadding>
                <ListItemButton onClick={()=>{handleSubmit(member.id)}}>
                  <ListItemIcon>
                    {member.id % 2 === 0 ? (
                      <AccountCircleIcon />
                    ) : (
                      <AccountCircleIcon />
                    )}
                  </ListItemIcon>
                     <ListItemText primary={member.name} />
                     <Button onClick={()=> handleDelete(member.id)}>
                          Delete
                          </Button>
                </ListItemButton>
              </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
