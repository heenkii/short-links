const UserModel = require("../models/User");

const jwt = require("jsonwebtoken");
const config = require("config");

const checkAuth = async (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decoded = jwt.verify(token, config.get("jwtSecret"));
      req.userId = decoded.id;
      const user = await UserModel.findById(req.userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      next();
    } catch (error) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
  } else {
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }
};

const checkConfirm = async (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decoded = jwt.verify(token, config.get("jwtSecret"));
      req.userId = decoded.id;
      const user = await UserModel.findById(req.userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      if (!user._doc.confirm) {
        return res.status(404).json({
          success: false,
          message: "Account isn't confirmed",
        });
      }
      next();
    } catch (error) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
  } else {
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }
};

module.exports.checkAuth = checkAuth;
module.exports.checkConfirm = checkConfirm;
