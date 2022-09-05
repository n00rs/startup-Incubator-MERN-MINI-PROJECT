const { adminLogin, fetchAllApplication, updateStatus } = require('../controllers/adminController')
const { verifyAdminToken } = require('../middleware/verifyToken')
// const { route } = require('./user-routes')

const router = require('express').Router()

router.post('/login', adminLogin)
 router.get('/all-applications',verifyAdminToken,fetchAllApplication)
 router.put('/update-appstatus/:id', verifyAdminToken,updateStatus)
module.exports =router