import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { Avatar } from '@material-ui/core';
import axios from 'axios'
import { CryptoState } from '../../CryptoContext';


const useStyles = makeStyles({
  container: {
    width: 350,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "monospace"
  },
  profile: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    alignItems: "center",
    height: "92%"
  },
  picture: {
    width: 200,
    height: 200,
    cursor: "pointer",
    backgroundColor:"#EEBC1D",
    objectFit: "contain"
  },
  logout: {
    height: "8%",
    width: "100%",
    backgroundColor: "#EEBC1D",
    marginTop: 20
  },
  watchlist: {
    flex: 1,
    width: "100%",
    backgroundColor: "grey",
    padding: 15,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflowY: "scroll"

  }
});

export default function UserSidebar(props) {
  const classes = useStyles();
  const {alert, setAlert} = CryptoState()
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const LogOut = async () => {

    try {
    
    const token = localStorage.get('token')
    console.log("is there a token")
    const user = props.user
    await axios.delete("http://localhost:3000/logout", user, {
        headers: {
            Authorization: token
        } 
    })
    localStorage.removeItem('token')
    console.log("has token been removed")
    setAlert({
        open: true,
        type: "success",
        message: "Logout Successfull"
    })
    toggleDrawer()
    }catch(error) {

    }
  }

 
  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
           onClick={toggleDrawer(anchor, true)}
           style={{
            height: 38,
            width: 38,
            marginLeft: 15,
            cursor: "pointer",
            backgroundColor: "#EEBC1D"
           }}
           src={'user.photoURL'}
           alt={'user.displayName' || 'user.email'}
           
           />
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            <div className={classes.container}>
              <div className={classes.profile}>
              <Avatar
              className={classes.picture}
              // src={user?.photoURL}
              // alt={user.displayName || user.email}
              />
              <span
               style={{
                 fontSize: 25,
                 width: "100%",
                 fontWeight: "bolder",
                 cursor: "pointer",
                 textAlign: "center",
                 wordWrap: "break-word"
               }}
              >
                {'props.data.attributes.email'}
              </span>
                <div className={classes.watchlist}>
               <span style={{fontSize: 15, textShadow: "0 0 5px black"}}>
                  Watchlist
               </span>
                </div>
              </div>
              <Button
                variant='contained'
                className={classes.LogOut}
                onClick={LogOut}
              >
                Log Out
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}