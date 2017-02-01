/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const db = require('../configs/DatabaseConfig')
const partials = {header: 'header', footer: 'footer', nav: 'nav'}

/**************************************************************
 * CONTROLLERS
 *************************************************************/

function login(req, res, next) {
    return res.render('auth/login', {
        partials: partials,
    })
}

function logout(req, res, next) {
    req.session.destroy((err) => {
        return res.redirect('/')
    })
}

function signup(req, res, next) {
    return res.render('auth/signup', {
        partials: partials,
    })
}

/**************************************************************
 * EXPORTS
 *************************************************************/

module.exports = { login, logout, signup }
