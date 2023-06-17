const User = require("../models/userModel");

const registerUser = async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password } = req.body;
    const user = await new User({
      name: name,
      email: email,
      password: password,
    });
    await user.save();
    const token = await user.getJWTToken();
    res
      .status(201)
      .json({ result: { user, token }, message: "register succesfull" });
  } catch (e) {
    res.status(404).json(e);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(404).send({ message: "Invalid Email or Password" });
    }
    if (password !== user.password) {
      return res.status(404).send({ message: "Invalid Email or Password" });
    }
    const token = await user.getJWTToken();
    res
      .status(201)
      .json({ message: "Login Succesfull", result: { user, token } });
  } catch (e) {
    res.status(404).json({ succes: false, e });
  }
};

module.exports = { loginUser, registerUser };
