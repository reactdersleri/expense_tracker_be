const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const server = express();
const authenticator = require("./middleware/authenticator");

const categoryRouter = require("./routers/categoryRouter");
const recordRouter = require("./routers/recordRouter");
const userRouter = require("./routers/userRouter");

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use("/categories", authenticator, categoryRouter);
server.use("/records", recordRouter);
server.use("/users", userRouter);
server.get("/", (req, res) => {
  res
    .status(200)
    .send(
      `<a href="https://documenter.getpostman.com/view/11347698/TzRPiote" target="_blank">API Documentation</a>`
    );
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Port ${PORT} üzerinden istekler dinleniyor...`);
});
