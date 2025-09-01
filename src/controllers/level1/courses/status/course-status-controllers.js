const Status = require("../../../../models/level1/courses/status/status");

const getCourseStatusList = async (req, res, next) => {
  const statusList = await Status.find().exec();
  res.status(200).json({ data: statusList });
};


exports.getCourseStatusList = getCourseStatusList