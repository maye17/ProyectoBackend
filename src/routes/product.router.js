const fs = require("fs");
const express = require("express");
/* const ProductManager = require("../dao/ProductManager.js");
const productos = new ProductManager ("./productos.json"); */
const handlebars = require("express-handlebars");
const uploader = require("../utils/utils.js");

const PrincipalController = require('../controllers/product.controller.js') 
const principalControllers = new PrincipalController()

const principalRouter = express.Router();

//obteniendo todos los productos
principalRouter.get('/', principalControllers.getAllProd)

principalRouter.post('/', principalControllers.createProduct)

module.exports = principalRouter;