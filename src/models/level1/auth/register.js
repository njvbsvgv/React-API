const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  telegramLink: { type: String, required: false },
  linkedinLink: { type: String, required: false },
  prfileImage: { type: String, required: false },
  prfileImagesss: { type: String, required: false },
  complatedProfile: { type: String, required: false },
  rool: { type: String, required: false },
});


module.exports = mongoose.model("users", userSchema);