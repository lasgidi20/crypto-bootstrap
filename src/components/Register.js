import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    const user = {
        user: {
          email: email,
          password: password
        }
    }
    e.preventDefault();
    try {
       await axios.post('http://localhost:3000/signup', user);
        console.log(user)
        navigate("/dashboard");
    } catch (error) {
        if (error.response) {
            setMsg(error.response.data.msg);
        }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
    <label>
      Email:
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    </label>

    <label>
      password:
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </label>
    <input type="submit" value="Register" />
  </form>
  )
}

export default Register