const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.getAllUsersCtrl = async (req, res) => {
  try {
    const users = await User.find(
      {},
      { password: 0, wishListProducts: 0, ordersHistory: 0 }
    );
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error get all users" });
  }
};

exports.getUserCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id, {
      password: 0,
      wishListProducts: 0,
      ordersHistory: 0,
    });
    if (!user) return res.status(404).json({ msg: "user not found" });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error get user" });
  }
};

exports.updateUserCtrl = async (req, res) => {
  const { id } = req.params;
  const { name, email, phoneNumber, address, password } = req.body;
  let hashPassword;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: "user not found" });
    const existEmail = await User.findOne({ email });
    const existPhone = await User.findOne({ phoneNumber });
    if (
      (existEmail && existEmail.email !== user.email) ||
      (existPhone && existPhone.phoneNumber !== user.phoneNumber)
    ) {
      return res.status(400).json({ msg: "user already exists" });
    }
    if (password) {
      hashPassword = await bcrypt.hash(password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          email,
          address,
          phoneNumber,
          password: password ? hashPassword : password,
        },
      },
      { new: true }
    );
    res.status(200).json({
      msg: "user updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        address: updatedUser.address,
        role: updatedUser.role,
        isVerifyed: updatedUser.isVerifyed,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error update user" });
  }
};
