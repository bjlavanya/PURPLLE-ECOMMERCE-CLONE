require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Products = require('./models/Products');
const Users = require('./models/User');
const Orders = require('./models/Orders')
const multer = require("multer")
const path = require("path")
const authRoutes = require('./LoginAuth/Auth')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const OrderProcessingMail = require('./OrderMail/OrderProcessingMail')
const OrderDeliveredMail = require('./OrderMail/OrderDeliveredMail')
const Razorpay = require('razorpay');
const crypto = require("crypto");
const fs = require('fs')
const GSTBillMail = require('./InvoiceMail/GSTBillMail');
const { gstInvoicePdf } = require('./service/gstInvoicePdf')

// CREATED APP
const app = express()
app.use(express.json())

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://purplle-ecommerce-clone-frontend.onrender.com"
    ]
}));

const PORT = process.env.PORT || 3001;

// MULTER FOR IMAGE
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './UploadsImage')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + "." + file.originalname)
//     }
// })

// const upload = multer({ storage })

//Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Multer storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'products',  // Cloudinary folder name
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'avif'],
        public_id: (req, file) => path.parse(file.originalname).name
    }
});

const upload = multer({ storage });


// IMAGE IS STATIC --- TO SHOWN IN BROWSER USING FOLDER
// app.use(express.static("UploadsImage"))

// DATABASE MONGODB CONNECTION
// mongoose.connect('mongodb://127.0.0.1:27017/purplle')

mongoose.connect(process.env.MONGO_URI)
console.log("MongoDB Connected")

// LOGIN ROUTE
app.use('/login', authRoutes)

// PAYMENT - RAZORPAY

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// ADDING PRODUCT DETAILS FROM FORM TO BACKEND
app.post('/imageUpload', upload.single('image'), async (req, res) => {
    try {
        // const productImage = req.file.filename

        const productImage = req.file.path;

        const { productName, productDescription, newPrice, oldPrice, discount, productQuantity, highlights, category } = req.body

        const productDetails = new Products({ productImage, productName, productDescription, newPrice, oldPrice, discount, productQuantity, highlights, category })
        // const image = await Products({ productImage })
        // await image.save()

        await productDetails.save()

        res.send({ "msg": "Product Added to db" })

    }
    catch (error) {
        res.send({ "msg": "Unable to Add" })
    }
})

// FETCHING PRODUCT DATA AND DISPLAY IT IN MANAGE PRODUCTS

app.get('/manageProducts', (req, res) => {
    Products.find()
        .then(products => res.json(products))
        .catch(err => res.json(err))
})

// FETCHING USER DATA

app.get('/manageUsers', (req, res) => {
    Users.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

//user side address data
app.get('/manageUsers/:id', async (req, res) => {
    try {
        const user = await Users.findById(req.params.id)
        res.status(200).json(user)
    }
    catch (err) {
        console.log(err)
    }
})

//user email to get address 
app.get("/manageOrderAddress/:email", async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.params.email })
        res.json(user)

    } catch (err) {
        console.log(err)
    }
})

// DELETE PRODUCTS

app.delete('/deleteProducts/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Products.findById(id)

        // const imagePath = path.join(__dirname, "UploadsImage", product.productImage)
        // if (fs.existsSync(imagePath)) {
        //     fs.unlinkSync(imagePath)
        // }

        const imageUrl = product.productImage;

        const publicId = "products/" + path.parse(imageUrl.split('/').pop()).name;

        await cloudinary.uploader.destroy(publicId);

        const deleteProduct = await Products.findByIdAndDelete(id)
        res.status(200).json(deleteProduct)
    }
    catch (err) {
        console.log(err)
    }
})

// DELETE USERS

app.delete('/deleteUsers/:id', async (req, res) => {
    try {
        const { id } = req.params

        const deleteUser = await Users.findByIdAndDelete(id)
        res.status(200).json(deleteUser)
    }
    catch (err) {
        console.log(err)
    }
})

