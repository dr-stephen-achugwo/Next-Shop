const PromoCode = require("../models/promocodeModel");

exports.createPromoCodeCtrl = async (req, res) => {
  const { code, discountValue, expireAt } = req.body;
  try {
    const promoCode = await PromoCode.findOne({ code });
    if (promoCode)
      return res.status(400).json({ msg: "this code already exists" });
    if (expireAt <= new Date().toISOString())
      return res.status(400).json({ msg: "expire Date must be in the future" });
    const newPromoCode = new PromoCode({
      code,
      discountValue,
      expireAt,
    });
    await newPromoCode.save();
    res.status(201).json({
      msg: "promo code created successfully",
      promocode: newPromoCode,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error to create a new promocode" });
  }
};

exports.getAllPromoCodesCtrl = async (req, res) => {
  try {
    const promoCodes = await PromoCode.find({}, { code: 1, discountValue: 1 });
    res.status(200).json(promoCodes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error to get all promocodes" });
  }
};

exports.deletePromoCodeCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const promocode = await PromoCode.findById(id);
    if (!promocode) return res.status(404).json({ msg: "not found this code" });
    await promocode.deleteOne();
    res.status(200).json({ msg: "code deleted successfully", promocode });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error to delete promocode" });
  }
};
