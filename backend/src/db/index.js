import mongoose  from "mongoose";


const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log(`\n MongoDB connected`);
    }catch(e){
        console.log("mongodb connection error : ",e)
        process.exit(1)
    }
}

export default connectDB;