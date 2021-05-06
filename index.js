const express = require("express");
const server = express();

const typeRouter = require("./routers/typeRouter");
const categoryRouter = require("./routers/categoryRouter");
const recordRouter = require("./routers/recordRouter");

server.use(express.json());
server.use("/types", typeRouter);
server.use("/categories", categoryRouter);
server.use("/records", recordRouter);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Port ${PORT} istekler dinleniyor...`);
});
