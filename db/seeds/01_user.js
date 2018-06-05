const faker = require('faker');
const {hash} = require('../../config/hasher.js');
const {num_users} = require('../../config/seedInfo.js');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      return makeFakeUsers().then(doctors => {
        return knex('user').insert(doctors);
      })
    });
};


function makeFakeUsers() {

  return new Promise(function (resolve, reject) {
    const users = [];

    let users_pushed = 0;

    for (let i = 0; i < num_users; i++) {
      const user = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: 'test'
      };

      hash(user).then(hashedUser => {
        users.push(hashedUser);
        if (++users_pushed === num_users) {
          resolve(users)
        }
      })
    }
  })
}