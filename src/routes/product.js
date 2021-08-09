const express = require('express');
const app = express();
const Category = require("../models/category");
const slugify = require("slugify");
const multer = require("multer");
const path = require('path')
// const { addCategory,getCategories } = require('../controller/category');
const { requireSignin, sellerMiddleware, adminMiddleware } = require("../common-middleware");
const { createProduct,getProductsBySlug,getProductDetailsById,deleteProductById,
    getProducts, } = require('../controller/product');
app.use(express.static(path.join( path.dirname(__dirname),'uploads')))


const router = express.Router();
const shortid = require("shortid");

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join( path.dirname(__dirname),'uploads'))
    },
    filename: function(req,file,cb){
        cb(null,shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({storage})


router.post("/product/create",requireSignin, sellerMiddleware,upload.array("productPicture"), createProduct);
router.get("/products/:slug",getProductsBySlug)
router.get("/product/:productId", getProductDetailsById);
router.delete(
    "/product/deleteProductById",
    requireSignin,
    sellerMiddleware,
    deleteProductById
  );
  router.post(
    "/product/getProducts",
    requireSignin,
    sellerMiddleware,
    getProducts
  );

//router.get("/category/getcategory",getCategories);

module.exports = router;