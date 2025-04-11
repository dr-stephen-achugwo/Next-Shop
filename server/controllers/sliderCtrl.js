const Slider = require("../models/sliderModel");
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../utils/cloudinary");
const fs = require("fs");

exports.createSliderCtrl = async (req, res) => {
  const { title, description, link } = req.body;
  try {
    if (!req.file)
      return res.status(400).json({ msg: "you must provide a slider image" });
    const result = await uploadImageToCloudinary(req.file.path);
    const slider = new Slider({
      title,
      description,
      image: {
        url: result.secure_url,
        publicId: result.public_id,
      },
      link,
    });
    await slider.save();
    res.status(201).json({ msg: "slider created successfully", slider });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error to create slider" });
  } finally {
    fs.unlinkSync(req.file.path);
  }
};

exports.getAllSlidersCtrl = async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.status(200).json(sliders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error to get all sliders" });
  }
};

exports.getSliderCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const slider = await Slider.findById(id);
    if (!slider) return res.status(404).json({ msg: "slider not found" });
    res.status(200).json(slider);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error to get slider" });
  }
};

exports.updateSliderCtrl = async (req, res) => {
  const { title, description, link } = req.body;
  const { id } = req.params;
  try {
    let result;
    const slider = await Slider.findById(id);
    if (!slider) return res.status(404).json({ msg: "slider not found" });
    if (req.file) {
      await deleteImageFromCloudinary(slider.image.publicId);
      result = await uploadImageToCloudinary(req.file.path);
    }
    const updateSlider = await Slider.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          description,
          image: {
            url: result ? result.secure_url : slider.image.url,
            publicId: result ? result.public_id : slider.image.publicId,
          },
          link,
        },
      },
      { new: true }
    );
    res
      .status(200)
      .json({ msg: "slider updated successfully", slider: updateSlider });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error to update slider" });
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.deleteSliderCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const slider = await Slider.findById(id);
    if (!slider) return res.status(404).json({ msg: "slider not found" });
    await deleteImageFromCloudinary(slider.image.publicId);
    await slider.deleteOne();
    res.status(200).json({ msg: "slider deleted successfully", slider });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error to delete slider" });
  }
};
