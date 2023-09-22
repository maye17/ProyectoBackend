const express = require('express');
const userProductRouter = express.Router();

const PrincipalController = require('../controllers/product.controller.js');

const principalControllers = new PrincipalController();
const UserService = require("../services/user.service.js");
const serviceUser = new UserService();
const UserSessionDTO = require("../DAO/DTO/dto.session.js");
const isUser = require('../middlewares/authUser.js');

 // Importa el controlador de productos

// Define una ruta para mostrar los productos
userProductRouter.get('/user/', isUser, principalControllers.mostrarProductos);

userProductRouter.get('/user/:uid', isUser, principalControllers.mostrarProductos);

/* userProductRouter.get('/user/:uid', isUser, async(req,res)=>{
    const userId = req.params._id;
    res.render('user')

})
 */
//userProductRouter.get('/current',principalControllers.getCurrentUser)

/* 
userProductRouter.post('/current', async(req,res)=>{
    console.log('Datos recibidos en el cuerpo de la solicitud:', req.body);
    const dato = req.body;
    const DTOUser = new UserSessionDTO(dato)
    const result = await serviceUser.addUser(DTOUser)
    console.log('enviando datos',result)
    res.send({status:'success',payload:result})
}) */

module.exports = userProductRouter;
