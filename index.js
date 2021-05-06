const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const server = express();

const typeRouter = require("./routers/typeRouter");
const categoryRouter = require("./routers/categoryRouter");
const recordRouter = require("./routers/recordRouter");

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use("/types", typeRouter);
server.use("/categories", categoryRouter);
server.use("/records", recordRouter);

server.get("/", (req, res) => {
  res.status(200).json(req.headers);
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Port ${PORT} istekler dinleniyor...`);
});
