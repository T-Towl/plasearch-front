import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Keyword from "./pages/Keyword";
import Error from "./pages/Error";

function Main() {
  return (
    <main>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/keyword" element={<Keyword />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </main>
  );
}

export default Main;