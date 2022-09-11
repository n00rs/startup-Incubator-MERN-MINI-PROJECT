const { userSignup, userLogin, newApplication, viewApplication, viewAllApplication, logout, fetchUser, upload,  } = require('../controllers/userController')
const {verifyToken }= require('../middleware/verifyToken')
const http = require('http')
const router = require('express').Router()

router.post('/signup', userSignup)

router.post('/login', userLogin)

router.delete('/logout',verifyToken, logout)

router.post('/apply',verifyToken,upload.single("companyLogo"),newApplication)

router.get('/view-application/:id',verifyToken,viewApplication)

router.get('/view-all',verifyToken,viewAllApplication)

router.get('/user',verifyToken, fetchUser)






module.exports = router