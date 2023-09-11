
const express = require('express');
const productsModel = require('../models/mongoose/products.model.js');
const isAdmin = require('../middlewares/authAdmin.js');
const adminRouter = express.Router();


adminRouter.get('/', isAdmin, async (req, res) => {
  //res.render('admin');
  try {
    const {page}=req.query;
    const data = await productsModel.paginate({},{limit:5,page:page || 1});
    const {docs,...rest} =data
    
    let products =docs.map((doc)=>{
        return {
            id: doc._id,
            title: doc.title,
            description:doc.description,
            price:doc.price,
            thumbnail:doc.thumbnail,
            marca:doc.marca,
            code:doc.code,
            stock:doc.stock,
            }
    })

    const title = "Administrador";
   //admin
  return  res.status(200).render("products-admin",{products,title, pagination: rest});

} catch (err) {
    if (err instanceof Error) {
        res.status(400).json({ status: "error", msg: "Invalid input", data: {} })
    } else {
        res.status(500).json({ status: "error", msg: "Error in server", data: {}})
    }
}
});



module.exports = adminRouter;