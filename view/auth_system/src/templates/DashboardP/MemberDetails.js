

import * as React from 'react';
import {useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { Grid, TextField, Button, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Details from './Details.json'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DetailPage from './DetailPage';
import Title from './Title';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function PersistentDrawerRight() {

    // const [memberDetails, setMemberDetails] = useState({
    //     name: 'John Doe',
    //     age: '',
    //     height: '',
    //     weight: '',
    //     allergies: ['Allergy 1'],
    //     prescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    //   });

      const [formData, setFormData] = useState({
        name: '',
        age: '',
        height: '',
        weight: '',
        allergies: ['Allergy 1'],
        prescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      });
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleUpdate = () => {
        console.log('Form Data:', formData);
      };
      

          // const handleInputChange = (event) => {
          //   const { name, value } = event.target;
          //   setMemberDetails((prevMemberDetails) => ({
          //     ...prevMemberDetails,
          //     [name]: value,
          //   }));
          // };
        
          // const handleUpdateDetails = () => {
          //   console.log(memberDetails);
          // };

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const member = Details
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
           Member #
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
    <Box 
    >
      <Typography variant="h4" align='center'>Member Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} >
        <DetailPage/>
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
          <Box
      sx={{
        backgroundColor: '#C9D1D5',
        borderRadius: '15px',
        p: 2,
        maxWidth: '80%',
        margin: '0 auto',
        marginBottom:'20px'
      }}
    >
      <form>
        <TextField
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          name="age"
          label="Age"
          value={formData.age}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          name="height"
          label="Height"
          value={formData.height}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          name="weight"
          label="Weight"
          value={formData.weight}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update
        </Button>
      </form>
    </Box>
          
            
        {/* </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            name="name"
            value={memberDetails.name}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Age"
            name="age"
            value={memberDetails.age}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Height"
            name="height"
            value={memberDetails.height}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Weight"
            name="weight"
            value={memberDetails.weight}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>  
         <Grid item xs={12} spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button variant="outlined" onClick={handleUpdateDetails}>
            Update Details
          </Button>
        </Grid>*/}
        </Grid> 
      </Grid>
      <Box sx={{backgroundColor:"#C9D1D5" , borderRadius:"15px" , padding:"10px"}}>
        <Title>
            <Typography variant="h4" align="center" fontWeight="bold" sx={{ marginTop: '20px' }}>
                Prescription
            </Typography>
          </Title>
      <Box style={{ padding: '16px', marginTop: '16px' }}>
        <Typography variant="body1">{formData.prescription}</Typography>
      </Box>
      </Box>
      
    </Box>
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
       <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
          {member.map((member) => (
            <ListItem key={member.id} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {member.id % 2 === 0 ? <AccountCircleIcon /> : <AccountCircleIcon />}
                </ListItemIcon>
                <ListItemText primary={member.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}