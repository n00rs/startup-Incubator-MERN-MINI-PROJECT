const jwt = require("jsonwebtoken")

const verifyToken = async (req, res, next) => {
    // token = req.cookies
    try {
        const cookie = req.headers.cookie
        const token = req.cookies.userToken
        if (!token) {
            res.status(403)
            throw new Error('no token no authorization')
        }

        const verify = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                res.status(401)
                throw new Error('invalid token')
            }
            console.log(user);
            req.userId = user.id
            next()
        })
        // const token =  


    } catch (err) {
        const statusCode = res.statusCode ? res.statusCode : 500
        res.status(statusCode).json(err.message)
    }
}

const verifyAdminToken = (req, res, next) => {
    try {
        const adminToken = req.cookies.adminToken
        if (!adminToken) {
            res.status(403)
            throw new Error('no token no authorization')
        }
        const verifyToken = jwt.verify(adminToken, process.env.JWT_SECRET, (err, admin) => {
            (err) ? res.status(401).json({ message: "invalid token" }) :
                req.admin = admin.email
            next()
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err.message)

    }
}
module.exports = {verifyToken , verifyAdminToken}