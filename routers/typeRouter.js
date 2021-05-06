const router = require("express").Router();

const Type = require("../data/dataModel");

router.get("/", async (req, res) => {
  const types = await Type.findTypes();
  res.status(200).json(types);
});

router.post("/", async (req, res) => {
  const newType = req.body;
  if (!newType.name) {
    return res.status(400).json({ error: "Name is required" });
  }
  try {
    const added = await Type.addType(newType);
    res.status(201).json(added);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: "Error adding type" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedType = req.body;
  try {
    const updated = await Type.updateType(updatedType, id);
    res.status(200).json(updated);
  } catch {
    res.status(500).json({ error: "Error updating type" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Type.deleteType(id);
    if (deleted) res.status(204).end();
    else res.status(400).json({ error: "Type does not exist" });
  } catch {
    res.status(500).json({ error: "Error deleting type" });
  }
});

module.exports = router;
