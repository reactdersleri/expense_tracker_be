const db = require("./dbConfig");

module.exports = {
  findTypes,
  addType,
  updateType,
  deleteType,
  findCategories,
  findCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
  findRecords,
  findRecordById,
  addRecord,
  updateRecord,
  deleteRecord,
};

function findTypes() {
  return db("type");
}

async function addType(newType) {
  const [id] = await db("type").insert(newType, "id");
  return db("type").where({ id }).first();
}

async function updateType(updatedType, id) {
  const updated = await db("type").update(updatedType).where({ id });
  if (updated) return db("type").where({ id }).first();
  else throw new Error();
}

async function deleteType(id) {
  return await db("type").del().where({ id });
}

async function findCategories() {
  return db("category")
    .join("type", "category.type_id", "type.id")
    .select(
      "category.id",
      "category.name",
      "type.name as typeName",
      "type.id as typeId",
      "type.color as typeColor"
    );
}

async function findCategoryById(id) {
  const found = await db("category")
    .join("type", "category.type_id", "type.id")
    .select(
      "category.id",
      "category.name",
      "type.name as typeName",
      "type.id as typeId",
      "type.color as typeColor"
    )
    .where({ "category.id": id })
    .first();

  if (found) return found;
  else throw new Error();
}

async function addCategory(newCategory) {
  const [id] = await db("category").insert(newCategory, "id");
  return db("category as c")
    .join("type as t", "c.type_id", "t.id")
    .select(
      "c.id as id",
      "c.name as name",
      "t.name as typeName",
      "t.id as typeId",
      "t.color as typeColor"
    )
    .where({ "c.id": id })
    .first();
}

async function updateCategory(updatedCategory, id) {
  const updated = await db("category").update(updatedCategory).where({ id });
  if (updated)
    return db("category")
      .join("type", "category.type_id", "type.id")
      .select(
        "category.id as id",
        "category.name as name",
        "type.name as typeName",
        "type.id as typeId",
        "type.color as typeColor"
      )
      .where({ "category.id": id })
      .first();
  else throw new Error();
}

function deleteCategory(id) {
  return db("category").del().where({ id });
}

async function findRecords() {
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
    );
}

async function findRecordById(id) {
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

async function addRecord(record) {
  const [id] = await db("record").insert(record, "id");

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
}

async function updateRecord(record, id) {
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

async function deleteRecord(id) {
  return db("record").del().where({ id });
}
