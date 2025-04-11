const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createNewUserCrrl = async (req, res) => {
  const { name, email, phoneNumber, password, role } = req.body;
  try {
    const existUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existUser) return res.status(400).json({ msg: "User already exists" });
    // Hash Password
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      phoneNumber,
      role,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).json({ msg: "user created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error creating a new user" });
  }
};

exports.loginUserCrrl = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ msg: "incorrect email or password" });
    const accessToken = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    res.cookie("at", accessToken, { maxAge: 60 * 60 * 1000 });
    res.cookie("rt", refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    });
    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        role: user.role,
        isVerifyed: user.isVerifyed,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error login user" });
  }
};

exports.getUserCtrl = async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id);
    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        role: user.role,
        isVerifyed: user.isVerifyed,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error login user" });
  }
};

exports.logoutUserCtrl = async (req, res) => {
  try {
    res.clearCookie("at");
    res.clearCookie("rt");
    res.status(200).json({ msg: "user logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error logout user" });
  }
};
