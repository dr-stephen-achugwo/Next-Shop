const router = require("express").Router();
const {
  getAllUsersCtrl,
  getUserCtrl,
  updateUserCtrl,
} = require("../controllers/userCtrl");
const {
  verifyTokenWithAdmin,
  verifyAuthorization,
} = require("../middlewares/tokenHandler");
const validateObjId = require("../middlewares/validateObjId");
const { updateUserValidator } = require("../utils/validators/userValidate");

router.get("/", verifyTokenWithAdmin, getAllUsersCtrl);
router
  .route("/:id")
  .get(validateObjId, verifyAuthorization, getUserCtrl)
  .put(validateObjId, verifyAuthorization, updateUserValidator, updateUserCtrl);

module.exports = router;
