const mongoose = require('mongoose');
const {Schema, model} = require('mongoose')


  const cartSchema = new Schema({
 
    usuarioId:String,
    
    products: [
      {
        productId:{
          type: Schema.Types.ObjectId,
          ref:'products',
        },
        quantity:{
          type: Number,
          default:0,
        },
        _id:false,
      }
    ],

  }, { versionKey: false });

  cartSchema.pre('findOne', function(){this.populate('products.productId')});

  cartSchema.pre('find', function(){
    this.populate('products.productId');
  })


  module.exports = model('carts',cartSchema)