import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import './App.css';

import Header from "./components/defaults/Header";
import Footer from "./components/defaults/Footer";
import Main from "./components/Main";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

type User = {
  id: number
  email: string
  name: string
  password_digest: string
  created_at: string
  updated_at: string
}

export const LoggedInStatusContext = createContext("")
export const UserContext = createContext<User | undefined>(undefined)
export const HandleLoginContext = createContext<((data: any) => void) | undefined>(undefined);
export const HandleLogoutContext = createContext<(() => void) | undefined>(undefined);

export default function App() {

  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン")
  const [user, setUser] = useState<undefined | User>(undefined)

  const handleLogin = (data: any) => {
    setLoggedInStatus(data.user.name)
    setUser(data.user)
  }
  const handleLogout = () => {
    setLoggedInStatus("未ログイン")
    setUser(undefined)
  }

  useEffect(() => {
    checkLoginStatus()
  })

  const checkLoginStatus = () => {
    console.log("ログイン状況", loggedInStatus, user?.id)
    axios.get(`http://localhost:3001/api/v1/sessions/${{user_id: user?.id}}`, { withCredentials: true }
    ).then(response => {
      console.log("ユーザー", user?.id)
      if (response.status === 200 && loggedInStatus === "未ログイン") {
        handleLogin(response.data)
        console.log("ログインなう", response, loggedInStatus)
      } else {
        if (response.status === 200) {
          console.log("ログインなう", response, loggedInStatus)
        } else {
          console.log("未ログイン", response, loggedInStatus)
        }
      }
    }).catch(error => {
      handleLogout()
      console.log("ログインエラー", loggedInStatus, error)
    })
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <HandleLoginContext.Provider value={handleLogin}>
          <HandleLogoutContext.Provider value={handleLogout}>
            <LoggedInStatusContext.Provider value={loggedInStatus}>
              <UserContext.Provider value={user}>
                <Header />
                <Main />
                <Footer />
              </UserContext.Provider>
            </LoggedInStatusContext.Provider>
          </HandleLogoutContext.Provider>
        </HandleLoginContext.Provider>
      </ThemeProvider>
    </>
  );
}
