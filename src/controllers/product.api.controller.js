const FactoryMongo = require('../services/product.api.service');
const factoryMongo = new FactoryMongo();
const FactoryNew = require('../DAO/factory.js');
const Loggers = require('../utils/logger')
//const factory = new FactoryNew();

class ProductsController {

    constructor(){}

    async createOne (req,res) {
        try {
            
            const productData = req.body;
            const savedProduct = await FactoryNew.addProduct(productData);
             
            return res.status(201).json({
                status: 'success',
                msg: 'Product created',
                payload: savedProduct,
            });
        } catch (error) {
            Loggers.warn('Couldnt add product');
            return res.status(400).json({
                status: 'error',
                msg: error.message,
                payload:{}
            });
        }
    };
    

    async getAll (req,res) {
        try {
            const products = await FactoryNew.getAllProducts();
    
            return res.status(200).json({
                status: "OK",
                msg: "product list",
                payload: products,
            });
        } catch (err) {
            if (err instanceof Error) {
                req.logger.error(`Error in getAll: ${err.message}`);
                res.status(400).json({ status: "error", msg: "No se encontraron datos", data: {} });
            } else {
                req.logger.error(`Error in getAll: ${err}`);
                res.status(500).json({ status: "error", msg: "Error in server", payload: {} });
            }
        }
    }
    

    async getById (req, res) {
        try {
            const id = req.params.pid;
            // const dataId = await productos.getProductById(parseInt(id)); 
    
            const productId = await FactoryNew.getProductById(id); // Cambiado a this.persistence

            console.log('producto',productId);
            res.status(200).json(productId);
        } catch (err) {
            if (err instanceof Error) {
                req.logger.error(`Error in getById: ${err.message}`);
                res.status(400).json({ status: "error", msg: "No se encontro el producto", data: {} });
            } else {
                req.logger.error(`Error in getById: ${err}`);
                res.status(500).json({ status: "error", msg: "Error in server", payload: {} });
            }
        }
    }
   

    
    async updateOne(req, res) {
        try {
            const id = req.params.pid;
            const changeProduct = req.body;
    
                  // Validación de datos de entrada
        if (!id || !changeProduct) {
            return res.status(400).json({
                status: "error",
                msg: "Bad request: Missing product ID or update data"
            });
        }


            const productos = await FactoryNew.getProductById(id);

            // Llama al servicio de actualización de productos
            const result = await FactoryNew.updateProduct(id, changeProduct);
    
    
           if (result) {
                // La actualización fue exitosa
                return res.status(200).json({
                    status: "Ok",
                    msg: "Product updated",
                    data: result
                 });
            } else {
                // La actualización no fue exitosa
                req.logger.error(`Error in update: ${err.message}`);
                return res.status(404).json({
                    status: "error",
                    msg: "Product not found or not updated"
                });
            } 
        } catch (error) {
            // Maneja los errores generales
            res.status(500).json({ status: "error", msg: "Internal server error", error: error.message });
        }
    }

    
    async deleteOne  (req, res) {
        try {
            const productId = req.params.id;
            const deletedProduct = await FactoryNew.deleteProduct(productId); // Cambiado a this.persistence
            if (!deletedProduct) {
                return res.status(404).json({
                    status: 'error',
                    msg: 'Product not found',
                });
            }
            return res.status(200).json({
                status: 'success',
                msg: 'Product deleted',
                payload: deletedProduct,
            });
        } catch (error) {
            req.logger.error(`Error in update: ${err.message}`);
            return res.status(400).json({
            status: 'error',
            msg: error.message,
            });
        }
    }

    
    async error (req, res) {
        req.logger.error(`Error in update: ${err.message}`);
        res.status(404).json({ status: "error", msg: "Route not found", data: {} });
    }
}



module.exports = ProductsController ;
