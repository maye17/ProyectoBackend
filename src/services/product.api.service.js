const productsModel = require('../models/mongoose/products.model.js');

//Por persistencia
//class ProductService {
class FactoryMongo {
    constructor(){

    }
    async getAllProducts(page, limit, sort, status) {
        try {
            const options = {}
            if(page){
                options.page = page || 1
            }
            if(limit){
                options.limit = limit || 4
            }
            if(sort){
                options.sort = { price: sort === 'desc' ? -1 : 1 };
            }

            const filter = {};

            const dataProducts = await productsModel.paginate(filter, options);
         

            return dataProducts

        } catch (error) {
            throw error;
        }
    }

    async getProductById(productId) {
        try {
            const product = await productsModel.findById({_id:productId});
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

    async updateProduct(id, updateData) {
        try {

            const { _id, title, description, price, thumbnail, code, stock } = updateData;

            
             
            const product = await productsModel.updateOne(
                {_id:id},
                 { _id, title, description, price, thumbnail, code, stock }
            );
            return product;
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(productId) {
        try {
            const product = await productsModel.findByIdAndDelete({_id:productId});
            return product;
        } catch (error) {
            throw error;
        }
    }
};
module.exports = FactoryMongo;
//module.exports = ProductService;