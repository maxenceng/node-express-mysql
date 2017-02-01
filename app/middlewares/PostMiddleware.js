/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const db = require('../configs/DatabaseConfig')

/**************************************************************
 * MIDDLEWARES
 *************************************************************/

function validId(req, res, next) {
    const errReq = {
        error: "The ID of this post is not valid",
        bodyReq: req.body
    }
    if(req.body.id === undefined) {
        return res.status(400).json(errReq)
    }
    db('posts')
        .where('id', req.body.id)
        .first()
        .then((posts) => {
            if(posts) {
                return res.status(400).json(errReq)
            }
            next()
        })
}

function validData(req, res, next) {
    const errReq = {
        error: "The data of this post is not valid",
        bodyReq: req.body
    }
    if(req.body.title === undefined) {
        return res.status(400).json(errReq)
    }
    if(req.body.text === undefined) {
        return res.status(400).json(errReq)
    }
    next()
}

/**************************************************************
 * EXPORTS
 *************************************************************/

module.exports = { validId, validData }