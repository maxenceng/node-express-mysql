/**************************************************************
 * SEED
 *************************************************************/

exports.seed = function(knex, Promise) {
  // Delete ALL existing entries
  return Promise.join(
    knex('posts').del(),
    knex('users').del()
  )
}
