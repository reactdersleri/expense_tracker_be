const db = require("../dbConfig");

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
};

async function find(user_id) {
  return db("category").where({ user_id });
}

async function findById(id) {
  return db("category").where({ id }).first();
}

async function add(newCategory) {
  const [id] = await db("category").insert(newCategory, "id");
  return db("category").where({ id }).first();
}

async function update(updatedCategory, id) {
  const updated = await db("category").update(updatedCategory).where({ id });
  if (updated) return db("category").where({ id }).first();
  else throw new Error();
}

function remove(id) {
  return db("category").del().where({ id });
}
