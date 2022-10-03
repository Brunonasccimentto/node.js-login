const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/userController")

router.post("/register", userControllers.register )

router.post("/login", userControllers.login)

router.post("/update", userControllers.update)

router.post("/delete", userControllers.delete)

router.post("/musics", userControllers.userMusic)

module.exports = router