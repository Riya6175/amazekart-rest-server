const Order = require("../../models/order");
const Product = require("../../models/product");

exports.updateOrder = (req, res) => {
  Order.updateOne(
    { _id: req.body.orderId, "orderStatus.type": req.body.type },
    {
      $set: {
        "orderStatus.$": [
          { type: req.body.type, date: new Date(), isCompleted: true },
        ],
      },
    }
  ).exec((error, order) => {
    if (error) return res.status(400).json({ error });
    if (order) {
      res.status(201).json({ order });
    }
  });
};

// exports.getCustomerOrders = async (req, res) => {
//   const orders = await Order.findOne({ })
//     .populate("items.productId", "name")
//     .exec();
//   res.status(200).json({ orders });
// };

exports.getCustomerOrders = async (req, res) => {
    const orders = await Order.find({})
      .populate("items.productId", "name createdBy")
      .exec();
    res.status(200).json({ orders });
  };