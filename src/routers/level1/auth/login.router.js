const express = require("express")
const loginControllers = require("../../../controllers/level1/auth/login-controllers")

const router = express.Router()

router.post("/login", loginControllers.login)

module.exports = router