const Modelcarts = require('../models/cart.model');
const Modelproducts = require('../models/products.model');
const CartService = require('../services/cart.service');
const serviceCart = new CartService()


class CartsController {
    async addCart(req, res) {
        try {
            
            const carts = await serviceCart.createCart();
            return res.status(200).json({
                status: 'success',
                data: carts
            });


        } catch (error) {
            throw error;

        }
    }

    async getCarts (req, res) {
        try {
            const carts = await serviceCart.getCartById();
            res.status(200).json({
                status: 'success',
                data: carts
            });
        }
            

        catch (error) {
            throw error;
        }
    }

    async updateCarts (req, res) {
        try {
            const carts = await Modelcarts.update({
                id_user: req.body.id_user,
                id_product: req.body.id_product,
                quantity: req.body.quantity,
                total: req.body.total
            }, {
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({
                status: 'success',
                data: carts
            });
        }
        catch (error) {
            throw error;
        }
    }
}


module.exports = CartsController;
