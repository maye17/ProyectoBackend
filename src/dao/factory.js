const config = require('../config/config');
const connectMongo = require('../utils/mongo');
const FactoryMongo = require('../services/product.api.service.js');
const FactoryMemory = require('../models/memory/product.memory.js');

let FactoryNew;

switch (config.persistence) {
    case 'MONGO':
        console.log('connect mongo');
        connectMongo();
        FactoryNew = FactoryMongo;
        break;
    case 'MEMORY':
        console.log('Persistence with Memory');
        FactoryNew = FactoryMemory;
        break;
    default:
        break;
}

module.exports = FactoryNew;
