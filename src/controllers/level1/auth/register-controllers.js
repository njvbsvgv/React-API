const User = require("../../../models/level1/auth/register");
const registerStep1 = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber || phoneNumber === "") {
      return res.status(400).json({ message: "فیلد شماره تلفن خالی است!" });
    }

    // بررسی اینکه کاربر با این شماره موجود نباشد
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({ message: "این کاربر با این شماره موجود است!" });
    }

    // ایجاد کاربر موقت با شماره تلفن
    const tempUser = new User({ phoneNumber, password: "", temp: true });
    await tempUser.save();

    res.status(201).json({ message: "مرحله ۱ با موفقیت انجام شد", userId: tempUser._id });
  } catch (error) {
    console.log("registerStep1 error:", error);
    res.status(500).json({ message: "خطا در ثبت شماره تلفن" });
  }
};

// مرحله 2: تایید کد
const registerStep2 = async (req, res, next) => {
  try {
    const { userId, virfyCode } = req.body;

    if (!userId || !virfyCode) {
      return res.status(400).json({ message: "فیلدها خالی هستند!" });
    }

    if (virfyCode !== "1234") {
      return res.status(400).json({ message: "کد تایید اشتباه است!" });
    }

    // بروزرسانی کاربر موقت (مثلا برای ثبت تایید شده بودن)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "کاربر یافت نشد!" });
    }

    user.verified = true; // اضافه کردن فیلد تایید
    await user.save();

    res.status(201).json({ message: "مرحله ۲ با موفقیت انجام شد" });
  } catch (error) {
    console.log("registerStep2 error:", error);
    res.status(500).json({ message: "خطا در تایید کد" });
  }
};

// مرحله 3: ثبت رمز عبور و تکمیل اطلاعات
const registerStep3 = async (req, res, next) => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password) {
      return res.status(400).json({ message: "فیلدها خالی هستند!" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "کاربر یافت نشد!" });
    }

    user.password = password;
    user.temp = false; // کاربر موقت نیست
    user.telegramLink = "";
    user.linkedinLink = "";
    user.prfileImage = "";
    user.prfileImagesss = "";
    user.complatedProfile = 5;
    user.rool = "";

    await user.save();

    res.status(200).json({ message: "ثبت نام با موفقیت انجام شد" });
  } catch (error) {
    console.log("registerStep3 error:", error);
    res.status(500).json({ message: "خطا در ثبت رمز عبور" });
  }
};

// module.exports = {
//   registerStep1,
//   registerStep2,
//   registerStep3,
// };

const getUserList = async (req, res, next) => {
  const userList = await User.find().exec();
  res.status(200).json({ data: userList, totalCount: userList.length });
};

exports.registerStep1 = registerStep1;
exports.registerStep2 = registerStep2;
exports.registerStep3 = registerStep3;
exports.getUserList = getUserList;
