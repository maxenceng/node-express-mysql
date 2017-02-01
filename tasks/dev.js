/**
 * DEV COMMANDS
 */

/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const gulp = require('gulp')
const nmon = require('gulp-nodemon')
const sass = require('gulp-sass')
const exec = require('child_process').exec


/**************************************************************
 * DEFAULT TASK
 *************************************************************/

gulp.task('default', ['dev', 'sass:watch'])

/**************************************************************
 * CONVERT SASS TO CSS
 *************************************************************/

gulp.task('sass', () => {
    return gulp.src('app/assets/sass/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/assets/css'))
})

/**************************************************************
 * WATCHERS
 *************************************************************/

gulp.task('sass:watch', () => {
    gulp.watch('app/assets/sass/*.sass', ['sass'])
})

gulp.task('dev', () => {
    nmon({script: 'server.js'})
})

/**************************************************************
 * RESET DATABASE DATA
 *************************************************************/

gulp.task('knex', (cb) => {
    exec('knex migrate:latest && knex seed:run', (err, stdout, stderr) => {
        console.log(stdout)
        console.log(stderr)
        cb(err)
    })
})


