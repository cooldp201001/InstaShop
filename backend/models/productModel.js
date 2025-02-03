const mongoose = require("../db/dbConnect");

// schema for a product
const productSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        price: { type: Number, required: true },
        discountPercentage: { type: Number },
        rating: { type: Number },
        stock: { type: Number, required: true },
        tags: [{ type: String }], // Array of strings
        sku: { type: String, required: true },
        weight: { type: Number, required: true },
        dimensions: {
            width: { type: Number },
            height: { type: Number },
            depth: { type: Number },
        },
        warrantyInformation: { type: String },
        shippingInformation: { type: String },
        availabilityStatus: {
            type: String,
            enum: ["In Stock", "Low Stock", "Out of Stock"],
        }, // Enum for validation
        reviews: [
            {
                rating: { type: Number, required: true },
                comment: { type: String, required: true },
                date: { type: Date, default: Date.now },
                reviewerName: { type: String, required: true },
                reviewerEmail: { type: String, required: true },
            },
        ],
        returnPolicy: { type: String },
        minimumOrderQuantity: { type: Number, required: true },
        meta: {
            createdAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: Date.now },
            barcode: { type: String },
            qrCode: { type: String },
        },
        images: [{ type: String }], // Array of image URLs
        thumbnail: { type: String },
    },
    {
        timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
    }
);

//  schema into a model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
