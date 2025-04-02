import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    price: {
        type: Number,
        required: true,
    },
    sku: {
        type: String,
        required: true,
        trim: true,
    },
    inventory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Inventory',
    },
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);