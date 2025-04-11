const router = require("express").Router();
const {
  createOrderCtrl,
  getAllOrdersCtrl,
  getOrderCtrl,
  updateOrderStatusCtrl,
  getAllOrdersForUser,
} = require("../controllers/orderCtrl");
const {
  verifyTokenWithUser,
  verifyTokenWithAdmin,
} = require("../middlewares/tokenHandler");
const validateObjId = require("../middlewares/validateObjId");
const {
  createOrderValidator,
  updateOrderStatusValidator,
} = require("../utils/validators/orderValidate");

router
  .route("/")
  .post(verifyTokenWithUser, createOrderValidator, createOrderCtrl)
  .get(verifyTokenWithAdmin, getAllOrdersCtrl);
router
  .route("/get_all_orders_for_user/:id")
  .get(verifyTokenWithUser, validateObjId, getAllOrdersForUser);
router
  .route("/:id")
  .put(
    verifyTokenWithAdmin,
    validateObjId,
    updateOrderStatusValidator,
    updateOrderStatusCtrl
  );

module.exports = router;
