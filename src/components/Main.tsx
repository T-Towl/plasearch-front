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
import User from "./pages/User";

// export const LoggedInStatus = createContext("")
// export const User = createContext({})
// export const HandleLogin = createContext<((data: any) => void) | undefined>(undefined);
// export const HandleLogout = createContext<(() => void) | undefined>(undefined);


function Main() {

//   const [loggedInStatus, setLoggedInStatus] = useState("未ログイン")
//   const [user, setUser] = useState({})

//   const handleLogin = (data: any) => {
//     setLoggedInStatus(data.user.name)
//     setUser(data.user)
//   }
//   const handleLogout = () => {
//     setLoggedInStatus("未ログイン")
//     setUser({})
//   }

//   useEffect(() => {
//     checkLoginStatus()
//   })

  // const checkLoginStatus = () => {
  //   axios.get('http://localhost:3001/api/v1/sessions/show', { withCredentials: true }
  //   ).then(response => {
  //     if (response.data.logged_in && loggedInStatus === "未ログイン") {
  //       setLoggedInStatus(response.data.user.name)
  //       setUser(response.data.user)
  //       console.log("ログインなう")
  //     } else if (!response.data.logged_in && loggedInStatus !== "未ログイン") {
  //       setLoggedInStatus("未ログイン")
  //       setUser({})
  //       console.log("未ログイン")
  //     }
  //     console.log("ログイン状況", response)
  //   }).catch(error => {
  //     console.log("ログインエラー", error)
  //   })
  // }

  return (
    <main>
      {/* <HandleLogin.Provider value={handleLogin}>
      <HandleLogout.Provider value={handleLogout}>
      <LoggedInStatus.Provider value={loggedInStatus}>
      <User.Provider value={user}> */}
        <Routes>
          <Route index element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/shopdetail/:id" element={<ShopDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Error />} />      
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<User />} />      
        </Routes>
      {/* </User.Provider>
      </LoggedInStatus.Provider>
      </HandleLogout.Provider>
      </HandleLogin.Provider> */}
    </main>
  );
}

export default Main;