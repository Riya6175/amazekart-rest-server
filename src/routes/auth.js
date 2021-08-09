const express = require("express");
const env = require("dotenv");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require("mongoose");
const router = express.Router();
const { check } = require("express-validator");
const {signup, signin} = require('../controller/auth');
const { validateSignupRequest,validateSigninRequest,isRequestValidated } = require("../validators/auth");



router.post("/signup",validateSignupRequest,isRequestValidated, signup)
router.post("/signin", validateSigninRequest,isRequestValidated, signin)

router.post("/profile", (req,res) =>{
    res.status(200).json({user: "profile"})
});

module.exports = router;