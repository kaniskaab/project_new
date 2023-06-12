import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name,setName]=useState('');
    const [username,setUsername]=useState('')
    var doctor={};
    var member ={};
    var role ='';

    const port = 1330;
   
  async function handleSubmit(event)
  {
    event.preventDefault()
    const lnk = `http://[::1]:3333/api/auth/register`
    const response = await fetch(lnk,{
       method:'POST',
    headers:
        {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(
           {name, username, password,email, member

          // "member": {
          //   "userId": 0,
          //   "age": 0,
          //   "gender": "string",
          //   "govtId": "string",
          //   "allergies": [
          //     {}
          //   ],
          //   "planCoverage": {
          //     "start": "string",
          //     "end": "string",
          //     "employerId": "string",
          //     "employeeId": "string",
          //     "coveredAdults": 0,
          //     "coveredChildren": 0
          //   }
          // },
          // "doctor": {},
          // "name": "string",
          // "username": "string12",
          // "email": "string3@gmail.com",
          // "password": "string",
          // "role": "string"
        }
        )
       
  });

    const data = await response.json();
    console.log(data.message);
    alert(`your unique id is ${data.message}`);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid item xs={12} sm={6}>
              <Grid item xs={12}>
                <TextField
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                </Grid>

                <Grid item xs={12}>
                <TextField     
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="type"
                label="User Name"
                type="text"
                id="username"
                autoComplete="username"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                 value={name}
                 onChange={(e)=>setName(e.target.value)}
                  required
                  fullWidth
                  name="name"
                  label="Name"
                  type="name"
                  id="password"
                  autoComplete="name"
                />
              </Grid>

            </Grid>
             <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            </Box>
           
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
           
          </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}