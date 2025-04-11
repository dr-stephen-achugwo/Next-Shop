const { body } = require("express-validator");
const validatorHandler = require("../../middlewares/validatorHandler");

exports.addCategoryValidator = [
  body("name")
    .notEmpty()
    .withMessage("category name is required")
    .isString()
    .withMessage("category name must be a string")
    .trim()
    .escape(),
  validatorHandler,
];
