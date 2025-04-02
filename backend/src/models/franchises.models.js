import mongoose from "mongoose";

const franchiseSchema = new mongoose.Schema({
    franchiseName:{
        type:String,
        required:true,
        trim:true,
        index:true,
    },
    address:{
        type:String,
        required:true,
        trim:true,
    },
    businessId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Business',
        required:true,
    },
    managerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
},{timestamps: true});

export const Franchise = mongoose.model("Franchise", franchiseSchema);