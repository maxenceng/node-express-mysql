/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const router = require('express').Router()
const StaticController = require('../controllers/StaticController')

/**************************************************************
 * ROUTES
 *************************************************************/

router.get('/css/bootstrap.min.css', StaticController.bootstrapcss)
router.get('/css/main.css', StaticController.maincss)
router.get('/js/bootstrap.min.js', StaticController.bootstrapjs)
router.get('/js/jquery.min.js', StaticController.jquery)
router.get('/js/test.js', StaticController.testjs)

/**************************************************************
 * EXPORT
 *************************************************************/

module.exports = router