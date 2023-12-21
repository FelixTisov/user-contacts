
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './pages/login/login'
import SignUp from './pages/signup/signup'
import Home from './pages/home/home'
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/home" element={<Home />} />
    </Routes>
  </BrowserRouter>
);
