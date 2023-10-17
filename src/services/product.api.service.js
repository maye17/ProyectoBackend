const productsModel = require('../models/mongoose/products.model.js');
const mongoose = require('mongoose');
const addLoggers = require('../utils/logger')
//Por persistencia
//class ProductService {
class FactoryMongo {
    constructor(){

    }
    async getAllProducts(page) {
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
      
            addLoggers.error(message)
        }

    }

    async getProductById(productId) {
        try {
            const product = await productsModel.findOne({_id:productId});
            return product;
        } catch (error) {
            throw error;
        }
    }

    async addProduct(productData) {
        try {
            const savedProduct = await productsModel.create(productData);
            return savedProduct;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(id, changeProduct) {
        try {
            const { title, description, price, thumbnail, code, stock } = changeProduct;
            
            // Verifica que el ID sea válido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return {
                    success: false,
                    message: "Invalid product ID",
                };
            }
    
            // Filtra el producto por su ID
            const result = await productsModel.findOneAndUpdate(
                { _id: id },
                {
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
                },
                { new: true }
            );
    
            if (result) {
                // La actualización se realizó con éxito
                return {
                    success: true,
                    message: "Product updated successfully",
                    payload: result,
                };
            } else {
                // El producto no se encontró
                return {
                    success: false,
                    message: "Product not found or not updated",
                };
            }
        } catch (error) {
            addLoggers.error;
            throw error;
        }
    }
    
    async deleteProduct(productId) {
        try {
            const product = await productsModel.findByIdAndDelete({_id:productId});
            return product;
        } catch (error) {
            addLoggers.error;
            throw error;
        }
    }
};
module.exports = FactoryMongo;
//module.exports = ProductService;