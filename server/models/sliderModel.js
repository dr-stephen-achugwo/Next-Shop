const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: Object,
      default: {
        url: String,
        publicId: null,
      },
      required: true,
    },
    link: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Slider = mongoose.model("slider", sliderSchema);
module.exports = Slider;
