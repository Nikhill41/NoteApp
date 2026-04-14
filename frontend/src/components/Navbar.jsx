import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/ContextProvider"

function Navbar({ searchQuery, setSearchQuery }) {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="w-full bg-gray-900 px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <div className="text-xl text-white font-bold">
                <Link to="/">NoteApp</Link>
            </div>

            {/* Search */}
            {user && (
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                    <input
                        className="bg-gray-700 text-white pl-9 pr-4 py-2 rounded-full outline-none
                        w-48 focus:w-72 transition-all duration-300 placeholder-gray-400 text-sm"
                        type="text"
                        placeholder="Search notes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs">
                            ✕
                        </button>
                    )}
                </div>
            )}

            {/* Auth Section */}
            <div className="flex items-center gap-3">
                {!user ? (
                    <>
                        <Link to="/login" className="bg-blue-500 px-4 py-2 rounded text-white text-sm">
                            Login
                        </Link>
                        <Link to="/register" className="bg-green-500 px-4 py-2 rounded text-white text-sm">
                            Signup
                        </Link>
                    </>
                ) : (
                    <>
                        {/* ✅ Profile link */}
                        <Link
                            to="/profile"
                            className="flex items-center gap-2 text-white hover:text-teal-400 transition">
                            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-sm font-bold">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm">{user?.name}</span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 px-4 py-2 rounded text-white text-sm">
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar