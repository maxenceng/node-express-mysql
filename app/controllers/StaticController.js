/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const path = require('path')

/**************************************************************
 * CONTROLLERS
 *************************************************************/

function bootstrapcss(req, res, next) {
    res.sendFile(path.join(__dirname, '../assets/css/bootstrap.min.css'))
}

function maincss(req, res, next) {
    res.sendFile(path.join(__dirname, '../assets/css/main.css'))
}

function bootstrapjs(req, res, next) {
    res.sendFile(path.join(__dirname, '../assets/js/bootstrap.min.js'))
}

function jquery(req, res, next) {
    res.sendFile(path.join(__dirname, '../assets/js/jquery.min.js'))
}

function testjs(req, res, next) {
    res.sendFile(path.join(__dirname, '../assets/js/test.js'))
}

/**************************************************************
 * EXPORTS
 *************************************************************/

module.exports = { bootstrapcss, maincss, bootstrapjs, jquery, testjs }

