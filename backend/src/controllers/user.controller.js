import mongoose from 'mongoose';
import {User} from '../models/user.models.js';
import { Business } from '../models/business.models.js';
import { sendEmail,verifyEmail } from '../utils/VerifyEmail.js';
import { ApiError } from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import store from 'store2';

const genrateAccessAndRefreshTokens=async(userId)=>{
    try{
        const user= await User.findById(userId);
        const accessToken=user.genrateAccessToken();
        const refreshToken=user.genrateRefershToken();
        console.log("refreshToken: ",refreshToken);
        console.log("accessToken: ",accessToken);
        user.refreshToken=refreshToken;
        await user.save({validateBeforeSave:false});
        return {accessToken,refreshToken};
    }catch(e){
        throw new ApiError(500,"Token generation failed");
    }
}

const sendEmailVerification = asyncHandler(async (req,res) => {
    const email= req.body.email;
    store.set("email",email);
    sendEmail(email);
    res.send(new ApiResponse(200,"Email sent successfully"));
})

const verifyEmailVerification = asyncHandler(async (req,res) => {
    const email = store.get("email");
    const otp = req.body.otp;
    if(verifyEmail(email,otp)){
        const existedUser=await User.exists({email:email});
        if(existedUser){
            throw new ApiError(400,"Email is already in use");
        }
        const user = new User({
            email: email,
            name:"User",
            password: "123456"
        });
        await user.save();
        res.send(new ApiResponse(200,user,"Email verified successfully"));
    }else{
        throw new ApiError(400,"Invalid OTP");
    }
})

const registerUser = asyncHandler(async (req,res) => {
    const email=store.get("email");
    const {name,password,businessName,businessType} = req.body.formData;
    console.log(email,name,password,businessName,businessType);
    if(
        [email,name,password,businessName,businessType].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required");
    }
    console.log(email,name,password,businessName,businessType);

    const existedUser=await User.findOne({
        email:email
    });
    if(!existedUser){
        throw new ApiError(400,"Email not registered");
    }

    if(existedUser.name!=="User" && existedUser.password!=="123456"){
        throw new ApiError(400,"Email already registered");
    }

    existedUser.name=name;
    existedUser.password=password;
    const user=await existedUser.save({validateBeforeSave:false});

    const business = new Business({
        ownerId: user._id,
        businessName: businessName,
        businessType: businessType
    });
    const createdBusiness = await business.save();

    //remove email from the local storage
    store.remove("email");

    //remove password and refresh token from the response
    res.send(new ApiResponse(200,{user,createdBusiness},"User registered successfully"));
})

const loginUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body;
    if(!email || !password){
        throw new ApiError(400,"Email and password required");
    }
    const user= await User.findOne({
        email:email
    });
    if(!user){
        throw new ApiError(400,"User not found");
    }
    console.log(user);
    const isPasswordValid=await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(400,"Invalid password");
    }

    const {accessToken,refreshToken}=await genrateAccessAndRefreshTokens(user._id);

    const loggedInUser=await User.findById(user._id).select("-password -refreshToken");

    return res.status(200)
    .json(new ApiResponse(200,{user:loggedInUser,accessToken,refreshToken},"Login successful"));

})

const changePassword = asyncHandler(async (req,res) => {
    const {oldPassword,newPassword} = req.body;
    if(!oldPassword || !newPassword){
        throw new ApiError(400,"Old and new password required");
    }
    const user= await User.findById(req.user._id);
    if(!user){
        throw new ApiError(400,"User not found");
    }
    const isPasswordValid=await user.isPasswordCorrect(oldPassword);
    if(!isPasswordValid){
        throw new ApiError(400,"Invalid password");
    }
    user.password=newPassword;
    await user.save();
    res.send(new ApiResponse(200,"Password changed successfully"));
})

const updateDetails = asyncHandler(async (req,res) => {
    const {name,businessName,businessType} = req.body;
    if(!name || !businessName || !businessType){
        throw new ApiError(400,"All fields required");
    }
    const user = await User.findById(req.user._id);
    if(!user){
        throw new ApiError(400,"User not found");
    }
    if(name){
        user.name=name;
    }
    const business = await Business.findOne({ownerId:req.user._id});
    if(!business){
        throw new ApiError(400,"Business not found");
    }
    if(businessName){
        business.businessName=businessName;
    }
    if(businessType){
        business.businessType=businessType;
    }
    await user.save();
    await business.save();
    res.send(new ApiResponse(200,"Details updated successfully"));
})

const getCurrentUser = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id).select("-password -refreshToken");
    const business = await Business.findOne({ownerId:req.user._id});
    if(!business){
        res.send(new ApiResponse(200,user));
    }
    res.send(new ApiResponse(200,{user,business}));
})


export {sendEmailVerification,verifyEmailVerification,registerUser,loginUser,changePassword,updateDetails,getCurrentUser};