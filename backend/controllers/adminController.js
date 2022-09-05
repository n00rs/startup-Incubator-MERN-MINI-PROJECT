const jwt = require("jsonwebtoken")
const Application = require("../models/applyFormModel")
// const 
module.exports = {


    //METHOD POST
    //ROUTE /api/admin/login

    adminLogin: (req, res) => {
        const adminEmail = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD
        try {

            const { email, password } = req.body
            if (!email || !password) {
                res.status(400)
                throw new Error('invalid credentials')
            }
            if (email == adminEmail && password == adminPassword) {
                if (req.cookies.adminToken)
                    req.cookies.adminToken = ''

                const token = jwt.sign({ email: adminEmail }, process.env.JWT_SECRET, { expiresIn: '1d' })
                res.cookie('adminToken', token, {
                    path: '/',
                    httpOnly: true,
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                    sameSite: 'lax'
                })
                res.status(200).json({ token, email })
            } else {

                res.status(403)
                throw new Error('id or password doesnt match')

            }

        } catch (err) {
            console.log(err + 'err admin login');
            const statusCode = res.statusCode ? res.statusCode : 500
            res.status(statusCode).json(err.message)
        }
    },

    //METHOD GET 
    //ROUTE /api/admin/all-applications

    fetchAllApplication: async (req, res, next) => {
        try {
            const fecthAllApps = await Application.find()
                (fecthAllApps) ? res.status(200).json(this.fetchAllApplication) :
                res.status(404).json({ message: "no data please login and try again" })


        } catch (err) {
            console.log(err, 'err in admin view all');
            res.status(500).json(err.message)
        }
    }
}