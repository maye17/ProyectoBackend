const fs = require("fs");
const express = require("express");
/* const ProductManager = require("../dao/ProductManager.js");
const productos = new ProductManager ("./productos.json"); */

const handlebars = require("express-handlebars");

const realTimeProducts = express.Router();
const uploader = require("../utils/utils.js");
const ProductService = require("../services/product.api.service.js");
const productsModel = require("../models/mongoose/products.model.js");
const productos = new ProductService();

realTimeProducts.get("/", async (req,res)=> {

    try {
        const {page}=req.query;
        const queryResult = await productsModel.paginate({},{limit:5,page:page || 1});
        const {docs,...rest} =queryResult
   /*      console.log(queryResult); */
        let products =docs.map((doc)=>{
            return {
                title: doc.title,
                description:doc.description,
                price:doc.price,
                thumbnail:doc.thumbnail,
                marca:doc.marca,
                code:doc.code,
                stock:doc.stock,
                }
        })
    
       /*  console.log(rest) */
       
      return  res.status(200).render("realTimeProducts",{products, pagination: rest});
  
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ status: "error", msg: "Invalid input", data: {} })
        } else {
            res.status(500).json({ status: "error", msg: "Error in server", data: {}})
        }
    }

})

module.exports = realTimeProducts;