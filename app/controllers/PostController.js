/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const db = require('../configs/DatabaseConfig')
const Post = require('../models/Post')

/**************************************************************
 * CONTROLLERS
 *************************************************************/

function getAll(req, res, next) {
    Post.readAll(res, next)
}

function post(req, res, next) {
    Post.save(req.body, res, next)
}

function getId(req, res, next) {
    const { id } = req.params
    const errReq = {
        error: "This ID is not in the database",
        bodyReq: id
    }
    Post.readOne(id, errReq, res, next)
}

function put(req, res, next) {
    const { id } = req.params
    const data = {
        reqId: id,
        bodyReq: req.body
    }
    Post.update(id, req.body, data, res, next)
}

function del(req, res, next) {
    const { id } = req.params
    const data = {
        reqId: id
    }
    Post.remove(id, data, res, next)
}

/**************************************************************
 * EXPORTS
 *************************************************************/

module.exports = { getAll, post, getId, put, del }
