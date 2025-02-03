const express = require('express');
const app = express();
const cors = require('cors');
const ProductCollection = require('./models/productModel');
const port = 3000;
app.use(express.json());
app.use(cors())
//All routes
const categories = require('./Routes/categories');
const randomRouter = require('./Routes/random')
app.get('/', async(req,res)=>{
    const products = await ProductCollection.find();
    res.send(products);
})

//Get all Products Categories
// app.use('/categories',categories);
// app.use('/randomCategories',getCategoriesWithImages);

app.use('/random',randomRouter)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})