const express = require("express")
const registerController = require("../../controllers/auth/register-controllers")

const router = express.Router()

router.post("/register/step1", registerController.registerStep1)
router.post("/register/step2", registerController.registerStep2)
router.post("/register/step3", registerController.registerStep3)
router.get("/getUserList", registerController.getUserList)

module.exports = router