/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const methodOverride = require('method-override')
const passport = require('passport')
const app = express()

/**************************************************************
 * PASSPORT CONFIG
 *************************************************************/
require('./app/configs/PassportConfig')


/**************************************************************
 * ROUTES INIT
 *************************************************************/

const UserRoute = require('./app/routes/UserRoute')
const ProfileRoute = require('./app/routes/ProfileRoute')
const PostRoute = require('./app/routes/PostRoute')
const AppRoute = require('./app/routes/AppRoute')
const StaticRoute = require('./app/routes/StaticRoute')
const ErrorsRoute = require('./app/routes/ErrorsRoute')


/**************************************************************
 * MIDDLEWARES
 *************************************************************/

app.set('view engine', 'hjs')
app.set('views', __dirname + '/app/views')
app.use(methodOverride('_method'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
    store: new RedisStore(),
    secret: 'This is a secret',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

/**************************************************************
 * ROUTING
 *************************************************************/
app.use(UserRoute)
app.use(ProfileRoute)
app.use(PostRoute)
app.use(AppRoute)
app.use(StaticRoute)
app.use(ErrorsRoute)


/**************************************************************
 * SERVER
 *************************************************************/
app.listen(8000)

/**************************************************************
 * EXPORT FOR TESTS
 *************************************************************/

module.exports = app
