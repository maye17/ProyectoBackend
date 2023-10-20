const CartControllers = require("../controllers/cart.controller.js");
const cartControllers = new CartControllers();

const PrincipalController = require('../controllers/product.controller.js')
const principalControllers = new PrincipalController()
const UserSessionDTO = require('../dao/dto/dto.session')
const userSessionDTO = new UserSessionDTO();
const UserService = require('../services/user.service.js');
const serviceUser = new UserService();
// Importa el controlador del carrito

// Función para renderizar la página de inicio de sesión
async function renderLoginPage(req, res) {
    try { //login en el reder

        return res.render("login", {});
    } catch (error) {
        res.status(500).json({ 
            status: "error",
            msg: "Error en servidor", 
            payload: {}
        });
    }
}



/* async function handleSuccessfulLogin(req, res) {
    try {
        // Crear el carrito para el usuario que inició sesión
        const userId = req.user._id;
        console.log('Entrando a handleSuccessfulLogin', userId);
       // const cartId = await createCartLogin(userId);
       let cartId;

        if (userId) {
            try {
                cartId = await cartControllers.createCartLogin(userId);
                console.log('usuario al que se le crea el carrito', userId, cartId);

            } catch (error) {
                console.error('Error al crear el carrito:', error);
                return res.status(500).json({
                    status: "error",
                    msg: "Error al crear el carrito",
                    data: {}
                });
            }
        } else {
            cartId = await cartControllers.getCartByUserId(userId);

          //  cartId = await cartControllers.getCartById(cartId)
            console.log('obteniendo id del carrito para el usuario logueado', userId);
        }

        // Controla que el usuario no sea administrador
        if (!req.user.isAdmin) {
            console.log('carrito de usuario comun', req.user);
            const userId = req.user._id;
            const {_id}= cartId
            console.log(`obteniendo id del usuario logueado para validar carrito creado en el front, ${userId}`);
            console.log(`obteniendo id delcarrito para el usuario logueado, ${_id}`);
            
            // Redirige al usuario a la página con el cartId
            return res.redirect(`/access/user/?cartId=${_id}`);
        } else {
            // Si es administrador, redirige al usuario a la página principal de administrador
            console.log('req.user a user', req.user);
            return res.redirect('/auth/administracion');
        }
    } catch (error) {
        res.status(500).json({ 
            status: "error",
            msg: "Error en servidor", 
            data: {}
        });
    }
} */
async function handleSuccessfulLogin(req, res) {
    try {
        // Crear el carrito para el usuario que inició sesión
        const userId = req.user._id;
        console.log('Entrando a handleSuccessfulLogin', userId);
        let cartId;

        if (userId) {
            try {
                cartId = await cartControllers.createCartLogin(userId);
                console.log('usuario al que se le crea el carrito', userId, cartId);

            } catch (error) {
                console.error('Error al crear el carrito:', error);
                return res.status(500).json({
                    status: "error",
                    msg: "Error al crear el carrito",
                    data: {}
                });
            }
        } else {
            cartId = await cartControllers.getCartByUserId(userId);

          //  cartId = await cartControllers.getCartById(cartId)
            console.log('obteniendo id del carrito para el usuario logueado', userId);
        }

        // Controla que el usuario no sea administrador
        if (!req.user.isAdmin) {
            console.log('carrito de usuario comun', req.user);
            const userId = req.user._id;
            const {_id}= cartId
            console.log(`obteniendo id del usuario logueado para validar carrito creado en el front, ${userId}`);
            console.log(`obteniendo id delcarrito para el usuario logueado, ${_id}`);
            
            // Redirige al usuario a la página con el cartId
            return res.redirect(`/access/user/?cartId=${_id}`);
        } else {
            // Si es administrador, redirige al usuario a la página principal de administrador
            console.log('req.user a user', req.user);
            return res.redirect('/auth/administracion');
        }
    } catch (error) {
        res.status(500).json({ 
            status: "error",
            msg: "Error en servidor", 
            data: {}
        });
    }
}


async function getCurrentUser (req,res){
    try {

        const user = req.user;
        if (user) {
          
            console.log('puedo entrar?',user);
            const userDTO = new UserSessionDTO(user);
            res.status(200).json({
                 status: 'success',
                  payload: userDTO
             });
          } else {
            res.status(401).json({ status: 'error', message: 'Usuario no autenticado' });
          }
    } catch (error) {
        throw error
    }
}


module.exports = {
    renderLoginPage,
    handleSuccessfulLogin,
    getCurrentUser,
};