import mongoose from 'mongoose';
import {Product} from '../models/products.models.js';
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {Inventory} from "../models/inventory.models.js"

const createProduct = asyncHandler(async (req, res) => {
    const { productName, price, sku, inventory } = req.body;
    const existedProduct = await Product.findOne({ productName,inventory });
    if (existedProduct) {
        throw new ApiError(400, "Product already exists.");
    }
    const product = new Product({
        productName,
        price,
        sku,
        inventory
    });

    const createdProduct = await product.save();
    res.status(201).json(new ApiResponse(200,{ product: createdProduct }));
});

const getProducts = asyncHandler(async (req, res) => {
    const { inventoryId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(inventoryId)) {
        throw new ApiError(400, "Invalid inventory ID.");
    }
    const products = await Product.find({ inventory: inventoryId });
    if(products.length === 0){
        throw new ApiError(404, "No products found.");
    }
    res.json(new ApiResponse(200,{ products }, "Products retrieved successfully."));
});

const getProductsByBusinessId = asyncHandler(async (req, res) => {
    const { businessId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(businessId)) {
        throw new ApiError(400, "Invalid business ID.");
    }
    const inventories = await Inventory.find({ businessId });
    if (inventories.length === 0) {
        throw new ApiError(404, "No inventories found for this business ID.");
    }
    const inventoryIds = inventories.map(inventory => inventory._id);
    const products = await Product.find({ inventory: { $in: inventoryIds } });
    if (products.length === 0) {
        throw new ApiError(404, "No products found for the given business ID.");
    }
    res.json(new ApiResponse(200, { products }, "Products retrieved successfully."));
});

const updateProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params
    const { productName, price, sku } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found.");
    }
    product.productName = productName;
    product.price = price;
    product.sku = sku;
    await product.save();
    res.json(new ApiResponse(200,{ product }, "Product updated successfully."));
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);
    res.json(new ApiResponse(200,{}, "Product deleted successfully."));
});

export { createProduct, getProducts, getProductsByBusinessId, updateProduct, deleteProduct };
