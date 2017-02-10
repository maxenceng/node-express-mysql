/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const app = require('express')()
app.set('view engine', 'hjs')
app.set('views', __dirname + '/../views')
const db = require('../configs/DatabaseConfig')
const randomstring = require('randomstring')
const bcrypt = require('bcrypt-nodejs')
const partials = {header: 'header', footer: 'footer', nav: 'nav'}

/**************************************************************
 * CONFIG
 *************************************************************/

const mail = require('../../mailfile')
const mailer = require('express-mailer')

const YOUR_NAME = mail.YOUR_NAME
const YOUR_GMAIL_ADRESS = mail.YOUR_GMAIL_ADRESS
const YOUR_GMAIL_PASSWORD = mail.YOUR_GMAIL_PASSWORD

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
 * MODEL
 *************************************************************/

function read(id, res, next) {
    db('users')
        .where('id', id)
        .then((users) => {
            res.render('home/profile', {
                users: users,
                partials: partials,
            })
        })
}

function save(id, body, res, next) {
    db('users')
        .where('id', id)
        .then((users) => {
            const params = {
                users: users,
                partials: partials,
                error: 1,
            }
            if(body.new !== body.new2) {
                return res.render('home/profile', params)
            }
            if(!bcrypt.compareSync(body.current, users[0].password)) {
                return res.render('home/profile', params)
            }
            if(bcrypt.compareSync(body.new, users[0].password)) {
                return res.render('home/profile', params)
            }
            const newPass = {
                password: bcrypt.hashSync(body.new),
            }
            db('users')
                .where('id', id)
                .update(newPass)
                .then((result) => {
                    if(result === 0) {
                        return res.render('home/profile', params)
                    }
                    return res.redirect('/')
                })
        })
}

function saveForgot(email, res, next) {
    db('users')
        .where('email', email)
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
                    to: email,
                    subject: 'Forgotten password',
                    message: passString
                }
                const newPass = {
                    password: bcrypt.hashSync(passString),
                }
                db('users')
                    .where('email', email)
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


module.exports = { read, save, saveForgot }