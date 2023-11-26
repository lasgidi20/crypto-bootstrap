import {
    AppBar,
    Container,
    MenuItem,
    Select,
    Toolbar,
    Typography,
  } from "@material-ui/core";
  import {
    createTheme,
    makeStyles,
    ThemeProvider,
  } from "@material-ui/core/styles";
  import { useNavigate } from "react-router-dom";
  import { CryptoState } from "../CryptoContext";
  // // import Modal from '@mui/material/Modal';
  import FormDialog from "./FormDialog";
  import Button from '@material-ui/core/Button';
  import AuthModal from "./Authentication/AuthModal";
   import { useEffect, useState } from "react";
   import UserSidebar from "./Authentication/UserSidebar";
   import axios from 'axios'
  
  const useStyles = makeStyles((theme) => ({
    title: {
      flex: 1,
      color: "gold",
      fontFamily: "Montserrat",
      fontWeight: "bold",
      cursor: "pointer",
    },
  }));
  
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  
  function Header(props) {
    const classes = useStyles();
    const { currency, setCurrency } = CryptoState();
    const navigate = useNavigate();
    const LogoutUser = async () => {

     try {
       const token = localStorage.getItem(token)
       const logged_out = await axios.delete("localhost:3000/logout",
     {
      headers: {
        Authorization: token
    }  
    })
     }catch(error) {
      console.log(error)
     }

   }
    return (
      <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
              <Typography
                onClick={() => navigate('/')}
                variant="h6"
                className={classes.title}
              >
                Crypto Hunter
              </Typography>
              <Select
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currency}
                style={{ width: 100, height: 40, marginLeft: 15 }}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"GBP"}>GBP</MenuItem>
              </Select>
            { props.user?.data != null ? <UserSidebar /> : <AuthModal />}
              
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    );
  }
  
  export default Header;