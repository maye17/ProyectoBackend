const PrincipalService = require('../services/product.service.js')
const principalService = new PrincipalService()


class PrincipalController {

 
    async  getAllProd(req,res){
        try {
            const { page } = req.query; // 
            const result = await principalService.getAllProd(page);
            return res.status(200).render("principal", { products: result.products, pagination: result.pagination });
            
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ status: "error", msg: "Invalid input", data: {} })
            } else {
                res.status(500).json({ status: "error", msg: "Error in server", data: {}})
            }
        }

    }

    async createProduct (){
        const products = req.body;
        const savedProductOne = await principalService.createProduct(products);
        return res.json({
            status: "success",
            payload:savedProductOne
        })

    }

    async  mostrarProductos(req, res) {
        try {
          // Obtener los productos desde el controlador de productos
          const cartId = req.session; 
          const userId = req.user._id;
        //  const { page } = req.query;
        const page = parseInt(req.query.page, 10) || 1; 
        const { products, pagination } = await principalService.getAllProd(page);
      //    const products = await principalService.getAllProd(page);

          console.log('funcion mostrarProductos',userId)
       
        //  console.log(products)
        res.render('user', { userId, products, pagination });
     //   return res.redirect(`/user/${userId}?page=${page}`);
       /*    return res.status(200).render('user', { products: products.products, pagination: products.pagination }); */

        } catch (error) {
          res.status(500).json({ 
            status: 'error',
            msg: 'Error en servidor', 
            data: {}
          });
        }
      }
      
}


module.exports = PrincipalController;

