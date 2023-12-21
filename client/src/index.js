import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './pages/login/login'
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login />} />
      {/* <Route exact path="/signup" element={<Signup />} /> */}
    </Routes>
  </BrowserRouter>
)
