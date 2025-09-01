const express = require("express");
const courseGroupControllers = require("../../../../controllers/level1/courses/courseGroup/courseGroup-controllers");

const router = express.Router();

router.get("/courseGroup", courseGroupControllers.getCourseGroupList);
router.get("/courseGroup/detail/:id", courseGroupControllers.getCourseGroupWithId);

module.exports = router