import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'
import { toast } from 'react-toastify'

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (loading) return
        try {
            setLoading(true)
            const response = await axiosInstance.post(
                '/register',
                {name, email, password}
            )
            if (response.data.success) {
                toast.success(response.data.message)
                navigate('/login')
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed")
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
                    <h2 className="text-2xl font-bold mb-6 text-slate-800">Create Account</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="text-sm font-medium text-slate-700">Full Name</label>
                            <input
                                type="text"
                                placeholder="Your name"
                                onChange={(e) => setName(e.target.value)}
                                className="input-base w-full mt-1.5"
                            />
                        </div>
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
                            {loading ? "Creating account..." : "Sign Up"}
                        </button>
                        <p className="text-center text-sm text-slate-600 mt-6">
                            Already have an account?
                            <Link to="/login" className="text-teal-600 font-semibold hover:text-teal-700"> Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup