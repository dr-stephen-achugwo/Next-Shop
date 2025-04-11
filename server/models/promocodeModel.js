const mongoose = require("mongoose");

const promocodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },
    expireAt: {
      type: Date,
      required: true,
      expires: 0,
    },
  },
  { timestamps: true }
);

const PromoCode = mongoose.model("promocode", promocodeSchema);
module.exports = PromoCode;
