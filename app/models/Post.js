/**************************************************************
 * DEPENDENCIES
 *************************************************************/


const db = require('../configs/DatabaseConfig')

/**************************************************************
 * MODEL
 *************************************************************/

function readAll(res, next) {
    db('posts').then((posts) => {
        res.send(posts)
    }, next)
}

function save(body, res, next) {
    db('posts')
        .insert(body)
        .then((postIds) => {
            res.json({message: "Success!", post: body})
        }, next)
}

function readOne(id, errReq, res, next) {
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

function update(id, body, data, res, next) {
    db('posts')
        .where('id', id)
        .update(body)
        .then((result) => {
            if(result === 0) {
                const failed = "Post not updated!"
                return res.status(400).json({message: failed, data: data})
            }
            const success = "Post updated!"
            return res.status(200).json({message: success, data: data})
        }, next)
}

function remove(id, data, res, next) {
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


module.exports = { readAll, save, readOne, update, remove }