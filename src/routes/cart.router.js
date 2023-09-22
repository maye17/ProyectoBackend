const express = require ("express");
/* const Modelproducts = require("../models/products.model.js")
const products = new Modelproducts(); */

const CartControllers = require('../controllers/cart.controller.js');
const isUser = require("../middlewares/authUser.js");
const isLogin = require("../middlewares/authLogin.js");
const cartControllers = new CartControllers ()

const cartRouter = express.Router();

cartRouter.post("/", cartControllers.createCart);
cartRouter.get("/:cid", cartControllers.getCartById);
//cartRouter.put('/:cid/product/:pid', addProductTOCart)
//cartRouter.post("/:cid/product/:pid", cartControllers.addProductTOCart);
//cartRouter.get('/agregar-carrito/:cid',cartControllers.getProductToCart)
cartRouter.post("/:cid/product/:pid", isLogin, cartControllers.addProductTOCart);

cartRouter.get('/products',isLogin,cartControllers.FindProductCart)
//cartRouter.get('/cid/purchase', cartControllers.Add)


/* cartRouter.post("/", cartControllers.createCart);
cartRouter.put("/", cartControllers.updateCart);
cartRouter.delete("/", cartControllers.deleteCart); */

/* cartRouter.post("/:cid/products/:pid", cartControllers.createCart);
cartRouter.post("/", cartControllers.createCart);
cartRouter.put("/", cartControllers.updateCart);
cartRouter.delete("/", cartControllers.deleteCart); */

/* 
cartRouter.get("/:cid",  (req, res) => {
    try {
        const dataCarts =  carts.getCarts()
        const id = req.params.cid
        const dataId =  carts.getCartById(parseInt(id));
        if (dataId) {
            res.status(200).json(dataId)
        } else {
            res.status(200).json(`No existe el carrito id: ${id}`)
        }
    } catch {
        res.status(500).json({ 
            status: "error", 
            msg: "Error en servidor", 
            data: {} })
    }
})

cartRouter.post("/:cid/products/:pid", (req,res)=>{
    try {
        const newCart=  carts.getCarts();
        const dataProducts = products.getProducts()
        const cartId = req.params.cid
        const productId = req.params.pid
        const cartFound = dataCarts.find((item) => item.id == cartId)
        if (!cartFound) {
            res.status(200).json(`No existe el carrito id: ${cartId}`)
        }
        const productFound = dataProducts.find((item) => item.id == parseInt(productId))
        if (!productFound) {
            res.status(200).json(`No existe el producto id: ${productId}`)
        }
        const product =  carts.updateCart(parseInt(cartId), parseInt(productId))
        res.status(200).json(product)
    } catch {
        res.status(500).json({ 
            status: "error",
            msg: "Error en servidor", 
            data: {} })
    }
})
     
cartRouter.get("*", (req, res) => {
    res.status(404).json({ 
        status: "error",
        msg: "Route not found",
        data: {} })
})

*/

module.exports =  cartRouter;