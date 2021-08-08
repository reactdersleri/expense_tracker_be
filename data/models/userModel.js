module.exports = {
  findById,
  findByUsername,
  findByEmail,
  addUser,
};

const db = require("../dbConfig");

function findById(id) {
  return db("user").where({ id }).first();
}

function findByUsername(username) {
  return db("user").where({ username }).first();
}

function findByEmail(email) {
  return db("user").where({ email }).first();
}

function addUser(user) {
  return db("user")
    .insert(user, "id")
    .then(([id]) => {
      return db("user").where({ id }).first();
    });
}
