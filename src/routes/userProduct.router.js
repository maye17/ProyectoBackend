const express = require('express');
const userProductRouter = express.Router();

const PrincipalController = require('../controllers/product.controller.js');

const principalControllers = new PrincipalController();
 // Importa el controlador de productos

// Define una ruta para mostrar los productos
userProductRouter.get('/user', principalControllers.mostrarProductos);

module.exports = userProductRouter;
