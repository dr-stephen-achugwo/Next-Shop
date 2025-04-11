const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    wishListProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
    ],
    isVerifyed: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);
module.exports = User;
