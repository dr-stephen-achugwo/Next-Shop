const Category = require("../models/categoryModel");

exports.addCategoryCtrl = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await Category.findOne({ name });
    if (category) return res.status(400).json({ msg: "category is existed" });
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json({
      msg: "category created successfully",
      category: { _id: newCategory._id, name: newCategory.name },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error adding category" });
  }
};

exports.getAllCategoriosCtrl = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error to get all categories" });
  }
};

exports.deleteCategoryCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ msg: "category not found" });
    await category.deleteOne();
    res.status(200).json({
      msg: "category deleted successfully",
      category: { _id: category._id, name: category.name },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error delteting category" });
  }
};
