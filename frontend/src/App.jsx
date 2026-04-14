import React from 'react'
import Signup from './pages/Singnup'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'                        // ✅ import
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Signup/>}/>
                <Route path='/profile' element={<Profile/>}/>  {/* ✅ new route */}
            </Routes>
            <ToastContainer position="top-right" autoClose={1500} style={{top: "70px"}}/>
        </BrowserRouter>
    )
}