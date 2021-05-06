const router = require("express").Router();

const Type = require("../data/dataModel");

router.get("/", async (req, res) => {
  const types = await Type.findTypes();
  res.status(200).json(types);
});

module.exports = router;
