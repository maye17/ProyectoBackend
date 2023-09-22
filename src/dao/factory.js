const config = require('../config/config')
const connectMongo = require('../utils/mongo')
const FactoryMongo = require('../services/product.api.service')

const FactoryMemory = require('../models/memory/product.memory')

let Factory;

switch (config.persistence) {
    case 'MONGO':
       // console.log('connect mongo')
        connectMongo();
        Factory =  FactoryMemory;
        break;
    case 'MEMORY':
       // console.log('Persistence with Memory');
        Factory =  FactoryMemory;
        break;
    default:
        break;
}

module.exports = Factory;
