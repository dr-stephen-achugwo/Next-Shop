const { body } = require("express-validator");
const validatorHandler = require("../../middlewares/validatorHandler");

exports.createPromoCodeValidator = [
  body("code")
    .notEmpty()
    .withMessage("code is required")
    .isString()
    .withMessage("code must be a string")
    .trim()
    .escape(),
  body("discountValue")
    .notEmpty()
    .withMessage("discount value is required")
    .isInt({ min: 0 })
    .withMessage("discount value must be greater than 0")
    .escape(),
  body("expireAt")
    .notEmpty()
    .withMessage("expire date is required")
    .isISO8601()
    .withMessage("invalid date")
    .escape(),
  validatorHandler,
];
