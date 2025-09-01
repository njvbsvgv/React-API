// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   phoneNumber: { type: String, required: true },
//   password: { type: String, required: true },
//   telegramLink: { type: String, required: false },
//   linkedinLink: { type: String, required: false },
//   prfileImage: { type: String, required: false },
//   prfileImagesss: { type: String, required: false },
//   complatedProfile: { type: String, required: false },
//   rool: { type: String, required: false },
// });


// module.exports = mongoose.model("users", userSchema);




const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    default: "", // در ابتدای ثبت نام خالیه
  },
  telegramLink: {
    type: String,
    default: "",
  },
  linkedinLink: {
    type: String,
    default: "",
  },
  prfileImage: {
    type: String,
    default: "",
  },
  prfileImagesss: {
    type: String,
    default: "",
  },
  complatedProfile: {
    type: Number,
    default: 0,
  },
  rool: {
    type: String,
    default: "",
  },
  temp: {
    type: Boolean,
    default: true, // وقتی کاربر تازه مرحله 1 ثبت نام کرد
  },
  verified: {
    type: Boolean,
    default: false, // بعد از تایید کد مرحله 2 به true میره
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
