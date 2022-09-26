import React, { useContext } from "react";
import "./Defaults.scss"
import { LoggedInStatusContext, HandleLogoutContext, UserContext } from '../../App'
import { Link } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from '@mui/icons-material/Home';

function Header() {

  const loggedInStatus = useContext(LoggedInStatusContext)
  // const handleLogout = useContext(HandleLogoutContext)
  // const user = useContext(UserContext)

  // const handleLogoutClick = () => {
  //   axios.delete(`${process.env.REACT_APP_BACK_ORIGIN}/api/v1/sessions/${{user_id: user?.id}}`, { withCredentials: true }
  //     ).then(response => {
  //       !!handleLogout && handleLogout()
  //       console.log("ログアウト", response)
  //     }).catch(error => console.log("ログアウトエラー", error))
  // }

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="search"
            component={Link}
            to="/"
          >
            <HomeIcon />
          </IconButton>
          <Typography 
            className="link"
            component={Link}
            to="/about"
            variant="h5" 
            color="inherit" 
            sx={{ mr: 1 }} 
            noWrap
          >
            Pla search
          </Typography>
          <Typography 
            style={{ fontSize: 12 }} 
            sx={{ flexGrow: 1 }}
            color="inherit" 
            noWrap
          >
            ‐プラサーチ‐
          </Typography>

          {loggedInStatus === "未ログイン" ?
            <>
              <Button component={Link} to="/user" 
                      sx={{ mr: 1 }}
                      variant="outlined" 
                      color="inherit"
              >
                Sign up / Login
              </Button>
            </>
          :
            <>
              <Typography color="inherit" sx={{ mr: 1 }}>
                Login User：{loggedInStatus}
              </Typography>
              <Button component={Link} to="/user"
                      variant="outlined" 
                      color="inherit"
              >
                Sign out
              </Button>
            </>  
          }
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
