import mongoose from "mongoose";
import { Inventory } from "../models/inventory.models.js";
import { Product } from "../models/products.models.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";

const createInventory = asyncHandler(async (req, res) => {
    const { inventoryName } = req.body;
    const { businessId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(businessId)) {
        throw new ApiError(400, "Invalid business ID.");
    }
    const existingInventory = await Inventory.findOne({ inventoryName, businessId });
    if (existingInventory) {
        throw new ApiError(400, "Inventory already exists.");
    }
    const inventory = new Inventory({
        inventoryName,
        businessId,
    });
    await inventory.save();
    res.status(201).json(new ApiResponse(200,inventory));
});

const getInventories = asyncHandler(async (req, res) => {
    const { businessId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(businessId)) {
        throw new ApiError(400, "Invalid franchise ID.");
    }
    const inventories = await Inventory.find({ businessId });
    if(inventories.length === 0){
        throw new ApiError(404, "No inventories found.");
    }
    res.json(new ApiResponse(200,inventories));
});

const getInventory = asyncHandler(async (req, res) => {
    const { inventoryId } = req.params;
    const inventory = await Inventory.findById(inventoryId);
    if (!inventory) {
        throw new ApiError(404, "Inventory not found.");
    }
    const products = await Product.find({ inventory: inventoryId });
    inventory.products = products;
    res.json(new ApiResponse(200, inventory));
});

const updateInventory = asyncHandler(async (req, res) => {
    const { inventoryId,inventoryName } = req.body;
    const inventory = await Inventory.findById(inventoryId);
    if (!inventory) {
        throw new ApiError(404, "Inventory not found.");
    }
    inventory.inventoryName = inventoryName;
    await inventory.save();
    res.json(new ApiResponse(200, {inventory}, "Inventory updated successfully."));
});

const deleteInventory = asyncHandler(async (req, res) => {
    const { inventoryId } = req.params;
    await Inventory.findByIdAndDelete(inventoryId);
    
    res.json(new ApiResponse(200, null, "Inventory deleted successfully."));
});

export { createInventory, getInventories, getInventory, updateInventory, deleteInventory };

