const router = require("express").Router();
const {
  addReviewCtrl,
  getAllReviewsByProductIdCtrl,
  deleteReviewCtrl,
  getReviewCtrl,
  updateReviewCtrl,
} = require("../controllers/reviewCtrl");
const {
  verifyTokenWithUser,
  verifyAndRefreshToken,
} = require("../middlewares/tokenHandler");
const validateObjId = require("../middlewares/validateObjId");
const {
  addReviewValidator,
  updateReviewValidator,
} = require("../utils/validators/reviewValidate");

router.route("/").post(verifyTokenWithUser, addReviewValidator, addReviewCtrl);
router
  .route("/get_reviews_by_product/:id")
  .get(validateObjId, getAllReviewsByProductIdCtrl);
router
  .route("/:id")
  .get(verifyTokenWithUser, validateObjId, getReviewCtrl)
  .put(
    verifyTokenWithUser,
    validateObjId,
    updateReviewValidator,
    updateReviewCtrl
  )
  .delete(verifyAndRefreshToken, validateObjId, deleteReviewCtrl);

module.exports = router;
