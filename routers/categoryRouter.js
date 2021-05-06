const router = require("express").Router();

const Category = require("../data/dataModel");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.findCategories();

    res.status(200).json(
      categories.map(({ id, name, ...type }) => {
        return {
          id,
          name,
          type: { id: type.typeId, name: type.typeName, color: type.typeColor },
        };
      })
    );
  } catch {
    res.status(500).json({ error: "Error fetching categories" });
  }
});

router.get("/:id", async (req, res) => {
  const { id: categoryId } = req.params;
  try {
    const category = await Category.findCategoryById(categoryId);

    const { id, name, ...type } = category;
    res.status(200).json({
      id,
      name,
      type: { id: type.typeId, name: type.typeName, color: type.typeColor },
    });
  } catch {
    res.status(400).json({ error: "Category not found." });
  }
});

router.post("/", async (req, res) => {
  const newCategory = req.body;

  if (!newCategory.name || !newCategory.type_id) {
    res.status(400).json({
      error: "You must provide a name and a type for a new category.",
    });
  } else {
    try {
      const { id, name, ...type } = await Category.addCategory(newCategory);
      res.status(201).json({
        id,
        name,
        type: { id: type.typeId, name: type.typeName, color: type.typeColor },
      });
    } catch {
      res.status(500).json({ error: "Error adding category" });
    }
  }
});

router.put("/:id", async (req, res) => {
  const { id: updateId } = req.params;
  const updatedCategory = req.body;

  try {
    const { id, name, ...type } = await Category.updateCategory(
      updatedCategory,
      updateId
    );
    res.status(200).json({
      id,
      name,
      type: { id: type.typeId, name: type.typeName, color: type.typeColor },
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating category" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await Category.deleteCategory(id);
  res.status(204).end();
});

module.exports = router;
