const router = require("express").Router();
const {
  createPromoCodeCtrl,
  getAllPromoCodesCtrl,
  deletePromoCodeCtrl,
} = require("../controllers/promocodeCtrl");
const { verifyTokenWithAdmin } = require("../middlewares/tokenHandler");
const validateObjId = require("../middlewares/validateObjId");
const {
  createPromoCodeValidator,
} = require("../utils/validators/promocodeValidate");

router
  .route("/")
  .post(verifyTokenWithAdmin, createPromoCodeValidator, createPromoCodeCtrl)
  .get(getAllPromoCodesCtrl);

router
  .route("/:id")
  .delete(verifyTokenWithAdmin, validateObjId, deletePromoCodeCtrl);

module.exports = router;
