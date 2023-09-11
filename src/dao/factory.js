const config = require('../config/config')
const connectMongo = require('../utils/mongo')
const FactoryMongo = require('../services/product.api.service')

const FactoryMemory = require('../models/memory/product.memory')

let Factory;

switch (config.persistence) {
    case 'MONGO':
        console.log('connect mongo')
        connectMongo();
        Factory =  FactoryMemory;
        break;
    case 'MEMORY':
        console.log('Persistence with Memory');
        Factory =  FactoryMemory;
        break;
    default:
        break;
}
/* function createFactory() {
    if (typeof Factory === 'function') {
        return new Factory();
    } else {
        console.error('No se pudo encontrar un constructor adecuado para Factory.');
        return null; // O devuelve un valor predeterminado o maneja el error según tus necesidades
    }
} */

module.exports = Factory;
