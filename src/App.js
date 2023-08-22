import React from 'react'
import { BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css'
import Header from './components/Header'
import Homepage from './Pages/Homepage'
import Signup  from './components/Authentication/Signup'
import Login from './components/Authentication/Login'
import Article  from './components/Article'
import Coinpage from './Pages/Coinpage'
import { makeStyles } from '@material-ui/core/styles';
import Alert from './components/Alert';
import axios from "axios";
import { useEffect, useState } from "react";
import UserSidebar from './components/Authentication/UserSidebar';


const App = () => {
  const [user, setUser] = useState(null)

   // const token = localStorage.getItem("token")
    const checkAuth = async () => {
      
    try {
      const token = localStorage.getItem("token")
      if (token) {
      const result = await axios.get("http://localhost:3000/current-user",{
        headers: {
          Authorization: token
      }  
      })
      setUser(result.data)
    
   } } catch(error) {
        console.log('check curent user')
        console.log(error)
    }
  }
  
  useEffect(() => {
    checkAuth()
  },[])
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh"
    }
  }))
  
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.App}>
         <Header user={user}/>
         <UserSidebar user={user} />
         <Routes>
           <Route path="/" element={<Homepage />} /> 
           <Route path="/coins/:id" element={<Coinpage />} />
           <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<Signup />} />
           <Route path="articles" element={<Article />} />
          </Routes>
      </div>
      <Alert />
    </BrowserRouter>
  )
}

export default App