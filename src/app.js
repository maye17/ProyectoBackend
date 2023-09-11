
const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
//const port =8080;
const productsRouter = require("./routes/products.api.router");
const cartsRouter = require("./routes/cartsapi.router.js");
const { Server } = require("socket.io");
const realTimeProducts = require("./routes/realtimeproducts.js");
const authRouter = require("./routes/auth.router.js")
const sessionsRouter = require("./routes/sessions.router.js");
const loginRouter = require("./routes/login.router.js");
/* const ProductManager = require("./dao/ProductManager.js");
const productos = new ProductManager ("productos.json"); */
const form = require('./routes/form.router.js');
const connectMongo = require("./utils/mongo");
const principalRouter = require("./routes/product.router.js");
const chatRouter = require("./routes/chat.router.js");
const iniPassport = require("../src/config/passport.config.js");
const passport = require("passport");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const  socketServer = require("./utils/socketConnect.js");
const ProductService = require("./services/product.service.js");
const productos = new ProductService();
const adminRouter = require("./routes/adminRouter.js");
const authAdminRouter = require("./routes/authadmin.router.js");
const AllUserRouter = require("./routes/alluser.router.js");
const userProductRouter = require("./routes/userProduct.router.js");
const cartRouter = require("./routes/cart.router.js")
const config = require('../src/config/config.js')

console.log(config)

const port = config.port;


//DEFINIENDO EL SERVER
const httpServer= app.listen(port,()=>{
    console.log(`server listening  http://localhost:${port}`);
})



socketServer(httpServer);


connectMongo();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

app.engine('handlebars',handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "views");

// session


app.use(
    session({
    store:MongoStore.create({mongoUrl:config.mongoUrl, ttl:config.ttl}),
    secret:config.secret,
    resave:config.resave,
    saveUninitialized:config.saveUninitialized
})
)
/* app.use(
    session({

        
      store: MongoStore.create({ mongoUrl: 'mongodb+srv://maye_17:Z43IROGnWaS5mLn0@ecommerce.dhbbfye.mongodb.net/ecommerce?//retryWrites=true&w=majority', ttl: 7200 }),
      secret: 'un-re-secreto',
      resave: true,
      saveUninitialized: true,
    })
  ); */
//TODO LO DE PASSPORT
iniPassport();
app.use(passport.initialize());
app.use(passport.session());

// rutas api JSON
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter); //solo para api del carrito
app.use('/access/hAdmin', authAdminRouter)


// Rutas: HTML Render

app.use("/formulario", form);
app.use('/chat', chatRouter) // solo para chat
app.use('/auth', authRouter ) // solo para login
app.use('/admin', adminRouter);
app.use('/users', AllUserRouter);
app.use('/carts', cartRouter)
app.use('/access',userProductRouter)

app.use('/api/sessions', sessionsRouter);
//No usar solo prueba
/* app.use('/', loginRouter); */


//Rutas: Sockets

app.use("/realTimeProducts", realTimeProducts)
app.use("/", principalRouter)


//Ruta para usuario acomodando en capas



app.get("*"), (req, res) => {
    return res.status(404).json({
        status: "error",
         msg: "Not Found", 
         data: {} 
        })
}

 
// solicitando id del pedido
app.get(`/products/:pid`, async (req,res)=>{
    try {
        const idPedido = parseInt(req.params.pid) ;
    const idSolicitado = await productos.getProductById(idPedido);
 //const idSolicitado = data.products.find((item)=> (item.id === idPedido))
    if(!idPedido){
        return res.json(productos.getAllProducts())
    }
     if(idSolicitado){
        return res.json(idSolicitado);
     }else {
         return res.json({error:'El producto con el id: ' +  idPedido + ' no existe'})
        }} catch (error) {
            throw new Error(error.message)
    }
})
