const mongoose = require('mongoose');
const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
 
const productSchema = new Schema({

    title: { type: String, required: true},
    description: { type: String, required: true },
    price: { type: Number, required: true},
    thumbnail: { type: String, required: false },
    code: { type: String, required: true, unique: true},
    stock: { type: Number, required: true},
    marca: {type:String,required:false},
    status: { type: Boolean, default: false },
    date: { type:Date},

  } )/* { versionKey: false }) */

  productSchema.plugin(mongoosePaginate);


module.exports = model('products',productSchema)
  
