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

const UserRoutes = require('./app/routes/UserRoute')
const ProfileRoutes = require('./app/routes/ProfileRoute')
const PostRoutes = require('./app/routes/PostRoute')
const AppRoutes = require('./app/routes/AppRoute')
const StaticRoutes = require('./app/routes/StaticRoute')
const ErrorsRoutes = require('./app/routes/ErrorsRoute')


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
app.use(UserRoutes)
app.use(ProfileRoutes)
app.use(PostRoutes)
app.use(AppRoutes)
app.use(StaticRoutes)
app.use(ErrorsRoutes)


/**************************************************************
 * SERVER
 *************************************************************/
app.listen(8000)

/**************************************************************
 * EXPORT FOR TESTS
 *************************************************************/

module.exports = app
