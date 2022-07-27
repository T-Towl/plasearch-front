import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Shops from "./pages/Shops";
import ShopDetail from "./pages/ShopDetail";
import About from "./pages/About";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";


function Main() {
  return (
    <main>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/shopdetail/:id" element={<ShopDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Error />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </main>
  );
}

export default Main;