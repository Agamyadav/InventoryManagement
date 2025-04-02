import mongoose from "mongoose";
import { ApiError } from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import {Franchise} from '../models/franchises.models.js';
import {User} from '../models/user.models.js';
import {FranchisesStock} from '../models/franchisesstock.models.js';
import {Product} from '../models/products.models.js';
import { Inventory } from "../models/inventory.models.js";


const createFranchise = asyncHandler(async (req,res) => {
    const {franchiseName,address,businessId} = req.body;
    if(
        [franchiseName,address,businessId].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required");
    }
    const franchise = new Franchise({
        franchiseName:franchiseName,
        address:address,
        businessId:new mongoose.Types.ObjectId(businessId),
    });
    await franchise.save();
    res.send(new ApiResponse(200,franchise,"Franchise created successfully"));
})

const createFranchiseStock = asyncHandler(async (req,res) => {
    const { franchiseId, businessId } = req.body; 
    const inventories = await Inventory.find({ businessId: new mongoose.Types.ObjectId(businessId) });
    const inventoryIds = inventories.map(inventory => inventory._id);
    const products = await Product.find({ inventory: { $in: inventoryIds } });
    for (const product of products) {
        const existingFranchiseStock = await FranchisesStock.findOne({
            franchiseId: franchiseId,
            productId: product._id
        });

        if (!existingFranchiseStock) {
            const franchiseStock = new FranchisesStock({
                franchiseId: franchiseId,
                productId: product._id,
            });
            await franchiseStock.save();
        }
    }
    res.send(new ApiResponse(200,"Franchise stock added successfully"));
});

const setManager = asyncHandler(async (req,res) => {
    const {managerName,managerEmail,managerPassword,franchiseId} = req.body;
    if(
        [managerName,managerEmail,managerPassword,franchiseId].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required");
    }
    const franchise = await Franchise.findById(franchiseId);
    if(!franchise){
        throw new ApiError(404,"Franchise not found");
    }
    const manager = new User({
        name:managerName,
        email:managerEmail,
        password:managerPassword,
        role:"manager",
    });
    await manager.save({validateBeforeSave:false});

    franchise.managerId = manager._id;
    await franchise.save();
    res.send(new ApiResponse(200,franchise,"Manager set successfully"));
});

const getFranchises = asyncHandler(async (req,res) => {
    const {businessId} = req.body;
    if(!businessId){
        throw new ApiError(400,"Business ID is required");
    }
    const franchises = await Franchise.find({businessId:new mongoose.Types.ObjectId(businessId)}).populate("managerId","name email");
    res.send(new ApiResponse(200,franchises,"Franchises fetched successfully"));
});

const getFranchise = asyncHandler(async (req,res) => {
    const {franchiseId} = req.body;
    if(!franchiseId){
        throw new ApiError(400,"Franchise ID is required");
    }
    const franchise = await Franchise.findById(franchiseId).populate("managerId","name email");
    if(!franchise){
        throw new ApiError(404,"Franchise not found");
    }
    res.send(new ApiResponse(200,franchise,"Franchise fetched successfully"));
});



const getFranchiseStock = asyncHandler(async (req,res) => {
    const { franchiseId } = req.body;
    if (!franchiseId) {
        throw new ApiError(400, "Franchise ID is required");
    }
    const franchiseStock = await FranchisesStock.find({ franchiseId: new mongoose.Types.ObjectId(franchiseId) })
        .populate("productId"); 
    if (franchiseStock.length === 0) {
        return res.send(new ApiResponse(404, null, "No franchise stock found."));
    }
    res.send(new ApiResponse(200, franchiseStock, "Franchise stock fetched successfully."));
});

const getFranchiseStockByInventory = asyncHandler(async (req, res) => {
    const { franchiseId, inventoryId } = req.body;
    if (!franchiseId) {
        throw new ApiError(400, "Franchise ID is required");
    }
    let franchiseStock = await FranchisesStock.find({ franchiseId: new mongoose.Types.ObjectId(franchiseId) })
        .populate("productId");
    if (franchiseStock.length === 0) {
        return res.status(404).send(new ApiResponse(404, null, "No franchise stock found."));
    }
    if (inventoryId) {
        franchiseStock = franchiseStock.filter(stockItem => 
            stockItem.productId&&stockItem.productId.inventory.toString() === inventoryId.toString()
        );
    }
    if (franchiseStock.length === 0) {
        return res.status(404).send(new ApiResponse(404, null, "No stock found for the given inventory."));
    }
    res.status(200).send(new ApiResponse(200, franchiseStock, "Franchise stock fetched successfully."));
});

const updateProductStock = asyncHandler(async (req,res) => {
    const {franchiseId,productId,quantity} = req.body;
    if(!franchiseId || !productId || !quantity){
        throw new ApiError(400,"Franchise ID, Product ID and quantity are required");
    }
    const franchiseStock = await FranchisesStock.findOne({franchiseId:new mongoose.Types.ObjectId(franchiseId),productId:new mongoose.Types.ObjectId(productId)});
    if(!franchiseStock){
        throw new ApiError(404,"Franchise stock not found");
    }
    franchiseStock.quantity = quantity;
    await franchiseStock.save();
    res.send(new ApiResponse(200,franchiseStock,"Franchise stock updated successfully"));
});

const updateFranchise = asyncHandler(async (req,res) => {
    const {franchiseId,franchiseName,address} = req.body;
    if(!franchiseId){
        throw new ApiError(400,"Franchise ID is required");
    }
    const franchise = await Franchise.findById(franchiseId);
    if(!franchise){
        throw new ApiError(404,"Franchise not found");
    }
    if(franchiseName){
        franchise.franchiseName = franchiseName;
    }
    if(address){
        franchise.address = address;
    }
    await franchise.save();
    res.send(new ApiResponse(200,franchise,"Franchise updated successfully"));
});

const deleteFranchise = asyncHandler(async (req,res) => {
    const {franchiseId} = req.params;
    if(!franchiseId){
        throw new ApiError(400,"Franchise ID is required");
    }
    const franchise = await Franchise.findById(franchiseId);
    if(!franchise){
        throw new ApiError(404,"Franchise not found");
    }
    await franchise.remove();
    res.send(new ApiResponse(200,franchise,"Franchise deleted successfully"));
});

export {createFranchise,setManager,getFranchiseStockByInventory,getFranchises,createFranchiseStock,getFranchise,updateFranchise,deleteFranchise,getFranchiseStock,updateProductStock};