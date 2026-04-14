import React, { createContext, useContext, useState } from 'react'
import isTokenExpired from '../utils/tokenUtils'

const authContext = createContext()

const ContextProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user")
        const token = localStorage.getItem("token")
        if (!token || isTokenExpired(token)) {
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            return null
        }
        return storedUser ? JSON.parse(storedUser) : null
    })

    const login = (userData) => {
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    }

    return (
        <authContext.Provider value={{user, login, logout}}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => useContext(authContext)
export default ContextProvider