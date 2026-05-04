const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(" ")[1]

    if (!token) {
        return res.status(401).json({success: false, message: "No token provided, access denied", code: "NO_TOKEN"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({success: false, message: "Invalid or expired token", code: "INVALID_TOKEN"})
    }
}

module.exports = verifyToken