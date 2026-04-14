import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/ContextProvider'
import axiosInstance from '../api/axiosInstance'
import Navbar from '../components/Navbar'
import { toast } from 'react-toastify'

function Profile() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showPasswordForm, setShowPasswordForm] = useState(false)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        if (!user) {
            navigate('/login')
        } else {
            fetchProfile()
        }
    }, [user])

    const fetchProfile = async () => {
        try {
            const response = await axiosInstance.get('/user/profile')
            console.log("Profile response:", response.data)  // ✅ debug
            if (response.data.success) {
                setProfile(response.data)
            }
        } catch (error) {
            console.log("Profile error:", error.response?.data)
            toast.error("Failed to load profile")
        } finally {
            setLoading(false)
        }
    }

    const handleChangePassword = async (e) => {
        e.preventDefault()
        if (newPassword.length < 6) {
            toast.error("New password must be at least 6 characters")
            return
        }
        try {
            const response = await axiosInstance.put('/user/change-password', {
                currentPassword, newPassword
            })
            if (response.data.success) {
                toast.success("Password changed! Please login again.")
                setShowPasswordForm(false)
                logout()
                navigate('/login')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to change password")
        }
    }

    // ✅ Safe date format
    const formatDate = (dateStr) => {
        const date = new Date(dateStr)
        if (!dateStr || isNaN(date.getTime())) return "N/A"
        return date.toLocaleDateString('en-US', {
            day: 'numeric', month: 'short', year: 'numeric'
        })
    }

    return (
        <div className='bg-gray-100 min-h-screen flex flex-col'>
            <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>

            <div className='max-w-xl mx-auto w-full p-6 mt-8'>

                {loading ? (
                    <div className='bg-white rounded-2xl p-8 shadow animate-pulse'>
                        <div className='w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4'></div>
                        <div className='h-5 bg-gray-200 rounded w-1/2 mx-auto mb-3'></div>
                        <div className='h-4 bg-gray-200 rounded w-2/3 mx-auto'></div>
                    </div>
                ) : profile ? (
                    <>
                        {/* Profile Card */}
                        <div className='bg-white rounded-2xl p-8 shadow-sm mb-4 text-center'>

                            {/* ✅ Avatar with first letter */}
                            <div className='w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4'>
                                {profile?.user?.name?.charAt(0).toUpperCase() || "?"}
                            </div>

                            {/* ✅ Name & Email */}
                            <h2 className='text-2xl font-bold text-gray-800 mb-1'>
                                {profile?.user?.name || "No name"}
                            </h2>
                            <p className='text-gray-500 text-sm mb-6'>
                                {profile?.user?.email || "No email"}
                            </p>

                            {/* ✅ Stats */}
                            <div className='grid grid-cols-2 gap-4 mb-6'>
                                <div className='bg-teal-50 rounded-xl p-4'>
                                    <p className='text-3xl font-bold text-teal-600'>
                                        {profile?.noteCount ?? 0}
                                    </p>
                                    <p className='text-sm text-gray-500 mt-1'>Total Notes</p>
                                </div>
                                <div className='bg-blue-50 rounded-xl p-4'>
                                    <p className='text-lg font-bold text-blue-600'>
                                        {formatDate(profile?.user?.createdAt)}
                                    </p>
                                    <p className='text-sm text-gray-500 mt-1'>Member Since</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className='flex gap-3'>
                                <button
                                    onClick={() => navigate('/home')}
                                    className='flex-1 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold transition'>
                                    📝 My Notes
                                </button>
                                <button
                                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                                    className='flex-1 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold transition'>
                                    🔒 Change Password
                                </button>
                            </div>
                        </div>

                        {/* Change Password Form */}
                        {showPasswordForm && (
                            <div className='bg-white rounded-2xl p-6 shadow-sm'>
                                <h3 className='text-lg font-bold text-gray-800 mb-4'>Change Password</h3>
                                <form onSubmit={handleChangePassword}>
                                    <label className='text-sm text-gray-600'>Current Password</label>
                                    <input
                                        type='password'
                                        placeholder='Enter current password'
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className='w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
                                    />
                                    <label className='text-sm text-gray-600'>New Password</label>
                                    <input
                                        type='password'
                                        placeholder='Min 6 characters'
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className='w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
                                    />
                                    <div className='flex gap-3'>
                                        <button type='submit'
                                            className='flex-1 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm font-semibold transition'>
                                            Save Password
                                        </button>
                                        <button type='button'
                                            onClick={() => setShowPasswordForm(false)}
                                            className='flex-1 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition'>
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </>
                ) : (
                    // ✅ Error state if profile failed to load
                    <div className='bg-white rounded-2xl p-8 shadow-sm text-center'>
                        <p className='text-gray-500'>Failed to load profile. Please try again.</p>
                        <button onClick={fetchProfile} className='mt-4 text-teal-500 hover:underline text-sm'>
                            Retry
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile