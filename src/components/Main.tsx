import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Shops from "./pages/Shops";
import ShopDetail from "./pages/ShopDetail";
import About from "./pages/About";
import Error from "./pages/Error";
import User from "./auth/User";

function Main() {

  return (
    <main>
<<<<<<< HEAD
      <Routes>
        <Route index element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/shopdetail/:id" element={<ShopDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Error />} />      
        <Route path="/user" element={<User />} />   
      </Routes>
=======
        <Routes>
          <Route index element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/shopdetail/:id" element={<ShopDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Error />} />      
          <Route path="/user" element={<User />} />      
        </Routes>
>>>>>>> origin/user_loginout
    </main>
  );
}

export default Main;