const express = require('express');
const userProductRouter = express.Router();

const PrincipalController = require('../controllers/product.controller.js');

const principalControllers = new PrincipalController();
const UserService = require("../services/user.service.js");
const serviceUser = new UserService();
const isUser = require('../middlewares/authUser.js');

 // Importa el controlador de productos

// Define una ruta para mostrar los productos
userProductRouter.get('/user/', isUser, principalControllers.mostrarProductos);

userProductRouter.get('/user/:uid', isUser, principalControllers.mostrarProductos);

module.exports = userProductRouter;
