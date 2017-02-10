/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const partials = {header: 'header', footer: 'footer', nav: 'nav'}
const Profile = require('../models/Profile')



/**************************************************************
 * CONTROLLERS
 *************************************************************/

function getProfile(req, res, next) {
    Profile.read(req.user.id, res, next)
}

function postProfile(req, res, next) {
    Profile.save(req.user.id, req.body, res, next)
}

function getForgot(req, res, next) {
    res.render('home/forgot', {
        partials: partials,
    })
}

function postForgot(req, res, next) {
    Profile.saveForgot(req.body.email, res, next)
}

/**************************************************************
 * EXPORTS
 *************************************************************/

module.exports = { getProfile, postProfile, getForgot, postForgot }
