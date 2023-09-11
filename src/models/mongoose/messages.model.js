const mongoose = require('mongoose');
const {Schema, model} = require('mongoose')


const messageSchema = new Schema({
    user: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },

  });


  module.exports = model("message", messageSchema)

