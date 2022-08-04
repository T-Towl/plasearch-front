import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import './App.css';
import Header from "./components/defaults/Header";
import Footer from "./components/defaults/Footer";
import Main from "./components/Main";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export const LoggedInStatus = createContext("")
export const User = createContext({})
export const HandleLogin = createContext<((data: any) => void) | undefined>(undefined);
export const HandleLogout = createContext<(() => void) | undefined>(undefined);

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
    axios.get('http://localhost:3001/api/v1/sessions/show', { withCredentials: true }
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
        <HandleLogin.Provider value={handleLogin}>
        <HandleLogout.Provider value={handleLogout}>
        <LoggedInStatus.Provider value={loggedInStatus}>
        <User.Provider value={user}>
          <Header />
          <Main />
          <Footer />
        </User.Provider>
        </LoggedInStatus.Provider>
        </HandleLogout.Provider>
        </HandleLogin.Provider>
      </ThemeProvider>
    </>
  );
}
