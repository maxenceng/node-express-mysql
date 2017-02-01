/**************************************************************
 * SEED
 *************************************************************/

exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('posts').insert({id: 1, title: 'title #1', text: 'post #1', user_id: 1}),
    knex('posts').insert({id: 2, title: 'title #2', text: 'post #2', user_id: 2}),
    knex('posts').insert({id: 3, title: 'title #3', text: 'post #3', user_id: 2})
  ])
}
