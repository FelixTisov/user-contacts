import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import Plugin from "./pages/plugin/plugin";

import "./index.scss";
import Header from "./shared/Layout/Header/header";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Header />
    <Routes>
      {/* <Route exact path="/" element={<Login />} /> */}
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<Profile />} />
      {/* <Route exact path="/signup" element={<Signup />} /> */}
    </Routes>
  </BrowserRouter>
);
