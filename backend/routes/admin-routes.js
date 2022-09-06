const { adminLogin, fetchAllApplication, updateStatus, adminLogout } = require('../controllers/adminController')
const { verifyAdminToken } = require('../middleware/verifyToken')
// const { route } = require('./user-routes')

const router = require('express').Router()

router.post('/login', adminLogin)
router.get('/all-applications', verifyAdminToken, fetchAllApplication)
router.put('/update-appstatus/:id', verifyAdminToken, updateStatus)
router.delete('/logout', verifyAdminToken, adminLogout)
module.exports = router