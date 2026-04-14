import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/ContextProvider'
import { toast } from 'react-toastify'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { login } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                "http://localhost:8080/api/login",
                {email, password}
            )
            if (response.data.success) {
                toast.success(response.data.message)
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
                navigate('/home')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed")
            console.log(error)
        }
    }

    return (
        <div>
            <nav className="w-full bg-gray-900 px-6 py-3 flex items-center justify-between">
                <Link to="/" className="text-white text-xl font-bold">NoteApp</Link>
            </nav>

            <div className="flex justify-center items-center min-h-screen bg-blue-300">
                <div className="bg-white p-8 rounded-lg shadow w-80 border">
                    <h2 className="text-2xl font-bold mb-5 text-gray-800">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <label className="text-sm text-gray-600">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 mb-4 text-sm"
                        />
                        <label className="text-sm text-gray-600">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 mb-5 text-sm"
                        />
                        <button className="w-full bg-blue-600 text-white py-2 rounded text-sm">
                            Login
                        </button>
                        <p className="text-center text-sm text-gray-500 mt-4">
                            Don't have an account?
                            <Link to="/register" className="text-blue-500"> Signup</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login