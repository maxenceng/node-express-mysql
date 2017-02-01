/**************************************************************
 * MIDDLEWARES
 *************************************************************/

function loginRequired(req, res, next) {
    if(!req.isAuthenticated()) {
        return res.redirect('/auth/')
    }
    next()
}

function adminRequired(req, res, next) {
    if(!req.user.is_admin) {
        return res.redirect('/403')
    }
    next()
}

function authenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return res.redirect('/auth/')
    }
    next()
}

/**************************************************************
 * EXPORTS
 *************************************************************/

module.exports = { loginRequired, adminRequired, authenticated }