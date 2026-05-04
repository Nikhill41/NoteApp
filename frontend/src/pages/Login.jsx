import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'
import { useAuth } from '../context/ContextProvider'
import { toast } from 'react-toastify'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { login } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (loading) return
        try {
            setLoading(true)
            const response = await axiosInstance.post(
                '/login',
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
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <nav className="w-full bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 z-50">
                <div className="app-container flex items-center h-16">
                    <Link to="/" className="text-lg font-bold text-slate-800">
                        <span className="text-teal-500">Note</span>App
                    </Link>
                </div>
            </nav>

            <div className="flex justify-center items-center min-h-screen bg-slate-50 p-4 pt-20">
                <div className="card rounded-lg-2 p-8 w-full max-w-sm">
                    <h2 className="text-2xl font-bold mb-6 text-slate-800">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="text-sm font-medium text-slate-700">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-base w-full mt-1.5"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="text-sm font-medium text-slate-700">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-base w-full mt-1.5"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-2.5 rounded-md text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                        <div className="mt-5 p-4 bg-blue-50 rounded-lg text-sm text-blue-800 border border-blue-200">
                            <p className="font-semibold mb-2">⚠️ Backend Notice</p>
                            <p>Backend deployed on Render. First request may take 50-60 seconds for response due to cold start.</p>
                        </div>

                        <div className="mt-4 p-3 bg-amber-50 rounded-lg text-sm text-amber-800 border border-amber-200">
                            <p className="font-semibold text-amber-900 mb-1">Demo Credentials:</p>
                            <p>Email: <span className="font-mono text-xs">test.user@gmail.com</span></p>
                            <p>Password: <span className="font-mono text-xs">testpassword@123</span></p>
                        </div>

                        <p className="text-center text-sm text-slate-600 mt-6">
                            Don't have an account?
                            <Link to="/register" className="text-teal-600 font-semibold hover:text-teal-700"> Signup</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login