module.exports = {
  findByUsername,
  addUser,
};

const db = require("../dbConfig");

function findByUsername(username) {
  return db("user").where({ username }).first();
}

function addUser(user) {
  return db("user")
    .insert(user, "id")
    .then(([id]) => {
      return db("user").where({ id }).first();
    });
}
