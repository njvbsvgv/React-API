const mongoose = require("mongoose")

const Schema = mongoose.Schema

const statusSchema = new Schema({
    statusName: { type: String, required: true },
    description: { type: String, required: true },
    statusNumber: { type: String, required: true },
})

module.exports = mongoose.model("coursestatuses", statusSchema)