const mongoose  = require('mongoose');
const config = require('../config/config')

const connectMongo = async ()=>{
    try {
        
        await mongoose.connect (
           // "mongodb+srv://maye_17:Z43IROGnWaS5mLn0@ecommerce.dhbbfye.mongodb.net/ecommerce?retryWrites=true&w=majority"
            config.mongoUrl
        );
        console.log("plug to mongo!");
      
    } catch (error) {
        console.log(error);
        throw "can not connect to the db";
        
    }

}

module.exports = connectMongo ;