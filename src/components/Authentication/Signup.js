import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@material-ui/core/Box';
import {TextField} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { CryptoState } from '../../CryptoContext';
import axios from 'axios'

const Signup = ({handleClose}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const {setAlert} = CryptoState();
  const navigate = useNavigate()

  const handleSubmit = async () => {
   if (password !== confirmPassword) {
     setAlert({
        open: true,
        message: 'Passwords do not Match',
        type: 'error'
     })
     return;
   }
   try {
    const user = {
        user: {
          email: email,
          password: password
        }
    }
    const result = await axios.post('http://localhost:3000/signup', user);
    console.log('register')
    console.log(result)
    setAlert({
        open: true,
        message: `Sign up Successful. Welcome ${result.data.data.email}`,
        type: 'success'
     })
     handleClose()
     
 } catch (error) {
    setAlert({
        open: true,
        message: error.message,
        type: 'error'
     })
     return;
 }
}
  
  return (
    <Box
    p={3}
    style={{display: "flex", flexDirection: "column", gap: "20px"}}
    
    >
    <TextField
    variant="outlined"
    type="email"
    label="Enter Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    fullWidth
    />
    <TextField
    variant="outlined"
    type="password"
    label="Enter Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    fullWidth
    />
    <TextField
    variant="outlined"
    type="password"
    label="Confirm Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    fullWidth
    />
    <Button
      variant="contained"
      size="large"
      style={{ backgroundColor: "#EEBC1D" }}
      onClick={handleSubmit}
    >
      Sign Up
    </Button>
    </Box>
  )
}

export default Signup