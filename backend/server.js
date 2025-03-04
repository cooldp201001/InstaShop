const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const ProductCollection = require('./models/productModel');
const port = 3000;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors())
require("dotenv").config()



const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"]
};

app.use(cors(corsOptions));
  
//All routes
const categories = require('./Routes/categories');
const randomRouter = require('./Routes/random')
const productsRouter = require('./Routes/products');
const registerRouter = require('./Routes/register');
const loginRouter = require('./Routes/loginRouter');
const authenticateToken = require('./middlewares/authMiddleware');
const cartRouter = require('./Routes/cartRoutes');
const orderRouter = require('./Routes/orderRoutes');
const userRouter = require('./Routes/userRoutes');

//Get all Products Categories
// app.use('/categories',categories);
// app.use('/randomCategories',getCategoriesWithImages);
app.use('/random',randomRouter)

app.use('/product',productsRouter)

app.use('/register',registerRouter)
app.use('/login',loginRouter)


app.use('/user',authenticateToken,userRouter)
app.use('/order',authenticateToken,orderRouter);
app.use('/cart',authenticateToken,cartRouter);
app.use('/logout',(req,res)=>{

    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      res.json({ message: "Logged out successfully" });
})

app.get('/set-cookie', (req, res) => {
    res.cookie('test', '1234', { httpOnly: true });
    res.send('Cookie set');
  });

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})