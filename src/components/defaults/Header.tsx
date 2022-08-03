import React, { useContext } from "react";
import axios from 'axios'
import { LoggedInStatus, HandleLogin, HandleLogout } from '../../App'

import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from '@mui/icons-material/Home';
// import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
// import Link from "@mui/material/Link";

function Header() {
  
  const loggedInStatus = useContext(LoggedInStatus)
  const handleLogout = useContext(HandleLogout)

  const handleLogoutClick = () => {
    axios.delete("http://localhost:3001/api/v1/sessions/delete", { withCredentials: true }
      ).then(response => {
        !!handleLogout && handleLogout()
      }).catch(error => console.log("ログアウトエラー", error))
  }

  return (
    <div>
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
              <Button onClick={handleLogoutClick} 
                      variant="outlined" 
                      color="inherit"
              >
                ログアウト
              </Button>
            </>  
          }

          {/* <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/about" color="inherit">
            About
          </Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
