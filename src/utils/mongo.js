const mongoose  = require('mongoose');
const orderModel = require('../models/mongoose/order.model');
const productsModel = require('../models/mongoose/products.model');
const CartModel = require('../models/mongoose/cart.model');
const { populate } = require('../models/mongoose/user.model');
const config = require('../config/config')

const connectMongo = async ()=>{
    try {
        
        await mongoose.connect (
           // "mongodb+srv://maye_17:Z43IROGnWaS5mLn0@ecommerce.dhbbfye.mongodb.net/ecommerce?retryWrites=true&w=majority"
            config.mongoUrl
        );
    /*     console.log(db.connection.host); */

        console.log("plug to mongo!");

           /*  let cart = await cartModel.find({})
            console.log(cart) */



   /*          const addProductToCart = async (cartId, IdProducto) => {
                try {
                    let carts = await CartModel.findOne ({_id:cartId});
                    if (!carts) {
                   console.log('Cart not found');
                    }

                    carts.products.push({productId: IdProducto})

                    let res = await CartModel.updateOne({_id:cartId},carts) 
                } catch (error) {
                        throw error;
                    }
            }
            addProductToCart() */


            //EN LA TOERIA DEBERIA SER ASÍ 


     /*        let carts = await CartModel.findOne({_id:'64e8c7c56d46d40580b8e3c2'});
        carts.products.push({productId:'64a34d077e0e1e9deb0ce261'})
        let res = await CartModel.updateOne({_id:'64e8c7c56d46d40580b8e3c2'},carts) */

       /*  let carts = await cartModel.findOne({_id:'64dfbb2c6637984282c2d87b'});
        carts.products.push({productId:'64a34d077e0e1e9deb0ce261'})
        let res = await cartModel.updateOne({_id:'64dfbb2c6637984282c2d87b'},carts)  */

      /*  let res = await cartModel.find({}).populate('products.productId') 
          console.log(JSON.stringify(res,null,4)) */
      /*   const created = cartModel.create({
            id:'3',
            products:[]
        }) */
   /*      let resultado = await orderModel.insertMany([
            {name:"Notebook Lenovo 14” Celeron 4GB 500GB IdeaPad 3 81WH0015AR", marca:"Lenovo", price:164, quantity:20,date:'2023-03-16T08:14:30Z'},
            {name:"Notebook Asus 15.6” Intel Core I3 4GB 256GB SSD 91X515EA-BR1751W", marca:"Asus", price:259, quantity:25,date:'2023-03-16T08:14:30Z'},
            {name:"Lenovo Notebook Lenovo 15.6” Core i3 4GB 256GB SSD IdeaPad 3 81WB01EVAR", marca:"Lenovo", price:280, quantity:10,date:'2023-03-16T08:14:30Z'},
            {name:"Notebook Dell 15,6” Ryzen 5 8B 256GB SSD INSP3525 94JM5", marca:"Dell", price:420, quantity:30,date:'2023-03-16T08:14:30Z'}
        ]) */



        /* let result = await productsModel.insertMany([
            {title:"Notebook Lenovo 14” Celeron 4GB 500GB IdeaPad 3 81WH0015AR", 
            description:"Combinando su procesador AMD Ryzen 5 con la memoria RAM de 8GB y el almacenamiento SSD de 256GB, la Inspiron 15 3525 ofrece un desempeño ágil en las tareas diarias, una experiencia de uso rápida y el espacio necesario para todos tus archivos.",
            price:164,
            thumbnail:"https://images.fravega.com/f1000/7b7be29f5d45304ae978c7c9e49ce50d.jpg.webp", 
            code:"81WH0015AR",
            stock:20,
            marca:"Lenovo",
            status:true,
            date:'2023-03-16T08:14:30Z'},
            {title:"Notebook Asus 15.6” Intel Core I3 4GB 256GB SSD 91X515EA-BR1751W", 
            description:"Combinando su procesador AMD Ryzen 5 con la memoria RAM de 8GB y el almacenamiento SSD de 256GB, la Inspiron 15 3525 ofrece un desempeño ágil en las tareas diarias, una experiencia de uso rápida y el espacio necesario para todos tus archivos.",
            price:259,
            thumbnail:"https://images.fravega.com/f1000/b70260ca15116d1f1fea967646305ec9.png.webp",
            code:"91X515EA-BR1751W",
            stock:25,
            marca:"Asus",
            status:true,
            date:'2023-03-16T08:14:30Z'},
            {title:"Lenovo Notebook Lenovo 15.6” Core i3 4GB 256GB SSD IdeaPad 3 81WB01EVAR",
            description:"Combinando su procesador AMD Ryzen 5 con la memoria RAM de 8GB y el almacenamiento SSD de 256GB, la Inspiron 15 3525 ofrece un desempeño ágil en las tareas diarias, una experiencia de uso rápida y el espacio necesario para todos tus archivos.", 
            price:280, 
            thumbnail:"https://images.fravega.com/f300/171f7c4f8afe971fcbc2c46969bad42d.jpg.webp",
            code:"81WB01EVAR",
            stock:10,
            marca:"Lenovo",
            status:true,
            date:'2023-03-16T08:14:30Z'},
            {title:"Notebook Dell 15,6” Ryzen 5 8B 256GB SSD INSP3525 94JM5",
            description:"Combinando su procesador AMD Ryzen 5 con la memoria RAM de 8GB y el almacenamiento SSD de 256GB, la Inspiron 15 3525 ofrece un desempeño ágil en las tareas diarias, una experiencia de uso rápida y el espacio necesario para todos tus archivos.",
            price:420,
            thumbnail:"https://images.fravega.com/f500/bac8444aebb2c86df95a9e8cac9ca697.jpg",
            code:"94JM5",
            stock:30,
            marca:"Dell",
            status:true,
            date:'2023-03-16T08:14:30Z'},
            {title:"Notebook Dell 15,6” Core I7 16GB 512GB SSD INSP3511 6MF7H",
            description:"Combinando su procesador Intel Core i7-1165G7 con la memoria RAM de 16GB y el almacenamiento SSD de 512GB, la Inspiron 3511 ofrece un desempeño ágil en las tareas diarias, una experiencia de uso rápida y el espacio necesario para todos tus archivos.",
            price:650,
            thumbnail:"https://images.fravega.com/f300/17ff032b9dcf802ab66fad024bf90708.png.webp",
            code:"6MF7H",
            stock:30,
            marca:"Dell",
            status:true,
            date:'2023-03-16T08:14:30Z'}
        ]) */
 /*        const res = await orderModel.aggregate([{
            $match:{
                marca:'Lenovo'
            }
        }, */
        //fASE 2: AGRUPADO POR NOMBRE
       /*  {
            $group:{
                _id:'$name',
                totalQuantity:{
                    $sum:'$quantity'
                }
            }
        }, */
        //fase 3: agrupado por orden de total sort by quantity
        /* {
            $sort:{
                totalQuantity:-1
            }
        }, */
        //Fase 4. create array 
       /*  {
            $group:{
                _id:1,
                orders: {
                    $push:'$$ROOT',
                }
            }
        }, */
        //fase 5. save  array in a document ( and generate the id)

       /*  {
            $project:{
                _id:0,
                orders:'$orders'
            },
        },
 */
        //fase 6 : merge into report

/*         {
            $merge: {
                into:'reports',
            },
        },
    ]);
 */ /*    const result = await productsModel.find() */
        /* console.log(res) */
       /*  console.log(result) */

       /* const res = await productsModel.paginate({marca:"Lenovo"},{})
       console.log(res)
 */
    } catch (error) {
        console.log(error);
        throw "can not connect to the db";
        
    }

}

module.exports = connectMongo ;