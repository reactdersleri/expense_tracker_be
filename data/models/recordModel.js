const db = require("../dbConfig");

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
};

async function find() {
  return db("record as r")
    .join("category as c", "r.category_id", "c.id")
    .select(
      "r.id",
      "r.title",
      "r.amount",
      "c.name as categoryName",
      "c.id as categoryId",
      "c.type as type",
      "c.color as color"
    );
}

async function findById(id) {
  const found = await db("record as r")
    .join("category as c", "r.category_id", "c.id")
    .join("type as t", "t.id", "c.type_id")
    .select(
      "r.id",
      "r.title",
      "r.amount",
      "c.name as categoryName",
      "c.id as categoryId",
      "t.id as typeId",
      "t.name as typeName",
      "t.color as typeColor"
    )
    .where({ "r.id": id })
    .first();
  if (found) return found;
  else throw new Error();
}

async function add(record) {
  const [id] = await db("record").insert(record, "id");

  return db("record as r")
    .join("category as c", "r.category_id", "c.id")
    .select(
      "r.id",
      "r.title",
      "r.amount",
      "c.name as categoryName",
      "c.id as categoryId",
      "c.type as type",
      "c.color as color"
    )
    .where({ "r.id": id })
    .first();
}

async function update(record, id) {
  const updated = await db("record").update(record).where({ id });

  if (updated)
    return db("record as r")
      .join("category as c", "r.category_id", "c.id")
      .join("type as t", "t.id", "c.type_id")
      .select(
        "r.id",
        "r.title",
        "r.amount",
        "c.name as categoryName",
        "c.id as categoryId",
        "t.id as typeId",
        "t.name as typeName",
        "t.color as typeColor"
      )
      .where({ "r.id": id })
      .first();
  else throw new Error();
}

async function remove(id) {
  return db("record").del().where({ id });
}
