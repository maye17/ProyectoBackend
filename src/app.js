
const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const productsRouter = require("./routes/products.api.router");
const cartsRouter = require("./routes/cartsapi.router.js");
const realTimeProducts = require("./routes/realtimeproducts.js");
const authRouter = require("./routes/auth.router.js")
const sessionsRouter = require("./routes/sessions.router.js");
const form = require('./routes/form.router.js');
const connectMongo = require("./utils/mongo");
const principalRouter = require("./routes/product.router.js");
const chatRouter = require("./routes/chat.router.js");
const iniPassport = require('../src/config/passport.config.js');
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
const config = require('../src/config/config.js');
const mailRouter = require("./routes/mail.api.router");
const sendMail = require("./routes/mail.router");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const loggerRouter = require("./routes/logger.router");

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
    saveUninitialized:config.saveUninitialized,
    //cookie: { sameSite: 'strict' },
})
)

// PASSPORT
iniPassport();
app.use(passport.initialize());
app.use(passport.session());

//SWAGGER

app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas api JSON
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter); //solo para api del carrito


//app.use('/access/Admin', authAdminRouter)
app.use('/access',authAdminRouter)
    

//app.use('/access , authAdminRouter)
// Rutas: HTML Render

app.use("/formulario", form);
app.use('/chat', chatRouter) // solo para chat
app.use('/auth', authRouter ) // solo para login
app.use('/admin', adminRouter);
app.use('/users', AllUserRouter);
app.use('/carts', cartRouter)
app.use('/access',userProductRouter)
app.use('/api/forgetPassword',sendMail)

app.use('/api/sessions', sessionsRouter);
app.use('/send', mailRouter)

//---Rutas: Sockets----

app.use("/realTimeProducts", realTimeProducts)
app.use("/", principalRouter)

//-----------RUTA PARA LOGGER--------------

app.use('/loggerTest', loggerRouter)

//---------Ruta para Mocking----------

//app.use('/mockingproducts')



