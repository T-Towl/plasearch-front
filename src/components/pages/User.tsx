import React, { useContext, createContext } from "react";
import axios from 'axios'
import { LoggedInStatus, HandleLogin, HandleLogout } from '../../App'
import Registration from '../auth/Registration'
import Login from '../auth/Login'

import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";

export const HandleSuccessfulAuthentication = createContext<((data: any) => void) | undefined>(undefined);

function User() {
    let navigation = useNavigate();
    const loggedInStatus = useContext(LoggedInStatus)
    const handleLogin = useContext(HandleLogin)
    const handleLogout = useContext(HandleLogout)
  
    const handleSuccessfulAuthentication = (data: any) => {
      !!handleLogin && handleLogin(data)
      navigation("/user")
    }
  
    const handleLogoutClick = () => {
      axios.delete("http://localhost:3001/api/v1/sessions/delete", { withCredentials: true }
        ).then(response => {
          !!handleLogout && handleLogout()
        }).catch(error => console.log("ログアウトエラー", error))
    }
  
    return (
      <>
        <h2>ログイン状態: {loggedInStatus}</h2>
        
        {loggedInStatus === "未ログイン" ?
        <HandleSuccessfulAuthentication.Provider value={handleSuccessfulAuthentication}>
          <Registration  />
          <Login />
        </HandleSuccessfulAuthentication.Provider>
        :
        <Button onClick={handleLogoutClick} 
                variant="outlined" 
                color="inherit"
        >
          ログアウト
        </Button>
        }
      </>
    );
  }
  export default User;
  