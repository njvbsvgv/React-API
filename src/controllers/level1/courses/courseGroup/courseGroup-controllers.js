const CourseGroup = require("../../../../models/level1/courses/courseGroup/courseGroup");

const getCourseGroupList = async (req, res, next) => {
  try {
    const groupList = await CourseGroup.find().exec();
    res.status(200).json({ data: groupList });
  } catch (error) {
    res.status(500).json({ message: "ارور سمت سرور" });
  }
};

const getCourseGroupWithId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const findCourseGroup = await CourseGroup.findById(id);
    if (findCourseGroup) {
      res.status(200).json({ message: "محتوا یافت شد", data: findCourseGroup });
    } else {
      res
        .status(200)
        .json({ message: "محتوا یافت نشد", data: findCourseGroup });
    }
  } catch (error) {
    res.status(500).json({ message: "ارور سمت سرور" });
  }
};

exports.getCourseGroupList = getCourseGroupList;
exports.getCourseGroupWithId = getCourseGroupWithId;
