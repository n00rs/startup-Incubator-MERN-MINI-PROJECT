const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const Application = require('../models/applyFormModel')
const multer = require('multer')

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, './frontend/public/images/companyLogo')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
module.exports = {
    upload: multer({ storage: Storage }),

    //METHOD POST
    //ROUTE /api/users/signup

    userSignup: async (req, res, next) => {
        try {
            const { name, email, password } = req.body
            if (!name || !email || !password) {
                res.status(400)
                throw new Error('invalid signup credentials')
            }

            //checking whether the email already registerd 

            const userExist = await User.findOne({ email: email })

            if (userExist) {
                res.status(422)
                throw new Error(`user already exists please login !`)
            }

            const hashPassword = bcrypt.hashSync(password)                             //hashing password and saving new user
            const newUser = new User({ name, email, password: hashPassword })
            await newUser.save()
            res.status(200).json({ signup: true, newUser })
        } catch (err) {
            const statusCode = res.statusCode ? res.statusCode : 500
            res.status(statusCode)
            res.json(err.message)
        }
    },

    //METHOD LOGIN
    //ROUTE /api/users/login

    userLogin: async (req, res, next) => {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                res.status(400)
                throw new Error('invalid login credentials')
            }

            //verify user
            const checkUser = await User.findOne({ email: email })
            if (checkUser && bcrypt.compareSync(password, checkUser.password)) {

                //creating new jwt token for userAUTH 
                const token = jwt.sign({ id: checkUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

                //saving the token in HTTPONLY cookie
                res
                    .cookie(
                        'userToken', token, {
                        paht: '/',
                        httpOnly: true,
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                        sameSite: 'lax',
                        withCredentials: true
                    })
                    .cookie('tokenExist', true, {                                           //ceating and saving A Boolean with same validity of token in cookie which can be accessed from frontend
                        path: '/',
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                        sameSite: 'lax',
                    })
                res.status(200).json({ login: true })
            }
            else {
                res.status(403)
                throw new Error('email or password doesnt match')
            }
        } catch (err) {
            const statusCode = res.statusCode ? res.statusCode : 500
            res.status(statusCode).json(err.message)
        }
    },

    //METHOD GET
    //ROUTE /api/user/user

    fetchUser: async (req, res, next) => {
        try {
            const userId = req.userId
            if (!userId) {
                res.status(403)
                throw new Error('no token no authorization')
            }
            const user = await User.findById(userId, '-password')
            if (!user) {
                res.status(404)
                throw new Error('user not found')
            }
            res.status(200).json(user)
        } catch (err) {
            let statusCode = res.statusCode ? res.statusCode : 500
            res.status(statusCode).json(err.message)
        }
    },

    //METHOD POST 
    //ROUTE /api/user/apply

    newApplication: async (req, res, next) => {
        try {
            const userId = req.userId
            const userExist = await User.findById(userId)
            if (!userExist) {
                res.status(422)
                throw new Error('no user please login or signup')
            }
            const data = { ...req.body }

            //setting user Details
            let userDetails = {
                userId: userId,
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address,
                city: data.city,
                state: data.state,
            }

            // setting company details
            let companyDetails = {
                companyName: data.companyName,
                teamBackground: data.teamBackground,
                companyProducts: data.companyProducts,
                solvingProblem: data.solvingProblem,
                uniqueSolution: data.uniqueSolution,
                revenueModel: data.revenueModel,
                marketSize: data.marketSize,
                incubationType: data.incubationType,
                businessProposal: data.businessProposal,
                companyLogo: req.file.filename
            }

            let applicationData = { userDetails, companyDetails }
            const newApplication = await Application.create(applicationData)
            res.status(201).json({ formSubmitted: true })

        } catch (err) {
            const statusCode = res.statusCode ? res.statusCode : 500
            res.status(statusCode).json(err.message)
        }
    },

    //METHOD GET
    //ROUTE /api/users/view-application/:id
    //NOT USED
    viewApplication: async (req, res, next) => {
        try {
            let applicationId = req.params.id

            const fetchApplication = await Application.findById(applicationId)
            if (fetchApplication)
                res.status(200).json(fetchApplication)
            else {
                res.status(404)
                throw new Error('no data found')
            }
        } catch (err) {
            const statusCode = res.statusCode ? res.statusCode : 500
            res.status(statusCode).json(err.message)
        }
    },


    //METHOD GET 
    //ROUTE /api/users/view-all

    viewAllApplication: async (req, res, next) => {
        try {
            const userId = req.userId
            if (!userId) {
                res.status(400)
                throw new Error('no user please login and try again')
            }
            const fetchUserApps = await Application.find({ 'userDetails.userId': userId })
            res.status(200).json(fetchUserApps)
        } catch (err) {
            const statusCode = res.statusCode ? res.statusCode : 500
            res.status(statusCode).json(err.message)
        }
    },


    //METHOD delete
    //ROUTE /api/users/logout

    logout: (req, res, next) => {
        try {
             //clearing token from COOKIE

            res.clearCookie('userToken', { path: '/' })
            res.clearCookie('tokenExist', { path: '/' })
            res.status(200).json({ logout: true })
        } catch (error) {
            res.status(500).json({ message: "failed to logout" })
        }
    }
}