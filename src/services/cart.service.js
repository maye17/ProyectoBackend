/* const ProductModel = require('../models/products.model'); */
const CartModel = require('../models/mongoose/cart.model');

const mongoose = require('mongoose');
const userModel = require('../models/mongoose/user.model');
class CartService {
    
    async getAllCart (){
        try {
            
            const cartExist = await CartModel.find({})
            return cartExist;

        } catch (error) {
            throw error
        }
    }


    async createCart(userId) {
        try {

            const existingCart = await CartModel.findOne({ usuarioId: userId });
            if(existingCart) {
                console.log('Cart already exists',existingCart);
                return existingCart;
            }else {
                const cart = await CartModel.create({
                   
                    usuarioId: userId,
                    products:[]
                });
               
                console.log('Cart created',cart);
                return cart;
            }    
            
        } catch (err) {
            throw err;
        }
        }

    async getCartById(cartId) {
        try {
            const cart = await CartModel.findById(cartId)
            console.log(cart);
            return cart;
        } catch (error) {
            throw error;
        }
    }


    async getCartByUserId(userId) {
        try {
            const idUser = await userModel.findById(userId)
            console.log(idUser);
            return idUser;
        } catch (error) {
            throw error;
        }
    }




    async addProductToCart (cartId, productId) {


 
        try {
            const cart = await CartModel.findOne({ _id: cartId });
            console.log(productId)
            const objectId = new  mongoose.Types.ObjectId(productId);
            const filter = { _id: objectId };
            if (!cart) {
                console.log('Cart not found');
                return;
            }

            const existProductInart = cart.products.find(product => product.filter === productId);
            if (existProductInart) {
                console.log('Product already exists in cart');
                existingProduct.quantity += 1;
            } else {

            cart.products.push({productId, quantity: 1});
            }
    
    
           const updatedCart = await cart.save();
    
            return updatedCart;
        } catch (error) {
                throw error;
            }
    }




/*     async addProductToCart(_id) {
        try {
            let res = await CartModel.findByOne({_id:_id});
            if (!cart) {
            throw new Error('Cart not found');
            } 
                    const product = await ProductModel.findById(productId).populate('products.productId') 
            if (!product) {
            throw new Error('Product not found');
            }
        
            const existingProduct = cart.products.find(product => product.idProduct.toString() === productId).populate('products.productId');
            if (existingProduct !==-1) {
                cart.products[existingProduct].quantity +=quantity ;
            } else {
            cart.products.push({ idProduct: productId, quantity: 1 });
            }
        
            const savedCart = await cart.save(); 
            return savedCart;
        } catch (error) {
            throw error;
        }
    }
*/
    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) {
            throw new Error('Cart not found');
            }
        
            const productIndex = cart.products.findIndex(product => product.idProduct.toString() === productId);
            if (productIndex === -1) {
            throw new Error('Product not found in the cart');
            }
        
            if (cart.products[productIndex].quantity > 1) {
            cart.products[productIndex].quantity -= 1;
            } else {
            cart.products.splice(productIndex, 1);
            }
        
            const savedCart = await cart.save();
            return savedCart;
        } catch (error) {
            throw error;
        }
    }

    async deleteCartById(cartId) {
        try {
            const cart = await CartModel.findByIdAndDelete(cartId);
            if (!cart) {
            throw new Error('Cart not found');
            }
            return cart;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CartService;