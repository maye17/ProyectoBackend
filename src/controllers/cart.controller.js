const CartService = require('../services/cart.service.js')
const cartService = new CartService()

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
}

    async createCart(userId) {
        try {
            await cartService.createCart(userId);

           
        } catch (error) {
            throw error;
        }
    }

     /*    try {
            const cartId = req.params.cid;
            const productIds = req.body.productIds;
            const updatedCart = await cartService.addProductToCart(cartId, productIds);
            return res.status(200).json({
                status:"success",
                msg:"Exitoso",
                payload:updatedCart
            })
        } catch (error) {
            throw error;
        } */

        async addProductTOCart (req,res ){
        //const { cartId, productIds } = req.body;
        const cartId = req.params.cid;
        const productId = req.params.pid;
          //  const productId= req.params.pid;

        try {
            const updatedCart = await cartService.addProductToCart(cartId, productId);
            res.json(updatedCart);

            console.log(updatedCart)
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
                data: cart
            });
        }
            

        catch (error) {
            throw error;
        }
    }

}

   

 module.exports = CartControllers;