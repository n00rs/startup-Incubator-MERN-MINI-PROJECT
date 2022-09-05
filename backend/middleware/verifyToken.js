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


module.exports = verifyToken