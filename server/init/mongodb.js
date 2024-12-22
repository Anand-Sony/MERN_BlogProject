const mongoose = require("mongoose");
const {connectionUrl} = require("../config/kyes");
const connectMongodb = async()=>{
    try{
        await mongoose.connect(connectionUrl);
        console.log("Database connection successfully");
    }
    catch(error){
        console.log(error);
    }
};
module.exports = connectMongodb;
