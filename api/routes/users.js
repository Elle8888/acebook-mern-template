const express = require('express')
const router = express.Router()

const UsersController = require('../controllers/users')

router.post('/', UsersController.Create)
router.post('/updateProfilePicture', UsersController.UpdateProfilePicture)
router.get('/profile/:username', UsersController.getProfile)

module.exports = router
