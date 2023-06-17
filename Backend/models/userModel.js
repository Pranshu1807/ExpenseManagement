const mongoose = require("mongoose");
const { isEmail } = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      lowercase: true,
      unique: true,
      validate: [isEmail, "invalid email"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [8, "Password should be atleast 8 characetrs"],
    },
  },
  { timestamps: true }
);
userSchema.methods.getJWTToken = async function () {
  try {
    let token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return token;
  } catch (e) {
    console.log(e);
  }
};

const User = mongoose.model("users", userSchema);
module.exports = User;
