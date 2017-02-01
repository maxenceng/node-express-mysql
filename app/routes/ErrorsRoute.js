/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const router = require('express').Router()
const ErrorsController = require('../controllers/ErrorsController')

/**************************************************************
 * ROUTES
 *************************************************************/

router.get('/403', ErrorsController.err403)
router.get('/*', ErrorsController.err404)

/**************************************************************
 * EXPORT
 *************************************************************/

module.exports = router
