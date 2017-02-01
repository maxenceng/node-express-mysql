/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const db = require('../configs/DatabaseConfig')
const bcrypt = require('bcrypt-nodejs')
const randomstring = require('randomstring')
const mailer = require('express-mailer')
const partials = {header: 'header', footer: 'footer', nav: 'nav'}
const app = require('express')() // Required for express-mailer
app.set('view engine', 'hjs')
app.set('views', __dirname + '/../views')

const YOUR_NAME = ''
const YOUR_GMAIL_ADRESS = ''
const YOUR_GMAIL_PASSWORD = ''

/**************************************************************
 * CONFIG
 *************************************************************/

// Parameters for the mailing service
mailer.extend(app, {
    from: YOUR_NAME,
    host: 'smtp.gmail.com', // Hostname
    secureConnection: true, // Use SSL
    port: 465, // Port for secure SMTP
    transportMethod: 'SMTP', // Default is SMTP.
    auth: {
        user: YOUR_GMAIL_ADRESS, // Email ID
        pass: YOUR_GMAIL_PASSWORD // gmail password
    }
})

/**************************************************************
 * CONTROLLERS
 *************************************************************/

function getProfile(req, res, next) {
    db('users')
        .where('id', req.user.id)
        .then((users) => {
            res.render('home/profile', {
                users: users,
                partials: partials,
            })
        })
}

function postProfile(req, res, next) {
    db('users')
        .where('id', req.user.id)
        .then((users) => {
            const params = {
                users: users,
                partials: partials,
                error: 1,
            }
            if(req.body.new !== req.body.new2) {
                return res.render('home/profile', params)
            }
            if(!bcrypt.compareSync(req.body.current, users[0].password)) {
                return res.render('home/profile', params)
            }
            if(bcrypt.compareSync(req.body.new, users[0].password)) {
                return res.render('home/profile', params)
            }
            const newPass = {
                password: bcrypt.hashSync(req.body.new),
            }
            db('users')
                .where('id', req.user.id)
                .update(newPass)
                .then((result) => {
                    if(result === 0) {
                        return res.render('home/profile', params)
                    }
                    return res.redirect('/')
                })
        })
}

function getForgot(req, res, next) {
    res.render('home/forgot', {
        partials: partials,
    })
}

function postForgot(req, res, next) {
    db('users')
        .where('email', req.body.email)
        .first()
        .then((user) => {
            if(!user) {
                return res.render('home/forgot', {
                    user: user,
                    partials: partials,
                    error: 1,
                })
            } else {
                const passString = randomstring.generate()
                const mailOptions = {
                    to: req.body.email,
                    subject: 'Forgotten password',
                    message: passString
                }
                const newPass = {
                    password: bcrypt.hashSync(passString),
                }
                db('users')
                    .where('email', req.body.email)
                    .update(newPass)
                    .then((results) => {})
                app.mailer.send('email', mailOptions, (err, message) => {
                    if(err) {
                        console.log(err)
                        res.send('There was an errors sending the email')
                    }
                    return res.redirect('/')
                })
            }
        })
}

/**************************************************************
 * EXPORTS
 *************************************************************/

module.exports = { getProfile, postProfile, getForgot, postForgot }
