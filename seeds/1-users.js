/**************************************************************
 * DEPENDENCIES
 *************************************************************/
const bcrypt = require('bcrypt-nodejs')


/**************************************************************
 * PASSWORD HASHING
 *************************************************************/
const pass = bcrypt.hashSync('test')


/**************************************************************
 * SEED
 *************************************************************/

exports.seed = function(knex, Promise) {
  // Delete ALL existing entries
  return Promise.all([
    // Insert seed entries
    knex('users').insert({id: 1, email: 'test1@test.com', password: pass}),
    knex('users').insert({id: 2, email: 'test2@test.com', password: pass}),
    knex('users').insert({id: 3, email: 'test3@test.com', password: pass})
  ])
}
