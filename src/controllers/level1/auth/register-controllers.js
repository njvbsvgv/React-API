const User = require("../../../models/level1/auth/register");
let phoneNumberState;
let virfyCodeState;
let passwordState;

const registerStep1 = async (req, res, next) => {
  if (req.body) {
    const { phoneNumber } = req.body;
    if (phoneNumber && phoneNumber !== "") {
      const validationByPhoneNumber = await User.findOne({
        phoneNumber: req.body.phoneNumber,
      });
      if (!validationByPhoneNumber) {
        try {
          phoneNumberState = phoneNumber;
          res.status(201).json({ message: "عملیات  با موفقیت انجام شد" });
        } catch (error) {
          res.status(500).json({ message: "خطا در ثبت نام" });
        }
      } else {
        res
          .status(400)
          .json({ message: "این کاربر با این شماره تلفن موجود میباشد!!!" });
      }
    } else {
      res.status(400).json({
        message: "فیلدها خالیه!!!",
      });
    }
  } else {
    res
      .status(400)
      .json({ message: "لطفا شماره همراه را با دقت وارد نمایید !!!" });
  }
};

const registerStep2 = (req, res, next) => {
  if (req.body) {
    const { virfyCode } = req.body;
    if (virfyCode && virfyCode !== "" && virfyCode === "1234") {
      try {
        virfyCodeState = virfyCode;
        res.status(201).json({ message: "عملیات با موفقیت انجام شد" });
      } catch (error) {
        res.status(500).json({ message: "خطا سمت سرور !!!" });
      }
    } else {
      res.status(400).json({ message: "لطفا فیلدها را با دقت پرکنید" });
    }
  } else {
    res.status(400).json({ message: "فیلدها خالی هستن !!!" });
  }
};

const registerStep3 = async (req, res, next) => {
  try {
    if (req.body) {
      const { password } = req.body;
      console.log("password ==>", password);
      if (password && password !== "") {
        passwordState = password;
        const userData = new User({
          phoneNumber: phoneNumberState,
          password: passwordState,
          telegramLink: "",
          linkedinLink: "",
          prfileImage: "",
          prfileImagesss: "",
          complatedProfile: 5,
          rool: "",
        });
        await userData.save();
        res.status(200).json({ message: "ثبت نام با موفقیت انجام شد" });
      } else {
        res.status(400).json({ message: "لطفا فیلدها را با دقت پر کنید" });
      }
    } else {
      res.json({ message: "فیلدها خالیست !!!" });
    }
  } catch (error) {
    res.status(500).json({ message: "خطا سمت سرور" });
  }
};

const getUserList = async (req, res, next) => {
  const userList = await User.find().exec();
  res.status(200).json({ data: userList, totalCount: userList.length });
};

exports.registerStep1 = registerStep1;
exports.registerStep2 = registerStep2;
exports.registerStep3 = registerStep3;
exports.getUserList = getUserList;
