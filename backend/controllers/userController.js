const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')


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
        // res.json('hi from login')
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
                res.cookie(
                    'jwtToken', token, {
                    paht: '/',
                    httpOnly: true,
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                    sameSite: 'lax'

                }
                )
                res.status(200).json({ checkUser, token })
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
    }






} 