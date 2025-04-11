const express = require("express")
const router = express.Router()
const{register, login, getUser} = require("../controllers/userController")
router.post("/register", register).post("/login", login).get("/:id", getUser)

module.exports = router