/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const partials = {header: 'header', footer: 'footer', nav: 'nav'}

/**************************************************************
 * CONTROLLERS
 *************************************************************/

function err403(req, res, next) {
    return res.render('errors/403', { partials: partials })
}

function err404(req, res, next) {
    return res.render('errors/404', { partials: partials })
}

/**************************************************************
 * EXPORTS
 *************************************************************/

module.exports = { err403, err404 }
