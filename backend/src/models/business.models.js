import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
    {
        ownerId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
        },
        businessName:{
            type:String,
            required:true,
            trim:true,
            index:true,
        },
        businessType:{
            type:String,
            required:true,
            trim:true,
        },
    },
    {timestamps: true}
);

export const Business = mongoose.model("Business", businessSchema);