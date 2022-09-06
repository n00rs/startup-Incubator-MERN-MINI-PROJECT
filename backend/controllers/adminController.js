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
                res
                    .cookie('adminToken', token, {
                        path: '/',
                        httpOnly: true,
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                        sameSite: 'lax'
                    })
                    .cookie('adminExist', true, {
                        path: '/',
                        sameSite: 'lax',
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
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
            const fecthAllApps = (await Application.find({}))

            await (!fecthAllApps) ?
                res.status(404).json({ message: "no data please login and try again" }) :
                res.status(200).json({ fecthAllApps })

        } catch (err) {
            console.log(err, 'err in admin view all');
            res.status(500).json(err.message)
        }
    },

    //METHOD PUT
    //ROUTE /api/admin/update-appstatus

    updateStatus: async (req, res, next) => {
        try {
            const appId = req.params.id
            const { status } = req.body

            if (!status) res.status(400).json({ message: "no status no update" })
            const updateStatus = await Application.findByIdAndUpdate(appId,
                {
                    $set: { status: status }
                }, {
                new: true
            })
            // console.log(updateStatus)
            updateStatus ? res.status(200).json(updateStatus) :
                res.status(500).json({ message: "server down please try again late" })
        } catch (err) {
            console.log(err, 'err in admin view all');
            res.status(500).json(err.message)
        }
    },
    //METHOD DELETE
    //ROUTE /api/admin/logout

    adminLogout: (req, res, next) => {
        try {
            //clearing token from cookie
            res.clearCookie('adminToken')
            res.clearCookie('adminExist')
            res.status(200).json({ logout: true })
        } catch (error) {
            res.status(500).json({ message: "failed to logout" })
        }
    }
}