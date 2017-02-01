/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const db = require('../configs/DatabaseConfig')

/**************************************************************
 * CONTROLLERS
 *************************************************************/

function getAll(req, res, next) {
    db('posts').then((posts) => {
        res.send(posts)
    }, next)
}

function post(req, res, next) {
    db('posts')
        .insert(req.body)
        .then((postIds) => {
            res.json({message: "Success!", post: req.body})
        }, next)
}

function getId(req, res, next) {
    const { id } = req.params
    const errReq = {
        error: "This ID is not in the database",
        bodyReq: id
    }
    db('posts')
        .where('id', id)
        .first()
        .then((posts) => {
            if(!posts) {
                return res.status(400).json(errReq)
            }
            res.json(posts)
        }, next)
}

function put(req, res, next) {
    const { id } = req.params
    const data = {
        reqId: id,
        bodyReq: req.body
    }
    db('posts')
        .where('id', id)
        .update(req.body)
        .then((result) => {
            if(result === 0) {
                const failed = "Post not updated!"
                return res.status(400).json({message: failed, data: data})
            }
            const success = "Post updated!"
            return res.status(200).json({message: success, data: data})
        }, next)
}

function del(req, res, next) {
    const { id } = req.params
    const data = {
        reqId: id
    }
    db('posts')
        .where('id', id)
        .delete()
        .then((result) => {
            if(result === 0) {
                const failed = "Post not deleted!"
                return res.status(400).json({message: failed, data: data})
            }
            const success = "Post deleted!"
            return res.status(200).json({message: success, data: data})
        }, next)
}

/**************************************************************
 * EXPORTS
 *************************************************************/

module.exports = { getAll, post, getId, put, del }
