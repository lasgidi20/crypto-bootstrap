import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@material-ui/core/Box';
import {TextField} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import { CryptoState } from '../../CryptoContext';
const Login = ({handleClose}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {setAlert} = CryptoState()
  const handleSubmit = async () => {
    if (!password || !email ) {
        setAlert({
           open: true,
           message: 'Please fill all fields',
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
       const result = await axios.post('http://localhost:3000/login', user);
       console.log('login')
       localStorage.setItem('token', result.headers.authorization)
       console.log(result)
       setAlert({
           open: true,
           message: `Logged in Successful. Welcome ${result.data.data.email}`,
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
    <Button
      variant="contained"
      size="large"
      style={{ backgroundColor: "#EEBC1D" }}
      onClick={handleSubmit}
    >
      Login
    </Button>
    </Box>
  )
}

export default Login