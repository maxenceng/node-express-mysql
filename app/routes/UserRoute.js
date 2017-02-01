/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const router = require('express').Router()
const passport = require('passport')
const UserController = require('../controllers/UserController')
const UserMiddleware = require('../middlewares/UserMiddleware')

/**************************************************************
 * ROUTES
 *************************************************************/

router.get('/login',
        UserMiddleware.authenticated,
        UserController.login)
router.post('/login',
        UserMiddleware.authenticated,
        passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
        }))
router.get('/logout',
        UserMiddleware.loginRequired,
        UserController.logout)
router.get('/signup',
        UserMiddleware.authenticated,
        UserController.signup)
router.post('/signup',
        UserMiddleware.authenticated,
        passport.authenticate('local-register', {
        successRedirect: '/',
        failureRedirect: '/signup'
        }))

/**************************************************************
 * EXPORT
 *************************************************************/

module.exports = router
