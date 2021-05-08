const router = require("express").Router();

const Record = require("../data/models/recordModel");
const recordMapper = require("../utils/recordMapper");

router.get("/", async (req, res) => {
  try {
    const records = await Record.find();
    res.status(200).json(records.map(recordMapper));
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: "Error fetching records" });
  }
});

router.get("/:id", async (req, res) => {
  const { id: recordId } = req.params;
  try {
    const record = await Record.findById(recordId);
    if (record) {
      res.status(200).json(recordMapper(record));
    } else res.status(404).json({ error: "Record not found." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching record" });
  }
});

router.post("/", async (req, res) => {
  const newRecord = req.body;
  if (!newRecord.category_id || !newRecord.amount || !newRecord.title) {
    return res.status(400).json({
      error: "You must provide a title, a category and an amount for a record.",
    });
  } else {
    try {
      const record = await Record.add(newRecord);
      res.status(201).json(recordMapper(record));
    } catch (error) {
      console.log({ error });
      res.status(500).json({ error: "Error adding a new record" });
    }
  }
});

router.put("/:id", async (req, res) => {
  const { id: updateId } = req.params;
  const updatedRecord = req.body;

  if (typeof updatedRecord.title === "string" && updatedRecord.title === "") {
    return res.status(400).json({
      error: "Title cannot be empty",
    });
  }

  try {
    const record = await Record.update(updatedRecord, updateId);
    res.status(200).json(recordMapper(record));
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: "Error updating record" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Record.remove(id);
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(400).json({ error: "No record found" });
    }
  } catch {
    res.status(500).json({ error: "Error deleting record" });
  }
});

module.exports = router;
