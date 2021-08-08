const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const server = express();
const authenticator = require("./middleware/authenticator");
const catchAllErrorHandler = require("./middleware/catchAllErrorHandler");

const categoryRouter = require("./routers/categoryRouter");
const recordRouter = require("./routers/recordRouter");
const userRouter = require("./routers/userRouter");

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use("/categories", authenticator, categoryRouter);
server.use("/records", authenticator, recordRouter);
server.use("/users", userRouter);

server.get("/", (req, res) => {
  res
    .status(200)
    .send(
      `<a href="https://documenter.getpostman.com/view/11347698/TzRPiote" target="_blank">API Documentation</a>`
    );
});
server.use(catchAllErrorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Port ${PORT} üzerinden istekler dinleniyor...`);
});