// Category
app.get('/products/:category', async (req, res) => {
    try {
        const { category } = req.params;

        const filteredProducts = await Products.find({
            category: category
        });

        res.status(200).json(filteredProducts);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
})

app.put('/imageUpload/:id', upload.single("image"), async (req, res) => {
    try {

        const { id } = req.params
        const product = await Products.findById(id)
        let imageUrl = product.productImage

        const publicId = "products/" + path.parse(product.productImage.split('/').pop()).name

        if (req.file) {

            // delete old image
            await cloudinary.uploader.destroy(publicId)

            // new image 
            imageUrl = req.file.path;
        }

        const updateProduct = await Products.findByIdAndUpdate(
            id,
            {
                ...req.body,
                productImage: imageUrl
            },
            { new: true }
        );

        res.status(200).json(updateProduct);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Getting the image --http://localhost:3001/img/69ae5bd33e6fcea5a4b7a916

app.get("/imageUpload/:id", async (req, res) => {
    const { id } = req.params
    try {
        const product = await Products.findById(id)
        if (!product) res.send({ "msg": "Product not uploaded" })

        res.json(product)

        // const imagePath = path.join(__dirname, "UploadsImage", image.productImage)
        // res.sendFile(imagePath)
    }
    catch (err) {
        console.log(err)
    }
})

app.get('/products', (req, res) => {
    Products.find()
        .then(products => res.json(products))
        .catch(err => res.json(err))
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params
    try {
        const product = await Products.findById(id)

        res.json(product)
    }
    catch (err) {
        console.log(err)
    }
})

// PLACE AN ORDER

app.post('/placeAnOrder', async (req, res) => {
    const { userId, products, totalAmount, paymentMode } = req.body

    console.log("userId received:", userId);

    const user = await Users.findById(userId)

    const orderList = new Orders({
        userEmail: user.email,
        products: products,
        totalAmount: totalAmount,
        paymentMode: paymentMode,
        paymentId: null,
        paymentStatus: 'Pending'
    })

    await orderList.save()
    res.json({ message: 'order placed successfully' })
})

// MANAGE ORDER

app.get('/manageOrders', (req, res) => {
    Orders.find()
        .then(orders => res.json(orders))
        .catch(err => res.json(err))
})

app.get('/manageOrders/:id', async (req, res) => {
    try {
        const user = await Users.findById(req.params.id)
        const orders = await Orders.find({ userEmail: user.email })
        res.json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATING ORDER STATUS
app.put('/updateOrderStatus/:id', async (req, res) => {
    const { id } = req.params
    const { orderStatus } = req.body
    const updateOrderStatus = await Orders.findByIdAndUpdate(id, {
        orderStatus: orderStatus
    },
        {
            new: true
        })

    const status = orderStatus.trim().toLowerCase()

    if (status === 'order processing') {
        console.log("Processing mail triggered")
        await OrderProcessingMail(updateOrderStatus.userEmail)
    }

    else if (status === 'order delivered') {
        console.log("Delivered mail triggered")
        await OrderDeliveredMail(updateOrderStatus.userEmail)
    }

    res.status(200).json(updateOrderStatus)
})

// DELETING ORDER
app.delete('/deleteOrders/:id', async (req, res) => {
    try {
        const deleteOrders = await Orders.findByIdAndDelete(req.params.id)
        res.status(200).json(deleteOrders)
    }
    catch (err) {
        console.log(err)
    }
})

//SEARCH IMPLEMENTATION

app.get('/search', async (req, res) => {
    try {

        const { q } = req.query

        const products = await Products.find({
            $or: [
                { productName: { $regex: q || "", $options: "i" } },
                { productDescription: { $regex: q || "", $options: "i" } }
            ]
        })

        res.status(200).json({ products })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//USER PROFILE DATA
app.get('/userData/:id', async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);

    } catch (err) {
        res.status(500).json(err);
    }
})

//EDIT USER
app.put('/editProfile/:id', async (req, res) => {
    try {

        const { id } = req.params
        const { username, phonenumber } = req.body
        const updateUser = await Users.findByIdAndUpdate(
            id,
            {
                username: username,
                phonenumber: phonenumber
            },
            { new: true }
        );

        res.status(200).json(updateUser);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// Add address

app.put('/profile/myaddress/:id', async (req, res) => {
    try {
        const { pincode, location, city, state, username, phonenumber } = req.body
        const user = await Users.findById(req.params.id);

        user.username = username
        user.phonenumber = phonenumber

        user.address[0].pincode = pincode;
        user.address[0].location = location;
        user.address[0].city = city;
        user.address[0].state = state;

        await user.save();

        res.status(200).json(user)
    }
    catch (err) {
        console.log(err)
    }
})

// PAYMENT RAZORPAY -- BACKEND -- CREATE ORDER API

app.post('/createOrder', async (req, res) => {
    const { totalAmount } = req.body

    try {
        const order = await razorpay.orders.create({
            amount: totalAmount * 100,
            currency: 'INR',
            receipt: 'receipt_' + Date.now()
        })
        res.status(200).json({
            order,
            razorpayKeyId: process.env.RAZORPAY_KEY_ID
        })
    }
    catch (err) {
        console.log(err)
    }
})

// VERIFY PAYMENT
app.post("/verifyPayment", async (req, res) => {

    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        userId,
        products,
        totalAmount
    } = req.body;

    const generated_signature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex")

    const user = await Users.findById(userId)
    const userEmail = user?.email

    if (generated_signature === razorpay_signature) {

        await Orders.create({
            userEmail,
            products,
            totalAmount,
            paymentId: razorpay_payment_id,
            paymentStatus: "Success",
            paymentMode: 'Online Payment'
        });

        res.status(200).json({
            success: true,
            message: "Payment successful and order stored"
        });

    } else {

        await Orders.create({
            userEmail,
            products,
            totalAmount,
            paymentStatus: "Failed"
        });

        res.status(400).json({
            success: false,
            message: "Payment verification failed"
        });

    }

})

// PDF GENERATE OF PAYMENT & ORDER

app.post('/sendGSTInvoice', async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await Users.findById(userId)
        const order = await Orders.findOne({ userEmail: user.email }).sort({ orderDate: -1 })
        await GSTBillMail(order.userEmail, order, user)
        res.json({ success: true })
    }
    catch (err) {
        console.log(err)
    }
})


app.get("/downloadGSTInvoice/:orderId", async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await Orders.findById(orderId);
        const user = await Users.findOne({ email: order.userEmail })
        const pdfBuffer = await gstInvoicePdf(order, user);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=gst-invoice.pdf"
        );

        res.send(pdfBuffer);

        console.log("GST Invoice downloaded");

    } catch (error) {
        console.log("Error generating PDF", error);
    }
})

app.get("/admin/revenue", async (req, res) => {
    try {
        const orders = await Orders.find()
        let revenue = 0

        orders.forEach(order => {
            if (order.paymentStatus === "Success") {
                revenue += order.totalAmount
            }
        })

        res.json({ revenue })
    }

    catch (err) {
        console.log(err)
    }
})

// Admin Dashboard

app.get("/top-products", async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.productName",
          totalSold: { $sum: "$products.quantity" }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: 0,
          productName: "$_id",
          sales: "$totalSold"
        }
      }
    ]);

    res.json(topProducts);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

//Server running
app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`)
})