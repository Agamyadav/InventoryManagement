import nodemailer from 'nodemailer'
import crypto from 'crypto'
import { set } from 'mongoose';

const otps = {};
const genrateOtp=()=>{
    return crypto.randomInt(100000,999999).toString();
}

const sendEmail = (email) => {
    const otp = genrateOtp();
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
      });
    otps[email] = otp;
    setTimeout(()=>{
        delete otps[email];
    },50000)
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Confirm Your Email for Bizzy',
        text: `
        Hi,
        Thank you for registering with Bizzy! To complete your registration, please use the following One-Time Password (OTP):
        
        ${otp}

        This OTP is valid for the next 5 minutes. Please enter it in the app to verify your email address.

        If you did not initiate this registration, please ignore this email.

        Thank you,
        The Bizzy Team`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

const verifyEmail = async (email,otp) => {
    if(otps[email]===otp){
        return true;
    }
    return false;
}

export {sendEmail,verifyEmail};
