const express = require("express")
const statusController = require("../../../../controllers/level1/courses/status/course-status-controllers")

const router = express.Router()

router.get("/Status", statusController.getCourseStatusList)

module.exports = router