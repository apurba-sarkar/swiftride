const user = require("../models/user-model");
const bcrypt = require("bcrypt");
const home = async (req, res) => {
  try {
    res.status(200).send("initial route from backend");
  } catch (err) {
    console.log(err);
  }
};

const regUser = async (req, res) => {
  try {
    const { fullname, age, pincode, mobile, email, password } = req.body;

    const userMobileExist = await user.findOne({
      mobile: mobile,
    });
    const userEmailExist = await user.findOne({
      email: email,
    });

    console.log(userMobileExist);
    console.log("----------");
    const userExist = userMobileExist || userEmailExist;
    console.log(userExist);

    if (userExist && false) {
      console.log("user is already exist", userExist);
      return res.status(400).send({
        msg: "user mobile number or email is already registered",
        data: userExist,
      });
    }

    const userCreated = await user.create({
      fullname,
      age,
      pincode,
      mobile,
      email,
      password,
    });

    res.status(200).send({
      msg: "data created succesfully!",
      data: {
        fullname,
        email,
      },
      token: await userCreated.generateWebToken(),
    });
    // console.log(userCreated);
  } catch (error) {
    res.status(500).send({
      msg: "Error Creating Account, please try again after some time",
      error: error.message,
    });
    console.log(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExist = await user.findOne({ email });
    // console.log(userExist);
    if (!userExist) {
      return res.status(404).json({
        msg: "user not found",
      });
    }

    // return res.status(200).json({
    //     msg:"omedeto you are our old user"
    // })
    console.log(userExist);
    const passwordMatched = await bcrypt.compare(password, userExist.password);
    console.log(passwordMatched);

    if (passwordMatched) {
      res.status(200).json({
        msg: "Authenticate succesfully",
        token: await userExist.generateWebToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    const status = 500;
    const extraDetails = "please try again after sometimg";
    const errobj = {
      status,
      extraDetails,
    };
    next(errobj);
  }
};

const userCheck = async (req, res) => {
  try {
    //    const userData = req.user
    res.status(200).json({
      msg: "hi",
    });
  } catch (error) {
    console.log("error from the login auth");
  }
};

module.exports = { home, regUser, loginUser, userCheck };
