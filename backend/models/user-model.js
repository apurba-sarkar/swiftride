const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { boolean } = require("zod");
const JWT_SIGN = process.env.JWT_SIGN
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    require: true,
  },
  age: {
    type: String,
    require: true,
  },
  pincode: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  mobile: {
    type: String,
    require: true,
    // unique:true
  },
  email: {
    type: String,
    require: true,
    // unique:true
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin:{
    type:Boolean,
    default:true,
  },
  
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  try {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRound);
    user.password = hashedPassword;
    // console.log(hashedPassword)
    console.log(this);
  } catch (error) {
    console.log(error);
  }
});

userSchema.methods.generateWebToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        fullname: this.fullname,
        password: this.password,
        email:this.email,
        isAdmin:this.isAdmin
      },
      JWT_SIGN,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const user = new mongoose.model("user", userSchema);
module.exports = user;
