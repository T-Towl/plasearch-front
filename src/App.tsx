import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import './App.css';

import Header from "./components/defaults/Header";
import Footer from "./components/defaults/Footer";
import Main from "./components/Main";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export const LoggedInStatusContext = createContext("")
export const UserContext = createContext({})
export const HandleLoginContext = createContext<((data: any) => void) | undefined>(undefined);
export const HandleLogoutContext = createContext<(() => void) | undefined>(undefined);

export default function App() {

  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン")
  const [user, setUser] = useState({})

  const handleLogin = (data: any) => {
    setLoggedInStatus(data.user.name)
    setUser(data.user)
  }
  const handleLogout = () => {
    setLoggedInStatus("未ログイン")
    setUser({})
  }

  useEffect(() => {
    checkLoginStatus()
  })

  const checkLoginStatus = () => {
    axios.get(`https://classique-chaise-00920.herokuapp.com/api/v1/sessions/show`, { withCredentials: true }
    ).then(response => {
      if (response.data.logged_in && loggedInStatus === "未ログイン") {
        setLoggedInStatus(response.data.user.name)
        setUser(response.data.user)
        console.log("ログインなう")
      } else if (!response.data.logged_in && loggedInStatus !== "未ログイン") {
        setLoggedInStatus("未ログイン")
        setUser({})
        console.log("未ログイン")
      }
      console.log("ログイン状況", response)
    }).catch(error => {
      console.log("ログインエラー", error)
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
