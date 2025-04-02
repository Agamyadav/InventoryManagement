import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
});

const orderSchema = new mongoose.Schema({
    orderItems:[orderItemSchema],
    orderDate:{
        type:Date,
        required:true,
    },
    orderStatus:{
        type:String,
        enum:['Pending','Processing','Shipped','Delivered','Cancelled'],
        required:true,
        trim:true,
        default:'Pending',
    },
    orderAmount:{
        type:Number,
        required:true,
    },
    franchiseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Franchise',
        required:true,
    },
},{timestamps: true});

export const Order = mongoose.model("Order", orderSchema);