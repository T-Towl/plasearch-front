import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Keyword from "./pages/Keyword";
import About from "./pages/About";
import Error from "./pages/Error";
import Post from "./pages/Post";

function Main() {
  return (
    <main>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/keyword" element={<Keyword />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Error />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </main>
  );
}

export default Main;