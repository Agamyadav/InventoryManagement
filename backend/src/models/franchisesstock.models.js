import mongoose from "mongoose";

const franchisesStockSchema = new mongoose.Schema({
    franchiseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Franchise",
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

export const FranchisesStock = mongoose.model("FranchisesStock", franchisesStockSchema);