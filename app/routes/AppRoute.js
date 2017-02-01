/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const router = require('express').Router()
const AppController = require('../controllers/AppController')

/**************************************************************
 * ROUTES
 *************************************************************/

router.get('/test', AppController.test)
router.get('/', AppController.home)

/**************************************************************
 * EXPORT
 *************************************************************/

module.exports = router
