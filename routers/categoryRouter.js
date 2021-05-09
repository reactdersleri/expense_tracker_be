const router = require("express").Router();

const Category = require("../data/models/categoryModel");

router.get("/", async (req, res, next) => {
  const { id: userId } = req.decodedToken;
  try {
    const categories = await Category.find(userId);

    res.status(200).json(categories.map((cat) => ({ ...cat, user_id: undefined })));
  } catch (error) {
    console.log({ error });
    next([500, "Error fetching categories"]);
  }
});

router.post("/", async (req, res, next) => {
  const { id: userId } = req.decodedToken;
  const newCategory = req.body;
  newCategory.user_id = userId;

  if (!newCategory.name) {
    next([400, "Name is required"]);
  } else if (newCategory.type && newCategory.type !== "expense" && newCategory.type !== "income") {
    next([400, "Type must be 'expense' or 'income'"]);
  } else {
    try {
      const category = await Category.add(newCategory);
      delete category.user_id;
      res.status(201).json(category);
    } catch (error) {
      console.log({ error });
      next([500, "Error adding category"]);
    }
  }
});

router.put("/:id", async (req, res, next) => {
  const { id: userId } = req.decodedToken;
  const { id: updateId } = req.params;
  const updatedCategory = req.body;

  if (!updatedCategory.name) {
    next([400, "Name is required"]);
  }

  try {
    const found = await Category.findById(updateId);
    if (!found) {
      next([404, "Category not found"]);
    } else if (found?.user_id !== userId) {
      next([401, "Not authorized"]);
    }
    const updated = await Category.update(updatedCategory, updateId);
    delete updated.user_id;
    res.status(200).json(updated);
  } catch (error) {
    console.log({ error });
    next([500, "Error updating category"]);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id: userId } = req.decodedToken;
  const { id } = req.params;

  try {
    const found = await Category.findById(id);
    if (!found) {
      next([404, "Category not found"]);
    }
    if (found.user_id !== userId) {
      next([401, "Not authorized"]);
    }
    await Category.remove(id);
    res.status(204).end();
  } catch (error) {
    console.log({ error });
    next([500, "Error deleting category"]);
  }
});

module.exports = router;
