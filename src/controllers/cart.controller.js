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
        console.log('id del producto',productId,'id del carrito', cartId)

        //pasar a middleware
          try{
    
       const productAdd = await cartService.addProductToCart(cartId,productId)
      
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
    



   /*  async createCart(req, res) {
        try {

            if (!req.user) {
                 
                res.status(400).json({ status: "error", msg: "Error login", data: {} })
           
            }

            const userId = req.user._id; 
           await cartService.createCart(userId);

            
        } catch (error) {
            // Manejo de errores aquí
            console.error(error);
            return res.json({
                status: "error",
                msg: "Error en el servidor",
                error: error.message
            });
        }
    } */
/*     updateCart(){

    }
    deleteCart(){

    } */
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
//mostrando los productos del carrito ---continuar
    async getProductToCart(req,res){

    }

    async FindProductCart(req,res)
{
    try {
        // Obtener el ID del usuario autenticado desde la sesión o el token de acceso.
        const userId = req.user.id; // Esto depende de cómo estés gestionando la autenticación.

        // Aquí asumimos que tienes una función o una base de datos para obtener los productos en el carrito del usuario.
        // Reemplaza esto con la lógica específica de tu aplicación.
        const carrito = await cartService.obtenerProductosDelCarrito(userId);

        res.json(carrito);
    } catch (error) {
        console.error('Error al obtener los productos del carrito:', error);
        res.status(500).json({ error: 'Error al obtener los productos del carrito' });
    }
}
}

   

 module.exports = CartControllers;