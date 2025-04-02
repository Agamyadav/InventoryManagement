import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    inventoryName:{
        type: String,
        required: true,
        unique: true,
    },
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
    },
}, { timestamps: true });

export const Inventory = mongoose.model("Inventory", inventorySchema);