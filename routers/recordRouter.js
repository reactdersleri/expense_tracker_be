const router = require("express").Router();

const Record = require("../data/models/recordModel");
const recordMapper = require("../utils/recordMapper");

router.get("/", async (req, res, next) => {
  try {
    const records = await Record.find();
    res.status(200).json(records.map(recordMapper));
  } catch (error) {
    console.log({ error });
    next([500, "Error fetching records"]);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id: recordId } = req.params;
  try {
    const record = await Record.findById(recordId);
    if (record) {
      res.status(200).json(recordMapper(record));
    } else next([404, "Record not found"]);
  } catch (error) {
    console.log({ error });
    next([500, "Error fetching record"]);
  }
});

router.post("/", async (req, res, next) => {
  const newRecord = req.body;
  if (!newRecord.category_id || !newRecord.amount || !newRecord.title) {
    next([400, "Title, category, and amount fields are required"]);
  } else {
    try {
      const record = await Record.add(newRecord);
      res.status(201).json(recordMapper(record));
    } catch (error) {
      console.log({ error });
      next([500, "Error adding a new record"]);
    }
  }
});

router.put("/:id", async (req, res, next) => {
  const { id: updateId } = req.params;
  const updatedRecord = req.body;

  if (typeof updatedRecord.title === "string" && updatedRecord.title === "") {
    next([400, "Tittle cannot be empty"]);
  }

  try {
    const record = await Record.update(updatedRecord, updateId);
    res.status(200).json(recordMapper(record));
  } catch (error) {
    console.log({ error });
    next([500, "Error updating record"]);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleted = await Record.remove(id);
    if (deleted) {
      res.status(204).end();
    } else {
      next([400, "No record found"]);
    }
  } catch (error) {
    console.log({ error });
    next([500, "Error deleting record"]);
  }
});

module.exports = router;
