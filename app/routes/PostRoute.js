/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const router = require('express').Router()
const PostMiddleware = require('../middlewares/PostMiddleware')
const PostController = require('../controllers/PostController')

/**************************************************************
 * ROUTES
 *************************************************************/

router.get('/api', PostController.getAll)
router.get('/api/:id', PostController.getId)
router.post('/api',
        PostMiddleware.validId,
        PostMiddleware.validData,
        PostController.post)
router.put('/api/:id', PostController.put)
router.delete('/api/:id', PostController.del)

/**************************************************************
 * EXPORT
 *************************************************************/

module.exports = router
