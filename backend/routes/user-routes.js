const { userSignup, userLogin, newApplication, viewApplication, viewAllApplication, logout } = require('../controllers/userController')
const {verifyToken }= require('../middleware/verifyToken')

const router = require('express').Router()

router.post('/signup', userSignup)

router.post('/login', userLogin)

router.post('/apply',verifyToken,newApplication)

router.get('/view-application/:id',verifyToken,viewApplication)

router.get('/view-all',verifyToken,viewAllApplication)

router.delete('/logout',verifyToken, logout)






module.exports = router