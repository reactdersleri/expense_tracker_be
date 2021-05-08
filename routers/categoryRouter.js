const router = require("express").Router();

const Category = require("../data/models/categoryModel");

router.get("/", async (req, res) => {
  const { id: userId } = req.decodedToken;
  try {
    const categories = await Category.find(userId);

    res
      .status(200)
      .json(categories.map((cat) => ({ ...cat, user_id: undefined })));
  } catch {
    res.status(500).json({ error: "Error fetching categories" });
  }
});

router.post("/", async (req, res) => {
  const { id: userId } = req.decodedToken;
  const newCategory = req.body;
  newCategory.user_id = userId;

  if (!newCategory.name) {
    res.status(400).json({ error: "Name is required" });
  } else if (
    newCategory.type &&
    newCategory.type !== "expense" &&
    newCategory.type !== "income"
  ) {
    res.status(400).json({ error: "Type must be 'expense' or 'income'" });
  } else {
    try {
      const category = await Category.add(newCategory);
      delete category.user_id;
      res.status(201).json(category);
    } catch {
      res.status(500).json({ error: "Error adding category" });
    }
  }
});

router.put("/:id", async (req, res) => {
  const { id: userId } = req.decodedToken;
  const { id: updateId } = req.params;
  const updatedCategory = req.body;

  if (!updatedCategory.name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    const found = await Category.findById(updateId);
    if (!found) {
      return res.status(404).json({ error: "Category not found" });
    } else if (found?.user_id !== userId) {
      return res.status(401).json({ error: "Not authorized" });
    }
    const updated = await Category.update(updatedCategory, updateId);
    delete updated.user_id;
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: "Error updating category" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id: userId } = req.decodedToken;
  const { id } = req.params;

  try {
    const found = await Category.findById(id);
    if (!found) {
      return res.status(404).json({ error: "Category not found" });
    }
    if (found.user_id !== userId) {
      return res.status(401).json({ error: "Not authorized" });
    }
    await Category.remove(id);
    res.status(204).end();
  } catch {
    res.status(500).json({ error: "Error deleting category" });
  }
});

module.exports = router;
