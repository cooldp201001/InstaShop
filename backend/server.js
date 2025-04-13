const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = 3000;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config()

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"]
};

app.use(cors(corsOptions));
  
//All routers
const randomRouter = require('./Routes/randomRouter')
const productRouter = require('./Routes/productRouter');
const registerRouter = require('./Routes/registerRouter');
const loginRouter = require('./Routes/loginRouter');
const cartRouter = require('./Routes/cartRouter');
const orderRouter = require('./Routes/orderRoutes');
const userRouter = require('./Routes/userRouter');
const authenticateToken = require('./middlewares/authMiddleware');

// Geting random (categories, product, and reviews) data for the home page only
app.use('/random',randomRouter)

// Product Router
app.use('/product',productRouter)

// Register Router
app.use('/register',registerRouter)

// Login Router
app.use('/login',loginRouter)

// Protected routes (need to login first)
app.use(authenticateToken);

// user Router
app.use('/user',userRouter)

// Cart Router
app.use('/cart',cartRouter);

// Order Router
app.use('/order',orderRouter);

app.post('/logout',(req,res)=>{
  // console.log(res.cookie)
  res.clearCookie("token", { httpOnly: true, sameSite: 'strict', secure: true,}); // Clear the cookie
  res.status(200).json({ message: "Logout successful" });

})


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})