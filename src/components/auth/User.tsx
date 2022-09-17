import React, { useContext, createContext } from "react";
import axios from 'axios'
import { LoggedInStatusContext, HandleLoginContext, HandleLogoutContext, UserContext } from '../../App'
import Registration from './Registration'
import Login from './Login'

import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export const HandleSuccessfulAuthentication = createContext<((data: any) => void) | undefined>(undefined);

function User() {
    const navigation = useNavigate();
    const loggedInStatus = useContext(LoggedInStatusContext)
    const handleLogin = useContext(HandleLoginContext)
    const handleLogout = useContext(HandleLogoutContext)
    const user = useContext(UserContext)

    const handleSuccessfulAuthentication = (data: any) => {
      !!handleLogin && handleLogin(data)
      navigation("/user")
    }

    const handleLogoutClick = () => {
      axios.delete(`${process.env.REACT_APP_BACK_ORIGIN_DEVELOPMENT}/api/v1/sessions/${{user_id: user.id}}`
        ).then(response => {
          !!handleLogout && handleLogout()
          console.log("ログアウト", response)
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