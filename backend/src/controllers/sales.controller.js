import { Sale } from "../models/sales.models.js";
import { Product } from "../models/products.models.js";
import { ApiError } from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import {FranchisesStock} from '../models/franchisesstock.models.js'

const createSale = asyncHandler(async (req, res) => {
    const { franchiseId } = req.params;
    const { saleItems,saleAmount, saleDate } = req.body;

    if (!saleItems || !saleAmount || !saleDate) {
        return res.status(400).json(new ApiResponse(400, null, "Missing required fields."));
    }

    const sale = new Sale({
        salesItems:saleItems,
        salesDate:saleDate,
        salesAmount:saleAmount,
        franchiseId,
    });
    await sale.save();

    for (const item of saleItems) {
        const { productId, quantity } = item;

        const franchiseStock = await FranchisesStock.findOne({
            franchiseId,
            productId,
        });

        if (franchiseStock) {
                franchiseStock.quantity -= quantity;
                await franchiseStock.save();
            } else {
                return res.status(404).json(new ApiResponse(404, null, `Stock not found for product ${productId}`));
            }
        }
        res.status(201).json(new ApiResponse(201, { sale }, "Sale created successfully and stock updated."));
});

const getSales = asyncHandler(async (req, res) => {
    const { franchiseId } = req.params; 
    const sales = await Sale.find({ franchiseId }).populate('salesItems.productId');
    if (sales.length === 0) {
        throw new ApiError(404, "No sales found.");
    }
    res.json(new ApiResponse(200, { sales }, "Sales retrieved successfully."));

});

const getSale = asyncHandler(async (req, res) => {
    const { saleId } = req.params;
    const sale = await Sale.findById(saleId);
    if (!sale) {
        throw new ApiError(404, "Sale not found.");
    }
    // to retrieve the products which are sold in the sale
    const saleItems= sale.saleItems;
    const products = [];
    saleItems.forEach(async (item)=>{
        const product = await Product.findById(item.productId);
        products.push(product);
    });
    sale={...sale,saleItems:products};
    res.json(new ApiResponse(200,{sale},"Sale retrieved successfully."));
});

const deleteSale = asyncHandler(async (req, res) => {
    const { saleId } = req.params;
    const sale = await Sale.findById(saleId);
    if (!sale) {
        throw new ApiError(404, "Sale not found.");
    }
    await sale.remove();
    res.json(new ApiResponse(200,null,"Sale deleted successfully."));
});


export { createSale, getSales, getSale, deleteSale };