const express = require("express");
const server = express();

const typeRouter = require("./routers/typeRouter");
const categoryRouter = require("./routers/categoryRouter");
const recordRouter = require("./routers/recordRouter");

server.use(express.json());
server.use("/types", typeRouter);
server.use("/categories", categoryRouter);
server.use("/records", recordRouter);

server.listen(5000, () => {
  console.log("Port 5000 istekler dinleniyor...");
});
