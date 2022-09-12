const { adminLogin, fetchAllApplication, updateStatus, adminLogout, addSlot, fetchSlots, allotSlot } = require('../controllers/adminController')
const { verifyAdminToken } = require('../middleware/verifyToken')
// const { route } = require('./user-routes')

const router = require('express').Router()

router.post('/login', adminLogin)
router.get('/all-applications', verifyAdminToken, fetchAllApplication)
router.delete('/logout', verifyAdminToken, adminLogout)
router.put('/update-appstatus/:id', verifyAdminToken, updateStatus)
router.post('/addSlot', verifyAdminToken, addSlot)
router.get('/slots-available',verifyAdminToken,fetchSlots)
router.post('/allot-slot',verifyAdminToken, allotSlot )

module.exports = router