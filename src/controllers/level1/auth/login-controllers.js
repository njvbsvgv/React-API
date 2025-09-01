const User = require("../../../models/level1/auth/register");
const crypto = require("crypto");

const sessions = {};

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token || !sessions[token]) {
    return res.status(401).json({ error: "Invalid or missing token" });
  }

  // اضافه کردن اطلاعات نشست به request
  req.session = sessions[token];
  next();
}

const login = async (req, res, next) => {
  if (req.body) {
    const { phoneNumber: phoneNumberReq, password: passwordReq } = req.body;
    if (
      phoneNumberReq &&
      phoneNumberReq !== "" &&
      passwordReq &&
      passwordReq !== ""
    ) {
      try {
        const findUser = await User.findOne({ phoneNumber: phoneNumberReq });
        console.log("findUser ==>", findUser);
        if (findUser) {
          const { password } = findUser;
          if (passwordReq !== password) {
            res.status(400).json({ message: "پسوورد اشتباه است" });
          } else {
            const token = crypto.randomBytes(100).toString("hex");
            sessions[token] = { createdAt: Date.now() };
            res
              .status(200)
              .json({ message: "به پنل خود خوش آمدید", token: token, data: findUser });
          }
        } else {
          res
            .status(401)
            .json({ message: "کاربر یافت نشد، لطفا ابتدا ثبت نام کنید" });
        }
      } catch (error) {
        res.status(500).json({ message: "ارور سمت سرور" });
      }
    } else {
      res.status(400).json({ message: "لطفا فیلدهارا با دقت پر کنید" });
    }
  } else {
    res.status(400).json({ message: "فیلدها خالیست" });
  }
};

exports.login = login;
// exports.authMiddleware = authMiddleware;