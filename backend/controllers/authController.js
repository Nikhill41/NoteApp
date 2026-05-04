const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Note = require('../model/notemodel')

const register = async (req, res) => {
    try {
        const {name, email, password} = req.body
        if (!name || !email || !password) {
            return res.status(400).json({success: false, message: "All fields are required", code: "MISSING_FIELDS"})
        }
        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.status(409).json({success: false, message: "User already exists with this email", code: "USER_EXISTS"})
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new User({name, email, password: hashPassword})
        await newUser.save()
        return res.status(201).json({success: true, message: "User registered successfully", code: "USER_REGISTERED"})
    } catch (error) {
        console.log("Register error:", error)
        return res.status(500).json({success: false, message: "Server error", code: "SERVER_ERROR"})
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(400).json({success: false, message: "All fields are required", code: "MISSING_FIELDS"})
        }
        const user = await User.findOne({email})
        if (!user) {
            // don't reveal whether email exists; use generic message for security
            return res.status(401).json({success: false, message: "Invalid email or password", code: "INVALID_CREDENTIALS"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({success: false, message: "Invalid email or password", code: "INVALID_CREDENTIALS"})
        }
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn: process.env.TOKEN_EXPIRY_TIME}
        )
        return res.status(200).json({
            success: true,
            token,
            user: {name: user.name, id: user._id},
            message: "Logged in successfully",
            code: "LOGIN_SUCCESS"
        })
    } catch (error) {
        console.log("Login error:", error)
        return res.status(500).json({success: false, message: "Server error", code: "SERVER_ERROR"})
    }
}

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password') // exclude password
        if (!user) return res.status(404).json({success: false, message: "User not found", code: "USER_NOT_FOUND"})
        const noteCount = await Note.countDocuments({userId: req.user.id})
        return res.status(200).json({
            success: true,
            user,
            noteCount,
            code: "PROFILE_FETCHED"
        })
    } catch (error) {
        return res.status(500).json({success: false, message: "Server error", code: "SERVER_ERROR"})
    }
}

// Change password
const changePassword = async (req, res) => {
    try {
        const {currentPassword, newPassword} = req.body
        if (!currentPassword || !newPassword)
            return res.status(400).json({success: false, message: "All fields required", code: "MISSING_FIELDS"})

        const user = await User.findById(req.user.id)
        if (!user) return res.status(404).json({success: false, message: "User not found", code: "USER_NOT_FOUND"})

        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isMatch)
            return res.status(401).json({success: false, message: "Current password is incorrect", code: "INVALID_CREDENTIALS"})

        user.password = await bcrypt.hash(newPassword, 10)
        await user.save()
        return res.status(200).json({success: true, message: "Password changed successfully", code: "PASSWORD_CHANGED"})
    } catch (error) {
        return res.status(500).json({success: false, message: "Server error", code: "SERVER_ERROR"})
    }
}

module.exports = {register, login, changePassword, getProfile}