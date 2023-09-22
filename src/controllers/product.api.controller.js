/* const ProductService = require('../services/product.api.service');
const productsService = new ProductService(); */
const Factory = require('../DAO/factory');
const factory = new Factory()

class ProductsController {

    constructor(){}

    async createOne (req,res) {
        try {
            
            const productData = req.body;
            const savedProduct = await factory.addProduct(productData);
             
            return res.status(201).json({
                status: 'success',
                msg: 'Product created',
                payload: savedProduct,
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                status: 'error',
                msg: error.message,
                payload:{}
            });
        }
    };
    

    async getAll (req,res) {
        try {
            const products = await factory.getAll();
    
            return res.status(200).json({
                status: "OK",
                msg: "product list",
                payload: products,
            });
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ status: "error", msg: "No se encontraron datos", data: {} });
            } else {
                res.status(500).json({ status: "error", msg: "Error in server", payload: {} });
            }
        }
    }
    

    async getById (req, res) {
        try {
            const id = req.params.pid;
            // const dataId = await productos.getProductById(parseInt(id)); 
    
            const dataId = await factory.getProductById(parseInt(id)); // Cambiado a this.persistence

            console.log(dataId);
            res.status(200).json(dataId);
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ status: "error", msg: "No se encontro el producto", data: {} });
            } else {
                res.status(500).json({ status: "error", msg: "Error in server", payload: {} });
            }
        }
    }
   

    
    
    async updateOne   (req, res) {
        try {
            const _id = req.params.pid
    
           const productos = await factory.getAllProducts();
            let changeProduct = req.body;
            productos.updateProduct(_id, changeProduct);
            return res.status(201).json({
                status: "Ok",
                msg: "product updated",
                data: changeProduct
            })
        } catch {
            res.status(500).json({ status: "error", msg: "Invalid input", data: {} })
        }
    }
    
    async deleteOne  (req, res) {
        try {
            const productId = req.params.id;
            const deletedProduct = await factory.deleteProduct(productId); // Cambiado a this.persistence
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
            console.error(error);
            return res.status(400).json({
            status: 'error',
            msg: error.message,
            });
        }
    }

    
    async error (req, res) {
        res.status(404).json({ status: "error", msg: "Route not found", data: {} });
    }
}



module.exports = ProductsController ;
