//@ts-check
const {Server} = require("socket.io");
/* const ProductService = require("../services/product.api.service.js"); */
const messagesModel = require("../models/mongoose/messages.model.js");
/* const productos = new ProductService();
 */

const PrincipalService = require('../services/product.service.js');
const principalService = new PrincipalService()
const CartService = require('../services/cart.service.js');
const cartService = new CartService()

const socketConnect = (httpServer) => {

const socketServer= new Server(httpServer);
socketServer.on("connection", (socket)=>{
    console.log("se abrio un canal de socket" + socket.id);


      //------------ CHAT---------------
    socket.on("msg_front_to_back", async (msg) => {
        try {
          await messagesModel.create(msg);
        } catch (e) {
          console.log(e);
        }
        try {
          const msgs = await messagesModel.find({});
          socketServer.emit("listado_de_msgs", msgs);
        } catch (e) {
          console.log(e);
        }
      });



//--------Usuario desconectado-------------

 socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });

//-----------Producto nuevo ----------------

// Obtener productos desde el servidor a través de Socket.io
    socket.on("productos", async (productos) => {

   const ProductosRecibidos= await principalService.getAllProd();
  // Maneja los productos recibidos desde el servidor
  // Puedes almacenarlos en una variable o en un estado, dependiendo de tu configuración
  console.log(ProductosRecibidos);
    });

    socket.on("new-Product",async(newProducts)=>{
        try {
            await principalService.createProduct({...newProducts})
        
        const newProductList = await principalService.getAllProd();
        console.log('producto enviado',newProductList);
        socketServer.emit('products',{newProductList})
        } catch (error) {
            console.log(error);
        }
        
    });
    

    //------------Actualizar producto
    socket.on("update-Product",async(currentProductId, editedProduct)=>{
        try {
          console.log(currentProductId);
          console.log(editedProduct);
            await principalService.updateProduct(currentProductId, editedProduct)
            if (!editedProduct) {
                // Manejar si el producto no se encuentra
                return;
              }
        
              // Envía la actualización al frontend a través del socket
        const updateProductList = await principalService.getAllProd(editedProduct.currentProductId);
        console.log('producto modificado',updateProductList);
        socketServer.emit('products',{updateProductList})
        } catch (error) {
            console.log(error);
        }
        
    });
    
    socket.on("delete-Product",async(deletedProductId)=>{
        try {
           const deleteProductList = await principalService.deleteProduct(deletedProductId);
           const updatedProductList = await principalService.getAllProd();

           if (!deleteProductList) {
            // Manejar si el producto no se encuentra
            return console.log('producto no encontrado');

           }

          // console.log('producto eliminado',productId);
           socketServer.emit('product Deleted',{msg:"mandar desde el back al front"}, updatedProductList)

        } catch (error) {
            console.log(error);
        }
        
    });
    
/*     socket.on('crear-carrito', async (carritoId)=>{
        try {
           const carrito = await cartService.createCart(carritoId);
            socket.emit('carrito', carrito);
            console.log('Evento creando-carrito', carrito);

            } catch (error) {
                console.log(error);
                }
                
    }); */
 
    socket.on('agregar-al-carrito', async ({ cartId, IdProducto }) => {
      try {
          const carritoActualizado = await cartService.addProductToCart(cartId, IdProducto);
          socket.emit('producto-agregado-al-carrito', carritoActualizado);
          console.log('Producto agregado al carrito:', carritoActualizado);
      } catch (error) {
          console.log(error);
      }
  });


                
})

}
module. exports = socketConnect;