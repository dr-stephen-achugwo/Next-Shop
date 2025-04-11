const router = require("express").Router();
const {
  createNewUserCrrl,
  loginUserCrrl,
  getUserCtrl,
  logoutUserCtrl,
} = require("../controllers/authCtrl");
const { verifyAndRefreshToken } = require("../middlewares/tokenHandler");
const {
  createNewUserValidator,
  loginUserValidator,
} = require("../utils/validators/userValidate");

router.post("/create_user", createNewUserValidator, createNewUserCrrl);
router.post("/login_user", loginUserValidator, loginUserCrrl);
router.get("/get_user", verifyAndRefreshToken, getUserCtrl);
router.post("/logout_user", logoutUserCtrl);

module.exports = router;
