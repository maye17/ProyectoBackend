const express = require("express");
const productsModel = require("../models/mongoose/products.model");
const uploader = require("../utils/utils.js");
const handlebars = require("express-handlebars");

const mongoose = require('mongoose');
class PrincipalService{

    async getAllProd(page){
        try {
         
            const queryResult = await productsModel.paginate({},{limit:4,page:page || 1});
            const {docs,...rest} =queryResult
            
            //console.log(queryResult);
            let products =docs.map((doc)=>{
                return {
                    _id: doc._id,
                    title: doc.title,
                    description:doc.description,
                    price:doc.price,
                    thumbnail:doc.thumbnail,
                    marca:doc.marca,
                    code:doc.code,
                    stock:doc.stock,
                    }
            })
                
            return {products, pagination: rest}
            
        } catch (error) {
            throw error
        }

    }

  async createProduct(products){
    const savedProductOne = await productsModel.create(products);
    return savedProductOne;

  }

  async updateProduct(id, updateData){

    try {
        const { _id, title, description, price, thumbnail, code, stock } = updateData;
        const objectId = new mongoose.Types.ObjectId(id);
        const filter = { _id: objectId };

        const updatedProduct = await productsModel.updateOne(filter, updateData)
        return updatedProduct
        
    } catch (error) {
        throw error
    }

  }
  async deleteProduct (productId) {
    try {
      const deletedProduct = await productsModel.deleteOne({ _id: productId });
      return deletedProduct;
    } catch (error) {
      throw error;
    } 
  }

}



module.exports = PrincipalService;