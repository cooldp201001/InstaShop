const ProductCollection = require('../models/productModel');

// Get all categories for the product page
const getAllCategories = async (req,res)=>{
    try{
    const allCategories = await ProductCollection.distinct("category");
    res.json(allCategories);
}
catch (e){
    res.status(500).json({message: "Error fetching categories"});
}
}

// Get all products for the product page
const getAllProducts = async (req, res) => {
    try{
        const products = await ProductCollection.find();
        res.json(products);
    }catch(e){
           res.status(500).json({message: "Error fetching products"});
    }
   
}
 
// Get specific product by the prduct name
const getSpecificProduct = async (req, res) => {
    try{
         const product = await ProductCollection.findOne({id:req.params.id});
         res.json(product);
    }
    catch(e){
        res.status(500).json({message: "Error fetching product"});
    }
}

module.exports = {getAllCategories,getAllProducts,getSpecificProduct};