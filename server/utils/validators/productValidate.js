const { body } = require("express-validator");
const validatorHandler = require("../../middlewares/validatorHandler");

exports.createProductValidator = [
  body("productName")
    .notEmpty()
    .withMessage("product name required")
    .isString()
    .withMessage("product name must be a string")
    .trim()
    .escape(),
  body("category")
    .notEmpty()
    .withMessage("category required")
    .isString()
    .withMessage("category must be a string")
    .trim()
    .escape(),
  body("brand")
    .notEmpty()
    .withMessage("brand required")
    .isString()
    .withMessage("brand must be a string")
    .trim()
    .escape(),
  body("description")
    .notEmpty()
    .withMessage("description required")
    .isString()
    .withMessage("description must be a string")
    .trim()
    .escape(),
  body("price")
    .notEmpty()
    .withMessage("price name required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a number and greater than or equal to 0")
    .trim()
    .escape(),
  body("discount")
    .optional()
    .notEmpty()
    .withMessage("discount name required")
    .isFloat({ min: 0, max: 100 })
    .withMessage(
      "discount must be a number and greater than or equal to 0 and less than or equal to 100"
    )
    .trim()
    .escape(),
  body("color")
    .notEmpty()
    .withMessage("color required")
    .isString()
    .withMessage("color must be a string")
    .trim()
    .escape(),
  body("sizes")
    .optional()
    .isArray({ min: 1 })
    .withMessage("sizes must be a non-empty array"),
  body("sizes.*.size")
    .isString()
    .withMessage('Each size must have a "size" field of type string'),
  body("sizes.*.stock")
    .isInt({ min: 0 })
    .withMessage('Each size must have a "stock" field that is an integer >= 0'),
  body("stock").custom((value, { req }) => {
    if (req.body.sizes === undefined && (value === undefined || value < 0)) {
      throw new Error(
        "Stock is required and must be a positive number if no sizes are provided"
      );
    }
    return true;
  }),

  validatorHandler,
];

exports.updateProductValidator = [
  body("productName")
    .optional()
    .notEmpty()
    .withMessage("product name required")
    .isString()
    .withMessage("product name must be a string")
    .trim()
    .escape(),
  body("category")
    .optional()
    .notEmpty()
    .withMessage("category required")
    .isString()
    .withMessage("category must be a string")
    .trim()
    .escape(),
  body("brand")
    .optional()
    .notEmpty()
    .withMessage("brand required")
    .isString()
    .withMessage("brand must be a string")
    .trim()
    .escape(),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("description required")
    .isString()
    .withMessage("description must be a string")
    .trim()
    .escape(),
  body("price")
    .optional()
    .notEmpty()
    .withMessage("price name required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a number and greater than or equal to 0")
    .trim()
    .escape(),
  body("discount")
    .optional()
    .notEmpty()
    .withMessage("discount name required")
    .isFloat({ min: 0, max: 100 })
    .withMessage(
      "discount must be a number and greater than or equal to 0 and less than or equal to 100"
    )
    .trim()
    .escape(),
  body("color")
    .optional()
    .notEmpty()
    .withMessage("color required")
    .isString()
    .withMessage("color must be a string")
    .trim()
    .escape(),
  body("sizes")
    .optional()
    .isArray({ min: 1 })
    .withMessage("sizes must be a non-empty array"),
  body("sizes.*.size")
    .optional()
    .isString()
    .withMessage('Each size must have a "size" field of type string'),
  body("sizes.*.stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage('Each size must have a "stock" field that is an integer >= 0'),
  validatorHandler,
];
