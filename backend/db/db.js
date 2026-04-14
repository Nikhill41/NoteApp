const mongoose=require('mongoose')
// require('dotenv').config()
const connectToMongo=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("db connected successfully")
    }
    catch(error){
        console.log("db connection error",error.message);
    }
};
// connectToMongo()
module.exports=connectToMongo