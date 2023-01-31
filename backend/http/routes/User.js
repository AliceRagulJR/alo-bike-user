const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/addUser", UserController.addUser)
router.post("/login",UserController.login)
router.get("/",UserController.getUsers)
router.post("/delete", UserController.deleteUser)
router.put("/edit", UserController.editUser)
router.post("/findUser", UserController.findUser)
module.exports = router