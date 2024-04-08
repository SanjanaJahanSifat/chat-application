//external imports
const express = require("express");
const { check } = require("express-validator");
//internal imports
const { getUsers, addUser } = require("../controller/userController");
const decorateHtmlResponse = require("../middleware/common/decorateHtmlResponse");
const avatarUpload = require("../middleware/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middleware/users/userValidator");
const router = express.Router();
//login page
router.get("/", decorateHtmlResponse("Users"), getUsers);
//add user
router.post(
  "/",
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);
module.exports = router;
