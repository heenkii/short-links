const { check, validationResult, body } = require("express-validator");

const loginValidations = [
  body("email", "invalid email").isEmail(),
  body("password", "Invalid password").isLength({ min: 5 }),
];

const registerValidations = [
  body("email", "invalid email").isEmail(),
  body("password", "Invalid password").isLength({ min: 5 }),
];

module.exports.loginValidations = loginValidations;
module.exports.registerValidations = registerValidations;
