
const express = require("express");
const { requireSignin, adminMiddleware,sellerMiddleware } = require("../../common-middleware");
const {
  updateOrder,
  getCustomerOrders,
} = require("../../controller/seller/order.seller");
const order = require("../../models/order");
const router = express.Router();

router.post(`/order/update`, requireSignin,  updateOrder);
router.post(
  `/order/getCustomerOrders`,
  requireSignin,
  getCustomerOrders
);
// router.post(`/order/getCustomerOrders`).get(function(req,res){

//   order.find({"items.productId.createdBy" : { $in : [req.user._id]}}, function(err, result){

//       if(err){
//           res.send(err)
//       }
//       else{

//           res.send(result)
//       }

//   })
// })

module.exports = router;