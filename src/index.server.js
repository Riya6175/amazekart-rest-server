const express = require("express");
const env = require("dotenv");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require("mongoose");
const path= require("path")
const cors = require("cors")
const razorpay = require('razorpay');

//routes
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')
const sellerRoutes = require('./routes/seller/auth')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const adminProductRoutes = require("./routes/admin/initialdata");
const cartRoutes = require('./routes/cart')
const initialDataRoutes = require('./routes/seller/initialData')
const addressRoutes = require("./routes/address");
const orderRoutes = require("./routes/order");
const sellerOrderRoute = require("./routes/seller/order.routes");
const adminOrderRoute = require("./routes/admin/order.routes");
//environment variobles 
env.config();


//mongodb connection
//mongodb+srv://root:<password>@cluster0.vwceq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.vwceq.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }
).then(()=>{
    console.log("database connected");
})

app.use(cors());
app.use(bodyParser());
app.use(express.json())

app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use('/api',authRoutes)
app.use('/api',adminRoutes)
app.use('/api',sellerRoutes)
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)
app.use("/api",adminProductRoutes)
app.use("/api",cartRoutes)
app.use("/api",initialDataRoutes)
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);
app.use("/api",sellerOrderRoute);
app.use("/api",adminOrderRoute);

app.post(`/api/verify/razorpay-signature`,(req,res) => {

    console.log(JSON.stringify(req.body));
    const crypto = require('crypto');
    const hash = crypto.createHmac('SHA256', "riyasoni").update(req.body).digest('hex');
    console.log(hash);
    console.log(req.headers["x-razorpay-signature"]);
    if(hash === req.headers["x-razorpay-signature"]){
        console.log("hello");
    }else{
        console.log("fail");
    }
    res.status(200)

})


app.listen(process.env.PORT, ()=>{
    console.log(`server running on port ${process.env.PORT}`);
})