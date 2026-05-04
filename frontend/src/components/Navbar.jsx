import React from "react";
import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

function Navbar({ searchQuery, setSearchQuery }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 z-50">
      <div className="app-container flex items-center justify-between h-16 gap-2 sm:gap-4">

        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link to="/" className="text-lg font-bold text-slate-800">
            <span className="text-teal-500 font-semibold">Note</span>App
          </Link>
        </div>

        {/* Search Bar */}
        {user && (
          <div className="hidden sm:flex items-center flex-1 justify-center max-w-sm mx-2">
            <div className="w-full relative">

              {/* Search Icon */}
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />

              {/* Input */}
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-10 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />

              {/* Clear Button */}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-600 text-lg font-bold"
                >
                  ✕
                </button>
              )}

            </div>
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-md text-sm border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 rounded-md text-sm bg-teal-500 text-white hover:shadow-md transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-3 text-slate-800 hover:text-teal-600 transition"
              >
                <div className="w-9 h-9 bg-teal-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
                <span className="text-sm font-medium">{user?.name}</span>
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md text-sm border border-red-100 text-red-600 hover:bg-red-50 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;