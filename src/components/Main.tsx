import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Shops from "./pages/Shops";
import About from "./pages/About";
import Error from "./pages/Error";
import ShopDetail from "./pages/ShopDetail";

function Main() {
  return (
    <main>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Error />} />
        <Route path="/shopdetail/:id" element={<ShopDetail />} />
      </Routes>
    </main>
  );
}

export default Main;