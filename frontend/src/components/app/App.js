import './App.css'
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import React, { useState } from 'react'
import Feed from '../feed/Feed'
import { useNavigate, Routes, Route } from 'react-router-dom'
import Navbar from '../NavBar'
import Home from '../home.js'
import Creators from '../creators.js'

const App = () => {

    return (
      <>
        <Navbar />
        <div className="container">
        <Routes>
          <Route path="/posts" element={<Feed navigate={useNavigate()} />} />
          <Route
            path="/login"
            element={<LoginForm navigate={useNavigate()} />}
          />
          <Route
            path="/signup"
            element={<SignUpForm navigate={useNavigate()} />}
          />
          <Route
            path="/logout"
            element={<LoginForm navigate={useNavigate()} />}
            />
            <Route path="/home" element={<Home navigate={useNavigate()} />}
            />
            <Route path="/creators" element={<Creators navigate={useNavigate()} />}
            />
        </Routes>
        
        </div>
      </>
    );
}

export default App
