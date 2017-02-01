/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const db = require('./DatabaseConfig')
const bcrypt = require('bcrypt-nodejs')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const validator = require('validator')

/**************************************************************
 * CONFIG
 *************************************************************/

passport.use(new localStrategy(authenticate))
passport.use('local-register', new localStrategy({passReqToCallback: true}, register))


/**************************************************************
 * CONTROLLERS
 *************************************************************/
function authenticate(email, password, done) {
    db('users')
        .where('email', email)
        .first()
        .then((user) => {
            if(!user || !bcrypt.compareSync(password, user.password)) {
                return done(null, false, {message: "Invalid user and password combination"})
            }
            done(null, user)
        }, done)
}

function register(req, email, password, done) {
    db('users')
        .where('email', email)
        .first()
        .then((user) => {
            if(user) {
                return done(null, false, {message: "An account with that email has already been created"})
            }
            if(password !== req.body.password2) {
                return done(null, false, {message: "Passwords don't match"})
            }
            if(!validator.isEmail(email)) {
                return done(null, false, {message: "Email is not correct"})
            }
            const newUser = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: email,
                password: bcrypt.hashSync(password),
            }

            db('users')
                .insert(newUser)
                .then((ids) => {
                    newUser.id = ids[0]
                    done(null, newUser)
                })
        })
}

/**************************************************************
 * SERIALIZE & DESERIALIZE
 *************************************************************/

passport.serializeUser(function(user, done) {
    done(null, user.id)
})

passport.deserializeUser(function(id, done) {
    db('users')
        .where('id', id)
        .first()
        .then((user) => {
            done(null, user)
        })
})
