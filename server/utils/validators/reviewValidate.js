const { body } = require("express-validator");
const validatorHandler = require("../../middlewares/validatorHandler");

exports.addReviewValidator = [
  body("product")
    .notEmpty()
    .withMessage("product id is required")
    .isMongoId()
    .withMessage("invalid product id")
    .trim()
    .escape(),
  body("rating")
    .notEmpty()
    .withMessage("rating id is required")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5")
    .trim()
    .escape(),
  body("comment")
    .notEmpty()
    .withMessage("comment is required")
    .isString()
    .withMessage("Comment must be a string")
    .isLength({ min: 3 })
    .withMessage("Comment must be at least 3 characters long")
    .trim()
    .escape(),
  validatorHandler,
];
exports.updateReviewValidator = [
  body("rating")
    .optional()
    .notEmpty()
    .withMessage("rating id is required")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5")
    .trim()
    .escape(),
  body("comment")
    .optional()
    .notEmpty()
    .withMessage("comment is required")
    .isString()
    .withMessage("Comment must be a string")
    .isLength({ min: 3 })
    .withMessage("Comment must be at least 3 characters long")
    .trim()
    .escape(),
  validatorHandler,
];
