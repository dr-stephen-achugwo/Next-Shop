const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const PromoCode = require("../models/promocodeModel");
const User = require("../models/userModel");

exports.createOrderCtrl = async (req, res) => {
  const { items, paymentMethod, promoCode, shippingAddress } = req.body;
  const { _id } = req.user;
  let totalAmountArr = [];
  try {
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product)
        return res.status(404).json({ msg: `${item.product} is not found` });
      if (product.sizes.length > 0) {
        const result = await Product.updateOne(
          {
            _id: product._id,
            "sizes.size": item.size,
            "sizes.stock": { $gte: item.quantity },
          },
          { $inc: { "sizes.$.stock": -item.quantity } }
        );
        if (result.matchedCount === 0)
          return res
            .status(400)
            .json({ error: "Size not found or insufficient stock" });
      } else {
        const result = await Product.updateOne(
          { _id: product._id, stock: { $gte: item.quantity } },
          { $inc: { stock: -item.quantity } }
        );
        if (result.matchedCount === 0)
          return res
            .status(400)
            .json({ error: "Size not found or insufficient stock" });
      }
      const discountAmount = (product.price * product.discount) / 100;
      const priceAmount = product.price - discountAmount;
      totalAmountArr.push(priceAmount);
    }
    const totalAmount = totalAmountArr.reduce((acc, item) => acc + item);

    const code = await PromoCode.findOne({ code: promoCode });
    if (promoCode && !code)
      return res.status(400).json({ msg: "invalid promo code" });
    const discountCodePrice =
      promoCode && (totalAmount * code.discountValue) / 100;

    const finalAmount = promoCode
      ? totalAmount - discountCodePrice
      : totalAmount;

    const order = new Order({
      user: _id,
      items,
      totalPrice: totalAmount,
      promoCode: {
        code: code.code,
        discountPercent: code.discountValue,
      },
      finalPrice: finalAmount,
      paymentMethod,
      shippingAddress,
    });
    await order.save();
    res.status(201).json({ msg: "order created successfully", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error creating order" });
  }
};

exports.getAllOrdersCtrl = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error get all orders" });
  }
};

exports.getAllOrdersForUser = async (req, res) => {
  const { id: userId } = req.params;
  const { _id } = req.user;
  try {
    if (userId !== _id) return res.status(403).json({ msg: "access denied" });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "user not found" });
    const orders = await Order.find({ user: userId });
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error get all orders for user" });
  }
};

exports.updateOrderStatusCtrl = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ msg: "order not found" });
    const updateOrder = await Order.findByIdAndUpdate(
      id,
      {
        $set: {
          status,
        },
      },
      { new: true }
    );
    res
      .status(200)
      .json({ msg: "order updated successfully", order: updateOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error update order" });
  }
};
