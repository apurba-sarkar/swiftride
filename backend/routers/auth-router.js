const express = require("express");
const router = express.Router();
const { home, regUser, loginUser,userCheck } = require("../controllers/auth-controller");
const usermodelValidateMiddleware = require("../middlewares/usermodelvalidate-middleware");
const authRegSchema = require("../validators/auth-validator");
const usercheckMiddleware = require("../middlewares/userCheck-middleware");

router.route("/").get(home);
router.route("/reg").post(usermodelValidateMiddleware(authRegSchema), regUser);
router.route("/login").post(loginUser);
router.route("/user").get(usercheckMiddleware,userCheck)
module.exports = router;
