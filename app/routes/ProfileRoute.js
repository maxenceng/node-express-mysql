/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const router = require('express').Router()
const UserMiddleware = require('../middlewares/UserMiddleware')
const ProfileController = require('../controllers/ProfileController')

/**************************************************************
 * ROUTES
 *************************************************************/

router.get('/profile',
        UserMiddleware.loginRequired,
        ProfileController.getProfile)
router.post('/profile',
        UserMiddleware.loginRequired,
        ProfileController.postProfile)
router.get('/forgot',
        UserMiddleware.authenticated,
        ProfileController.getForgot)
router.post('/forgot',
        UserMiddleware.authenticated,
        ProfileController.postForgot)

/**************************************************************
 * EXPORT
 *************************************************************/

module.exports = router
