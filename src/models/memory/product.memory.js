
//class ProductsController {
  class FactoryMemory{
    constructor(){
        this.products=[];
        this.id=1;

    }
    async getAllProducts (){
        try {
            
          
            return this.products

        } catch (error) {
            throw error
        }
    }

    async getProductById(productId) {
        try {
            const {productsAll} = this.products
            const productSolicitado = await (productsAll.find ((product) => product.id === productId))
            return productSolicitado;
        } catch (error) {
            throw new Error (error.message)
        }
    }


    async addProduct (products){
        try {
        
            let newProduct ={products}
            let newProducts = {...newProduct,id:this.id}

            this.products.push(newProducts)
            this.id ++;
 
            console.log("probando si se guarda el producto en el arreglo",newProducts)
            return newProducts;
      
        } catch (error) {
            throw new Error (error.message)
        }

    }

    async  deleteProduct(productid){
        try {
          const {productsAll} = this.products;
        
          let deleteItem = {
            productid
          }
          
          if(productsAll.find((item)=> item.id ===productid)){
            productsAll.pop(deleteItem)
             
              return "delete item Ok!"
          } else {
              return "Don't delete anything"
          }
          
        } catch (error) {
           throw new Error (error.message) 
        }
          
      }

}
module.exports = FactoryMemory;
//module.exports = ProductsController;