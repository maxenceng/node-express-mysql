/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const db = require('../configs/DatabaseConfig')
const partials = {header: 'header', footer: 'footer', nav: 'nav'}

/**************************************************************
 * CONTROLLERS
 *************************************************************/

function test(req, res, next) {
    return res.render('home/index')
}

function home(req, res, next) {
    if(req.isAuthenticated()) {
        db('users')
            .where('id', req.user.id)
            .then((users) => {
                res.render('home/authenticated', {
                    users: users,
                    partials: partials,
                })
            })
    } else {
        res.render('home/welcome', {
            partials: partials,
        })
    }
}

/**************************************************************
 * EXPORTS
 *************************************************************/

module.exports = { test, home }
