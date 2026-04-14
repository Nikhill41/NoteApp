const express = require('express')
const router = express.Router()
const {register, login,getProfile,changePassword} = require('../controllers/authController')
const verifyToken=require('../middleware/verifyToken')

router.post('/register', register)
router.post('/login', login)


router.get('/user/profile', verifyToken, getProfile)          // ✅ get profile
router.put('/user/change-password', verifyToken, changePassword)
module.exports = router