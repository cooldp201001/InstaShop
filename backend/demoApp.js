const express = require('express')
const app = express();
const ProductCollection = require('./models/productModel');

app.get('/demo', async (req,res)=>{
    const products = await ProductCollection.find();
    res.json(products);
})

//get allCategories
app.get('/demo/allCategories',async (req,res)=>{
   const allCategories = await ProductCollection.distinct("category");
   res.json(allCategories);
})
app.listen(1000,()=>{
    console.log('server is running on port 1000')
})