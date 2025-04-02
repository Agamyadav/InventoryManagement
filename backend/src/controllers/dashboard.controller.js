import mongoose from 'mongoose';
import { Product } from '../models/products.models.js';
import { FranchisesStock } from '../models/franchisesstock.models.js';
import { ApiError } from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import { Sale } from '../models/sales.models.js';


const stockInFranchise = asyncHandler(async (req, res) => {
    const { franchiseId,inventoryId } = req.params;
    const products = await FranchisesStock.find({ franchiseId,inventoryId });
    if(products.length === 0){
        throw new ApiError(404, "No products found in the franchise.");
    }
    const stock = [];
    for(const product of products){
        const productDetails = await Product.findById(product.productId);
        stock.push({product:productDetails,quantity:product.quantity});
    }
    //sort the stock by available quantity
    stock.sort((a,b)=>b.quantity-a.quantity);
    res.json(new ApiResponse(200,{stock},"Stock retrieved successfully."));
});

const getLowStock = asyncHandler(async (req, res) => {
    const { franchiseId } = req.params;
    let franchiseStock = await FranchisesStock.find({ franchiseId: new mongoose.Types.ObjectId(franchiseId) })
        .populate("productId");

    if (franchiseStock.length === 0) {
        return res.status(404).send(new ApiResponse(404, null, "No franchise stock found."));
    }
    const lowStockProducts = [];
    for (const stock of franchiseStock) {
        const productDetails = stock.productId; 
        if (stock.quantity <= productDetails.sku && stock.quantity !=0) {
            lowStockProducts.push({
                product: productDetails,
                quantity: stock.quantity
            });
        }
    }
    lowStockProducts.sort((a, b) => a.quantity - b.quantity);
    res.json(new ApiResponse(200, { stock: lowStockProducts }, "Low stock retrieved successfully."));
});

const getFranchiseHighestSellingProducts = asyncHandler(async (req, res) => {
    const { franchiseId } = req.params;
    const sales = await Sale.find({ franchiseId });
    if(sales.length === 0){
        throw new ApiError(404, "No sales found for the franchise.");
    }
    const products = [];
    for (const sale of sales) {
        for (const product of sale.salesItems) {
            const productDetails = await Product.findById(product.productId);
            const existingProductIndex = products.findIndex(p => p.product._id.toString() === productDetails._id.toString());

            if (existingProductIndex >= 0) {
                products[existingProductIndex].quantity += product.quantity;
            } else {
                products.push({
                    product: productDetails,
                    quantity: product.quantity,
                    price: product.price
                });
            }
        }
    }
    //sort the products by highest selling quantity
    products.sort((a,b)=>b.quantity-a.quantity);
    res.json(new ApiResponse(200,{products},"Highest selling products retrieved successfully."));

});

const productSalesByMonth = asyncHandler(async (req, res) => {
    const { franchiseId } = req.params;
    const sales = await Sale.find({franchiseId});
    if(sales.length === 0){
        throw new ApiError(404, "No sales found for the franchise.");
    }
    const salesByMonth = [];
    for(const sale of sales){
        const month = sale.salesDate.getMonth();
        salesProducts = [];
        for(const product of sale.saleItems){
            const productDetails = await Product.findById(product.productId);
            salesProducts.push({product:productDetails,quantity:product.quantity,price:product.price});
        }
        if(salesByMonth[month]){
            salesByMonth[month].push({saleItems:salesProducts,salesAmount:sale.salesAmount});
        }else{
            salesByMonth[month] = [{saleItems:salesProducts,salesAmount:sale.salesAmount}];
        }
    }
});

const getRevnueByMonth = asyncHandler(async (req, res) => {
    const { franchiseId } = req.params;
    const sales = await Sale.find({franchiseId});
    if(sales.length === 0){
        throw new ApiError(404, "No sales found for the franchise.");
    }
    const revenueByMonth = [];
    for(const sale of sales){
        const month = sale.salesDate.getMonth();
        if(revenueByMonth[month]){
            revenueByMonth[month] += sale.salesAmount;
        }else{
            revenueByMonth[month] = sale.salesAmount;
        }
    }
    res.json(new ApiResponse(200,{revenueByMonth},"Revenue by month retrieved successfully."));
});




export { stockInFranchise, getLowStock, getFranchiseHighestSellingProducts, productSalesByMonth, getRevnueByMonth };