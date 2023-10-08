const CartService = require('../services/cart.service.js')
const cartService = new CartService()
const mongoose = require('mongoose');
const CartModel = require('../models/mongoose/cart.model.js')
class CartControllers {

    async  getAllCart(req,res){

            try {
                const pedido = await cartService.getAllCart();
                return res.status(200).json({
                    status:"success",
                    msg:"Exitoso",
                    payload:pedido
                })

     
            } catch (error) {
                throw error;
            }

    }

/* 
async getCartByUserId(req,res){
    try {
        const userId = req.params.uid;
        const cart = await cartService.getCartByUserId(userId);
        res.status(200).json({
            status: 'success',
            data: cart
        });
    } catch (error) {
    throw error;
}
} */

async getCartByUserId(userId){
    try {
        
        const cart = await cartService.getCartByUserId(userId);
        
        res.status(200).json({
            status: 'success',
            payload: cart
        });
    } catch (error) {
    throw error;
}
}

async createCartLogin(userId) {
    try {
    
     const cartid = await cartService.createCart(userId);
        return cartid;
       
    } catch (error) {
        throw error;
    }
}



    async createCart(req,res) {
        try {
            const usuarioId = req.body.uid;
         const cartid = await cartService.createCart(usuarioId);
            res.status(200).json({
                status: 'success',
                payload: cartid
            })

           
        } catch (error) {
            throw error;
        }
    }

//para memoria
/*         async addProductTOCart (req,res ){

        const productId = req.params.pid;
        console.log('id del producto',productId)

        try {
            req.session =req.session || {};
            console.log('usuario en sesión',req.session)
  
          const usuarioId = req.user; 
          //obteniendo el usuarioId de la session de passport
          if (!usuarioId) {
            throw new Error('El usuario no tiene un usuarioId en la sesión.');
          }
      
          // Ahora puedes usar usuarioId en tu consulta a la base de datos
          req.session.carrito = await CartModel.findOne({ usuarioId }) || [];
          req.session.carrito.push(productId);
      
          res.json({ message: 'Producto agregado al carrito' });
    

        } catch (error) {
            console.error('Error adding products to cart:', error);
            res.status(500).json({ message: 'Error adding products to cart' });
        }
    
    }
    
 */

    //PARA MONGO

    async addProductTOCart (req,res ){
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = 1//req.body.quantity
        console.log('id del producto',productId,'id del carrito', cartId)

        //pasar a middleware
          try{
    
       const productAdd = await cartService.addProductToCart(cartId,productId,quantity)
      
          return res.json({
            status:'success',
            message: 'Producto agregado al carrito',
            cartId: cartId,
        payload:productAdd });
    

        } catch (error) {
            console.error('Error adding products to cart:', error);
            res.status(500).json({ message: 'Error adding products to cart' });
        }
    
    }
    

    async getCartById (req, res) {
        try {
            
            const cartId = req.params.cid;
            const cart = await cartService.getCartById(cartId);
            res.status(200).json({
                status: 'success',
                payload: cart
            });
        }
            

        catch (error) {
            throw error;
        }
    }


async  updateQuantityProduct(req, res) {

    
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;

    try {
        const updatedCart = await cartService.updateQuantityInCart(cartId, productId, quantity);

        return res.status(200).json({
            status: 'success',
            message: 'Cantidad del producto actualizada en el carrito',
            payload: updatedCart,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error interno del servidor',
            payload: null,
        });
    }
}


//---ELIMINAR PRODUCTOS ---
async deleteForProduct(req,res){
    const productId = req.params.pid;
    const cartId = req.params.cid;
    const quantityToRemove  = req.body.quantity;

    console.log('en el controller id del carrito', cartId)
    console.log('cantidad desde el backend',quantityToRemove)
     // Verificar que la cantidad a eliminar sea un número positivo
     if (isNaN(quantityToRemove) || quantityToRemove <= 0) {
        return res.status(400).json({
          status: 'error',
          message: 'La cantidad a eliminar debe ser un número positivo.'
        });
      }
  

    try {
        const deleteOneProduct = await cartService.removeProductFromCart(cartId,productId,quantityToRemove)


        if (!deleteOneProduct) {
            return res.status(404).json({
              status: 'error',
              message: 'El producto no se encontró en el carrito o la cantidad a eliminar es mayor que la cantidad en el carrito.'
            });
          }


        return res. status(200).json({
            status:'success',
            message:"delete for product",
            payload:deleteOneProduct
        })
    } catch (error) {
        throw error
    }
}

} 

 module.exports = CartControllers;