const { body } = require("express-validator");
const validatorHandler = require("../../middlewares/validatorHandler");

exports.createOrderValidator = [
  body("items")
    .isArray({ min: 1 })
    .withMessage("At least one item is required"),

  body("items.*.product")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid Product ID format"),

  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),

  body("promoCode")
    .optional()
    .notEmpty()
    .withMessage("you must add a promo code")
    .isString()
    .withMessage("promo code must be a string")
    .trim()
    .escape(),

  body("status")
    .optional()
    .isIn(["pending", "processing", "shipped", "delivered", "cancelled"])
    .withMessage("Invalid order status"),

  body("paymentMethod")
    .notEmpty()
    .withMessage("Payment method is required")
    .isIn(["credit_card", "cash_on_delivery"])
    .withMessage("Invalid payment method"),

  body("shippingAddress.fullName")
    .notEmpty()
    .withMessage("Full name is required")
    .isString()
    .withMessage("fullName must be a string")
    .trim()
    .escape(),

  body("shippingAddress.address")
    .notEmpty()
    .withMessage("Address is required")
    .isString()
    .withMessage("address must be a string")
    .trim()
    .escape(),

  body("shippingAddress.city")
    .notEmpty()
    .withMessage("City is required")
    .isString()
    .withMessage("city must be a string")
    .trim()
    .escape(),

  body("shippingAddress.postalCode")
    .notEmpty()
    .withMessage("Postal code is required")
    .isString()
    .withMessage("postal code must be a string")
    .trim()
    .escape(),

  body("shippingAddress.country")
    .notEmpty()
    .withMessage("Country is required")
    .isString()
    .withMessage("country must be a string")
    .trim()
    .escape(),

  body("shippingAddress.phoneNumber")
    .notEmpty()
    .withMessage("phone number is required")
    .isMobilePhone()
    .withMessage("invalid phone number")
    .trim()
    .escape(),

  validatorHandler,
];

exports.updateOrderStatusValidator = [
  body("status")
    .optional()
    .isIn(["pending", "processing", "shipped", "delivered", "cancelled"])
    .withMessage("Invalid order status"),
  validatorHandler,
];
