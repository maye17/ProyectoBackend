/* const ProductModel = require('../models/products.model'); */
const CartModel = require('../models/mongoose/cart.model');

const mongoose = require('mongoose');
const userModel = require('../models/mongoose/user.model');
const productsModel = require('../models/mongoose/products.model');
const cartModel = require('../models/mongoose/cart.model');

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
            const cart = await CartModel.findById({_id:cartId})
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



//------------------AGREGAR PRODUCTOS AL CARRITO----------
   /*  async addProductToCart (cartId, productId,quantity) {

        try {
          
            const cart = await CartModel.findOne({_id:cartId});
            console.log('id del carrito',cart)
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
    
        
            // if (!cart) {
            //    // Si no se encuentra el carrito, puedes crearlo aquí si es necesario.
            //    const newCart = new CartModel({ productId });
            //    await newCart.save();
            //    return newCart; // Devolver el carrito recién creado si es necesario.
            //  } 
          
            const existProductInart = cart.products.find(product => product.productId === productId);
            if (existProductInart) {
                console.log('Product already exists in cart');
                existingProduct.quantity += 1;

                return res.json({
                    status:'success',
                    message:'producto agregado con cantidad',
                    payload:cart
                })
            } else {

            cart.products.push({productId, quantity: quantity});
            }
    
    
           const updatedCart = await cart.save();
    
            return updatedCart;
        } catch (error) {
                throw error;
            }
    }
 */

    //AGREGANDO PRODUCTO AL CARRITO

    async addProductToCart(cartId, productId, quantity) {
        try {
            // Buscar el carrito por su ID
            const cartUser = await CartModel.findById(cartId);
                    
            console.log('ID del carrito desde el backend para usuario', cartUser);
    
            if (!cartUser) {
                throw new Error('Carrito no encontrado');
            }
    
            // Verificar si el producto ya existe en el carrito
            const existingProductIndex = cartUser.products.findIndex(product => product.productId._id.toString() === productId);
    
            if (existingProductIndex !== -1) {
                // Si el producto ya existe en el carrito, actualiza la cantidad en lugar de agregarlo de nuevo
                cartUser.products[existingProductIndex].quantity += quantity;
            } else {
                // Si el producto no existe en el carrito, agrégalo
                cartUser.products.push({
                    productId: productId,
                    quantity: quantity
                });
            }
    
            // Guarda los cambios en la base de datos
            await cartUser.save();
    
            // Devuelve el carrito actualizado
            return cartUser;
        } catch (error) {
            throw error;
        }
    }
    

//MODIFICAR LA CANTIDAD DEL PRODUCTO EN EL CARRITO

async updateQuantityInCart (cartId, productId, quantity){
    try {
        const cart = await CartModel.findOne({ _id: cartId });

        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        const productInCart = cart.products.find(product => {
            const productIdInCart = product.productId._id.toString();
            const productIdParam = productId.toString();

            return productIdInCart === productIdParam;
        });

        if (!productInCart) {
            throw new Error('Producto no encontrado en el carrito');
        }

        productInCart.quantity = quantity;
        await cart.save();

        return cart;
    } catch (error) {
        throw error;
    }
}



    //REMOVER PRODUCTOS DEL CARRITO

    async removeProductFromCart(cartId, productId, quantityToRemove) {
        try {
            const cartItem = await CartModel.findById(cartId);
            console.log('ID del carrito actual',cartItem._id);
    
            if (!cartItem) {
                throw new Error('Cart not found');
            }
    
            const productIndex = cartItem.products.findIndex(product => product.productId._id.toString() === productId);
            console.log('id del product Index',productIndex)
    
            if (productIndex === -1) {
                console.log('El producto no se encuentra en el carrito');
                return null; // Otra opción es devolver un mensaje o código de estado adecuado
            }
    
            const availableQuantity = cartItem.products[productIndex].quantity;
    
            if (availableQuantity < quantityToRemove) {
                throw new Error('Quantity to remove exceeds the available quantity');
            }
    
            cartItem.products[productIndex].quantity -= quantityToRemove;
    
            if (cartItem.products[productIndex].quantity === 0) {
                cartItem.products.splice(productIndex, 1);
                console.log('Elimina el producto completo', cartItem._id);
            }
    
            const savedCart = await cartItem.save();
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