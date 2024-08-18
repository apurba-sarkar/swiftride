const jwt = require("jsonwebtoken");
const user = require("../models/user-model");
const JWT_SIGN = process.env.JWT_SIGN
const usercheckMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({
      msg: "unauthorized token",
    });
  }

  const jwtToken = token.replace("Bearer", "").trim();
  console.log("token:->", jwtToken);
  try {
    const decoded = jwt.verify(jwtToken,JWT_SIGN);
    console.log(decoded);
    const userData = await user.findOne({ fullname: decoded.fullname });
    console.log(userData.email)
    next();
  } catch (error) {}
};

module.exports = usercheckMiddleware;
