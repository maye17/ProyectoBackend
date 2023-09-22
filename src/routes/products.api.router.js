const fs = require("fs");
const express = require("express");
const uploader = require("../utils/utils.js");
 
const ProductsController  = require("../controllers/product.api.controller.js")
const productsController = new ProductsController();
const Factory = require('../DAO/factory.js')

const productsRouter = express.Router();

//obtiene todos los productos
productsRouter.get("/",productsController.getAll);

//obtiene por id de producto
productsRouter.get("/:pid", productsController.getById);
//post =crear un producto
productsRouter.post("/", productsController.createOne);

//put = modifica un producto

productsRouter.put("/:pid", productsController.updateOne);

//delete = elimina un producto

productsRouter.delete("/:id",productsController.deleteOne);


module.exports =  productsRouter;