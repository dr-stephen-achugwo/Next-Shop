const router = require("express").Router();
const {
  addCategoryCtrl,
  getAllCategoriosCtrl,
  deleteCategoryCtrl,
} = require("../controllers/categoryCtrl");
const { verifyTokenWithAdmin } = require("../middlewares/tokenHandler");
const validateObjId = require("../middlewares/validateObjId");
const {
  addCategoryValidator,
} = require("../utils/validators/categoryValidate");

router
  .route("/")
  .post(verifyTokenWithAdmin, addCategoryValidator, addCategoryCtrl)
  .get(getAllCategoriosCtrl);

router
  .route("/:id")
  .delete(verifyTokenWithAdmin, validateObjId, deleteCategoryCtrl);

module.exports = router;
