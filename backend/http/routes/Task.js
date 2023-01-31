const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController")


router.post("/addTask", TaskController.addTask)
router.get("/getTask",TaskController.getTask)
router.put("/edit", TaskController.editTask)
router.delete("/delete", TaskController.deleteTask)
module.exports = router;