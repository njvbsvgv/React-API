const Users = require("../../models/auth/register");
const forgetPasswordStep1 = (req, res, next) => {
  if (req.body) {
    const { email, baseUrl } = req.body;
    if (email && email != "") {
      res.status(200).json({ message: "عملیات با موفقیت انجام شد" })
    } else {
      req.status(400).json({ message: "لطفا ایمیل را وارد نمایید" });
    }
  } else {
    res.status(400).json({ message: "فیلدها خالیست" });
  }
};

const forgetPasswordStep2 = async (req, res, next) => {
  if (req.body) {
    const { userId, newPassword, resetPassword } = req.body;
    if (
      userId &&
      userId != "" &&
      newPassword &&
      newPassword != "" &&
      resetPassword &&
      resetPassword == newPassword
    ) {
      const findUser = await Users.findById(userId);
      if (findUser) {
        await Users.findByIdAndUpdate(userId, { password: resetPassword });
        res.status(200).json({ message: "پسوورد با موفقیت تغییر کرد" });
      } else {
        req
          .status(401)
          .json({ message: "کاربر یافت نشد لطفا ابتدا ثبت نام بفرمایید" });
      }
    } else {
      res.status(400).json({ message: "لطفا تمام فیلدها را با دقت پر کنید" });
    }
  } else {
    res.status(400).json({ message: "فیلدها خالیست" });
  }
};


exports.forgetPasswordStep1 = forgetPasswordStep1
exports.forgetPasswordStep2 = forgetPasswordStep2