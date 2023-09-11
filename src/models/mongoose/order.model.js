const mongoose = require('mongoose');
const {Schema, model} = require('mongoose')
const { schema } = require("./user.model");

const OrderModel =  new Schema({
    name: String,
    marca:{
        type: String,
        enum:['Dell','HP','Lenovo','Asus','Acer'],
        default: 'medium'
    },
    price:Number,
    quantity:Number,
    date:Date,
});


module.exports = model('order',OrderModel)