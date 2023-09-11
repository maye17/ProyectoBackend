//@ts-check
const mongoose = require('mongoose');
const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const Userschema = new Schema({
    firstName:{
        type:String,
        required:false,
        max:100,
    },
    lastName:{
        type: String,
        required:true,
        max:100,
    },
    email: {
        type: String,
        required: false,
        max: 100,
        unique: true,
      },
    password:{
        type: String,
        required:false,
        max:100,
    },
    isAdmin:{
        type: Boolean,
        required:false,

    },
    usuario:{
        type: String,
        required:false,
        max:100,
    },
    profile:{
        type:String,
        required:false,
        max:100,
    },
    

});

Userschema.plugin(mongoosePaginate)

module.exports = model('users',Userschema)
