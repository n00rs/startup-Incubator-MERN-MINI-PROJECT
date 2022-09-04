const { adminLogin } = require('../controllers/adminController')

const router = require('express').Router()

router.post('/login', adminLogin)

module.exports =router