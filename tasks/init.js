/**
 * INIT COMMANDS
 */

/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const gulp = require('gulp')
const exec = require('child_process').exec

gulp.task('init', ['mysql', 'redis', 'knex-init'])


gulp.task('mysql', (cb) => {
    exec('mysql -u root -e "create database myapp" -p', (err, stdout, stderr) => {
        console.log(stdout)
        console.log(stderr)
        cb(err)
    })
})

gulp.task('redis', ['mysql'], (cb) => {
    exec('systemctl start redis', (err, stdout, stderr) => {
        console.log(stdout)
        console.log(stderr)
        cb(err)
    })
})

gulp.task('knex-init', ['mysql'], (cb) => {
    exec('knex migrate:latest && knex seed:run', (err, stdout, stderr) => {
        console.log(stdout)
        console.log(stderr)
        cb(err)
    })
})
