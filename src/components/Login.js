import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Login = () => {
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
      const { data: {data}} = await axios.post('http://localhost:3000/login', user);
       console.log(data)
       localStorage.setItem('token', data.jti)
       console.log('first check')
       console.log(data.jti)
       navigate('/articles')
    } catch (error) {
        if (error.response) {
            setMsg(error.response.data.msg);
        }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
    <label>
      Emails:
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    </label>

    <label>
      password:
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </label>
    <input type="submit" value="Login" />
  </form>
  )
}

export default Login