const fs = require("fs");
const express = require("express");
const uploader = require("../utils/utils.js");
const addLoggers = require('../utils/logger')
 
const ProductsController  = require("../controllers/product.api.controller.js")
const productsController = new ProductsController();
const Factory = require('../DAO/factory.js')

const productsRouter = express.Router();

//obtiene todos los productos
productsRouter.get("/",addLoggers,productsController.getAll);

//obtiene por id de producto
productsRouter.get("/:pid", addLoggers, productsController.getById);
//post =crear un producto
productsRouter.post("/",addLoggers, productsController.createOne);

//put = modifica un producto

productsRouter.put("/:pid",addLoggers, productsController.updateOne);

//delete = elimina un producto

productsRouter.delete("/:id",addLoggers, productsController.deleteOne);


module.exports =  productsRouter;