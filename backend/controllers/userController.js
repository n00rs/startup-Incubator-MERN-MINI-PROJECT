const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const Application = require('../models/applyFormModel')


module.exports = {

    //METHOD POST
    //ROUTE /api/users/signup

    userSignup: async (req, res, next) => {
        try {
            const { name, email, password } = req.body
            if (!name || !email || !password) {
                res.status(400)
                throw new Error('invalid signup credentials')
            }
            const userExist = await User.findOne({ email: email })
            console.log(userExist);
            if (userExist) {
                res.status(422)
                throw new Error(`user already exists please login !`)
            }

            const hashPassword = bcrypt.hashSync(password)
            const newUser = new User({ name, email, password: hashPassword })
            await newUser.save()
            res.status(200).json({ message: "signup Successfully", newUser })

        } catch (err) {
            console.log(err + 'error in signup');
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
            console.log(checkUser)
            if (checkUser && bcrypt.compareSync(password, checkUser.password)) {

                const token = jwt.sign({ id: checkUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

                console.log(token);
                res
                    .cookie(
                        'userToken', token, {
                        paht: '/',
                        httpOnly: true,
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                        sameSite: 'lax',
                        withCredentials: true
                    })
                    .cookie('tokenExist', true, {
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
            console.log(err + 'err in login')
            const statusCode = res.statusCode ? res.statusCode : 500
            res.status(statusCode).json(err.message)
        }
    },

    //METHOD GET
    //ROUTE /api/user/user

    fetchUser: async (req, res, next) => {
        try {
            console.log(req);
            const userId = req.userId
            if (!userId) {
                res.status(403)
                throw new Error('no token no authorization')
            }
            const user = await User.findById(userId, '-password')
            console.log(user)
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
            //checking whther userExist
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
                businessProposal: data.businessProposal
            }

            let applicationData = { userDetails, companyDetails }
            const newApplication = await Application.create(applicationData)
            res.status(201).json({ message: "form submitted succesfully", appId: newApplication._id })

        } catch (err) {
            const statusCode = res.statusCode ? res.statusCode : 500
            res.status(statusCode)
            res.json(err.message)
        }
    },

    //METHOD GET
    //ROUTE /api/users/view-application/:id

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
            const cookie = req.headers.cookie
            console.log(cookie);
            //clearing token from cookies
            res.clearCookie('userToken', { path: '/' })
            res.clearCookie('tokenExist', { path: '/' })
            res.status(200).json({ logout: true })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "failed to logout" })
        }
    }

}


    //    { "name": "jon",
    //     "email":"jon@123",
    //     "address":"baker Street 404",
    //     "city": "east London",
    //     "state":"london",
    //     "phone": "9633138136",
    //      "companyName": "K & K Autos",
    //     "teamBackground": "BackStreet Boys",
    //     "companyProducts": "small Spanners",
    //     "solvingProblem": "fixing small problems",
    //     "uniqueSolution": "spot fixing",
    //     "revenueModel": "non profitable",
    //     "marketSize": "urban to rural and stranded",
    //     "incubationType": "physical incubationT",
    //     "businessProposal": "share profit in future no equity"
    //    }