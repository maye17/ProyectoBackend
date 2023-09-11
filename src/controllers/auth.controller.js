const CartControllers = require("../controllers/cart.controller.js");
const cartControllers = new CartControllers();

const PrincipalController = require('../controllers/product.controller.js')
const principalControllers = new PrincipalController()
// Importa el controlador del carrito

// Función para renderizar la página de inicio de sesión
async function renderLoginPage(req, res) {
    try { //iva login en el reder
        return res.render("login", {});
    } catch (error) {
        res.status(500).json({ 
            status: "error",
            msg: "Error en servidor", 
            data: {}
        });
    }
}

// Función para manejar el inicio de sesión exitoso
async function handleSuccessfulLogin(req, res) {
    try {
        // Crear el carrito para el usuario que inició sesión
        await cartControllers.createCart(req.user._id);
        console.log(req.user._id);

        //obteniendo productos para la pagina principal
        
        //controla que el usuario no sea administrador
        if(!req.user.isAdmin){
            console.log('req.user para usuario comun',req.user)

     
           return res.redirect('/access/user')
     
      
        } else {
         // si es admin Redirigir al usuario a la página principal 
        console.log('req.user a user',req.user)

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

module.exports = {
    renderLoginPage,
    handleSuccessfulLogin
};