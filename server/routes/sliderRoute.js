const router = require("express").Router();
const {
  createSliderCtrl,
  getAllSlidersCtrl,
  getSliderCtrl,
  updateSliderCtrl,
  deleteSliderCtrl,
} = require("../controllers/sliderCtrl");
const { verifyTokenWithAdmin } = require("../middlewares/tokenHandler");
const uploadImage = require("../middlewares/uploadFile");
const validateObjId = require("../middlewares/validateObjId");
const {
  createSliderValidator,
  updateSliderValidator,
} = require("../utils/validators/sliderValidate");

router
  .route("/")
  .post(
    verifyTokenWithAdmin,
    uploadImage.single("image"),
    createSliderValidator,
    createSliderCtrl
  )
  .get(getAllSlidersCtrl);

router
  .route("/:id")
  .get(verifyTokenWithAdmin, validateObjId, getSliderCtrl)
  .put(
    verifyTokenWithAdmin,
    validateObjId,
    uploadImage.single("image"),
    updateSliderValidator,
    updateSliderCtrl
  )
  .delete(verifyTokenWithAdmin, validateObjId, deleteSliderCtrl);

module.exports = router;
