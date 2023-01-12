//libs
const { Router } = require("express");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");

//files
const { checkAuth } = require("../utils/checkAuth");
const UserModel = require("../models/User");

const router = Router();

//email config
const transporter = nodemailer.createTransport({
  host: config.get("emailHost"),
  port: config.get("emailPort"),
  secure: config.get("emailSecure"),
  auth: {
    user: config.get("emailLogin"),
    pass: config.get("emailPassword"),
  },
});

const getJwtToken = (userId, liveTime) => {
  const token = jwt.sign({ id: userId }, config.get("jwtSecret"), {
    expiresIn: liveTime,
  });
  return token;
};

const sendConfirmEmail = async (userEmail, confirmUrl) => {
  try {
    await transporter.sendMail({
      from: "short-links@mail.ru",
      to: userEmail,
      subject: "Message from Node js",
      text: "Confirm email",
      html: `Click <a href=${confirmUrl}>here</a> to confirm your account`,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    try {
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const doc = new UserModel({
        email: req.body.email,
        passwordHash: hash,
      });
      const user = await doc.save();
      const confirmLink =
        config.get("baseUrl") + `/auth/confirm/${user._doc._id}`;
      await sendConfirmEmail(req.body.email, confirmLink);
      const token = getJwtToken(user._id, "30d");

      res.json({
        success: true,
        token: token,
      });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Registration error" });
    }
  }
);

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    try {
      const user = await UserModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User is not defined",
        });
      }
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.passwordHash
      );
      if (!isValidPassword) {
        return res.status(404).json({
          success: false,
          message: "Wrong login or password",
        });
      }
      const token = getJwtToken(user._id, "30d");
      res.json({
        success: true,
        token: token,
      });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Authorization error" });
    }
  }
);

router.get("/confirm/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);

    await UserModel.updateOne({ _id: userId }, { confirm: true });
    res.redirect(config.get("clientUrl") + "/");
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "confirm error",
    });
  }
});

router.post("/sendEmail", checkAuth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User isn't found",
      });
    }
    if (user._doc.confirm) {
      return res.status(400).json({
        success: false,
        message: "User already confirmed",
      });
    }
    const confirmLink =
      config.get("baseUrl") + `/auth/confirm/${user._doc._id}`;
    await sendConfirmEmail(user._doc.email, confirmLink);
    res.status(200).json({
      success: true,
      message: "Email is send",
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/checkAuth", checkAuth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const { passwordHash, ...userData } = user._doc;
    res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Access denied",
    });
  }
});

module.exports = router;
