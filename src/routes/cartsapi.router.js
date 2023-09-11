const express = require ("express");

const CartControllers = require('../controllers/cart.controller.js');
const cartControllers = new CartControllers ()

const cartsRouter = express.Router();

cartsRouter.get("/", cartControllers.getAllCart);
cartsRouter.get("/:cid", cartControllers.getCartById);
cartsRouter.get("/:cid/:uid", cartControllers.getCartByUserId)
cartsRouter.post("/:cid/product/:pid", cartControllers.addProductTOCart);

module.exports = cartsRouter;
