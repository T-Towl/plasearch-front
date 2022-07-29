import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Shops from "./pages/Shops";
import ShopDetail from "./pages/ShopDetail";
import About from "./pages/About";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";

export const LoggedInStatus = createContext("")
export const User = createContext({})
export const HandleLogin = createContext<((data: any) => void) | undefined>(undefined);

function Main() {

  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン")
  const [user, setUser] = useState({})

  const handleLogin = (data: any) => {
    setLoggedInStatus("ログインなう")
    setUser(data.user)
  }

  useEffect(() => {
    checkLoginStatus()
  })

  // 追加
  const checkLoginStatus = () => {
    axios.get("http://localhost:3001/sessions/new", { withCredentials: true })
      .then(response => {
      console.log("ログイン状況", response)
    }).catch(error => {
      console.log("ログインエラー", error)
    })
  }

  return (
    <main>
      <LoggedInStatus.Provider value={loggedInStatus}>
      <HandleLogin.Provider value={handleLogin}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/shopdetail/:id" element={<ShopDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Error />} />      
          <Route path="/dashboard" element={<Dashboard />} />      
        </Routes>
      </HandleLogin.Provider>
      </LoggedInStatus.Provider>
    </main>
  );
}

export default Main;