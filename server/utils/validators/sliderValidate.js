const { body } = require("express-validator");
const validatorHandler = require("../../middlewares/validatorHandler");

exports.createSliderValidator = [
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isString()
    .withMessage("title must be a string")
    .trim()
    .escape(),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("description is required")
    .isString()
    .withMessage("description must be a string")
    .trim()
    .escape(),
  body("link")
    .notEmpty()
    .withMessage("link is required")
    .isString()
    .withMessage("link must be a string")
    .isURL()
    .withMessage("Invalid link URL"),
  validatorHandler,
];

exports.updateSliderValidator = [
  body("title")
    .optional()
    .notEmpty()
    .withMessage("title is required")
    .isString()
    .withMessage("title must be a string")
    .trim()
    .escape(),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("description is required")
    .isString()
    .withMessage("description must be a string")
    .trim()
    .escape(),
  body("link")
    .optional()
    .notEmpty()
    .withMessage("link is required")
    .isString()
    .withMessage("link must be a string")
    .isURL()
    .withMessage("Invalid link URL"),
  validatorHandler,
];
