const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const JwtAuth = require("./http/middleware/AllowRoute");
const { ERROR_CODES } = require("./errors/ERROR_CODES");
require("dotenv/config");
app.use(express.json());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: false,
    // useUnifiedTopology: true
  })
);
const UserRouter = require("./http/routes/User");
const TaskRouter = require("./http/routes/Task");


app.get("/", async (req, res) => {
  res.status(200).json({
    message: "ok"
  })
});

app.use("/", JwtAuth.verify);
app.use("/api/users", UserRouter);
app.use("/api/tasks", TaskRouter);

module.exports = app