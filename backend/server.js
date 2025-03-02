const express = require('express');
const app = express();
const cors = require('cors');
const ProductCollection = require('./models/productModel');
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
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
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})