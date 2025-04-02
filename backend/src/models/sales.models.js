import mongoose from "mongoose";

const salesItemSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    totalAmount:{
        type:Number,
        required:true,
    },
});

const salesSchema = new mongoose.Schema({
    salesItems:[salesItemSchema],
    salesDate:{
        type:String,
        required:true,
    },
    salesAmount:{
        type:Number,
        required:true,
    },
    franchiseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Franchise',
        required:true,
    },
}, { timestamps: true });

export const Sale = mongoose.model("Sale", salesSchema);