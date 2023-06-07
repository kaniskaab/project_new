import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import PatientDetails from './PatientDetails'
function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <PatientDetails/>
  );
}