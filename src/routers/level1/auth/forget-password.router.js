const express = require("express")
const forgetPasswordController = require("../../controllers/auth/reset-password-controllers")

const router = express.Router()

router.post("/forgetPassword/step1", forgetPasswordController.forgetPasswordStep1)
router.post("/forgetPassword/step2", forgetPasswordController.forgetPasswordStep2)


module.exports = router