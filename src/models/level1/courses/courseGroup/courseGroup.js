const mongoose = require("mongoose")

const Schema = mongoose.Schema

const courseGroupSchema = new Schema({
    GroupName: { type: String, required: true },
    CourseId: { type: String, required: true },
    GroupCapacity: { type: Number, required: true },
})

module.exports = mongoose.model("coursegroup", courseGroupSchema)