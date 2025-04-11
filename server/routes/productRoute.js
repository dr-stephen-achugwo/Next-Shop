const router = require("express").Router();
const {
  createProductCtrl,
  getAllProductsCtrl,
  getProductCtrl,
  updateProductCtrl,
  deleteProductCtrl,
  wishListProductsToggleCtrl,
} = require("../controllers/productCtrl");
const {
  verifyTokenWithAdmin,
  verifyTokenWithUser,
} = require("../middlewares/tokenHandler");
const uploadImage = require("../middlewares/uploadFile");
const validateObjId = require("../middlewares/validateObjId");
const {
  createProductValidator,
  updateProductValidator,
} = require("../utils/validators/productValidate");

router.post(
  "/create_product",
  verifyTokenWithAdmin,
  uploadImage.array("images", 5),
  createProductValidator,
  createProductCtrl
);

router.get("/", getAllProductsCtrl);
router
  .route("/toggle_product_likes/:id")
  .put(verifyTokenWithUser, validateObjId, wishListProductsToggleCtrl);
router
  .route("/:id")
  .get(validateObjId, getProductCtrl)
  .put(
    verifyTokenWithAdmin,
    validateObjId,
    uploadImage.array("images", 5),
    updateProductValidator,
    updateProductCtrl
  )
  .delete(verifyTokenWithAdmin, validateObjId, deleteProductCtrl);

module.exports = router;
