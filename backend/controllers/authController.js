const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Note = require('../model/notemodel')

const register = async (req, res) => {
    try {
        const {name, email, password} = req.body
        if (!name || !email || !password) {
            return res.status(400).json({success: false, message: "All fields are required"})
        }
        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.status(400).json({success: false, message: "User already exists"})
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new User({name, email, password: hashPassword})
        await newUser.save()
        return res.status(200).json({success: true, message: "User registered successfully"})
    } catch (error) {
        console.log("Register error:", error)
        return res.status(500).json({success: false, message: "Server error"})
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(400).json({success: false, message: "All fields are required"})
        }
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({success: false, message: "User not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({success: false, message: "Invalid password"})
        }
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn: process.env.TOKEN_EXPIRY_TIME}
        )
        return res.status(200).json({
            success: true,
            token,
            user: {name: user.name},
            message: "Logged in successfully"
        })
    } catch (error) {
        console.log("Login error:", error)
        return res.status(500).json({success: false, message: "Server error"})
    }
}





const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password') // exclude password
        const noteCount = await Note.countDocuments({userId: req.user.id})
        return res.status(200).json({
            success: true,
            user,
            noteCount
        })
    } catch (error) {
        return res.status(500).json({success: false, message: "Server error"})
    }
}

// ✅ Change password
const changePassword = async (req, res) => {
    try {
        const {currentPassword, newPassword} = req.body
        if (!currentPassword || !newPassword)
            return res.status(400).json({success: false, message: "All fields required"})

        const user = await User.findById(req.user.id)
        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isMatch)
            return res.status(400).json({success: false, message: "Current password is wrong"})

        user.password = await bcrypt.hash(newPassword, 10)
        await user.save()
        return res.status(200).json({success: true, message: "Password changed successfully"})
    } catch (error) {
        return res.status(500).json({success: false, message: "Server error"})
    }
}
module.exports = {register, login, changePassword, getProfile}