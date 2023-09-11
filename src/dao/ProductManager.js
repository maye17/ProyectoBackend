const fs =require ("fs");
const { stringify } = require("querystring");
const path = require("path");

const pathJSON = "./productos.json";

class ProductManager{
    constructor(){
        this.id=1;
        this.products=[];
        this.pathJSON=pathJSON;
       
    }

    async readJson  () {
        try{

        if(fs.existsSync(this.pathJSON)){
        let productContent = await fs.promises.readFile(pathJSON, "utf-8");
        return JSON.parse(productContent);
    
    }
     writeJson()
    } catch (error) {
        throw new Error (error.message)
    }
                      
    }

  async  writeJson  (productContent) {
      try {
      await fs.promises.writeFile(pathJSON,JSON.stringify(productContent,null,2),"utf-8")
      } catch (error) {
          throw new Error(error.message)
      }
        
    }

 
  async addProduct (title, description, price, thumbnail, code, stock){
    try {
        const {products} = await this.readJson();

        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
     
        };

        if(products.find((article)=> article.code === code)){
           return 'This code already exists'

        }        

        if(!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail || !newProduct.code){
        
            
            return 'Fields missing'

        }

        
        let newProducts={...newProduct, id: this.id}
        products.push(newProducts);
        this.id ++;

       
       this.writeJson({
            products:products,
        })
        
        return "product  added in my list"
       
    } catch (error) {
       throw new Error (error.message) 
    }
        
    }

    async getProduct (){
        try {
            const {products} = await this.readJson();
            return products 
            
        } catch (error) {
            throw new Error(error.message) 
        }
         
 
    }

    async getProductById(id){
       try {
        const {products} = await this.readJson();
        const idsolicitado =(products.find ((read) => read.id === id))
              if(idsolicitado){
                  return idsolicitado
              }
       } catch (error) {
           throw new Error (error.message)
       }
   
     }
    // actualizar un producto

   async updateProduct(id,title, description, price, thumbnail, code, stock){
       try {
        const {products} = await this.readJson();
        let newproductsUpdate = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }
        if(products.findIndex((article)=> article.id === id)){            
            return "Don't product exists"                    
        } else {         
          let productsUpdate ={...newproductsUpdate}
        this.writeJson({
            products:[productsUpdate],
        })
            return"exist"

        }   
       } catch (error) {
         throw new Error (error.message)  
       }
        
    }

  async  deleteProduct(id){
      try {
        const {products} = await this.readJson();
      
        let deleteItem = {
            id
        }
        
        if(products.find((item)=> item.id ===id)){
            products.pop(deleteItem)
            this.writeJson({
                products:products
               
            })
            return "delete item Ok!"
        } else {
            return "Don't delete anything"
        }
        
      } catch (error) {
         throw new Error (error.message) 
      }
        
    }
    

    
}
module.exports = ProductManager;


/* 
const productsManager = new ProductManager;

console.log(productsManager.addProduct("Camisa De Hombre Slim Fit","Camisa De Hombre Slim Fit, Cuello camisero abotonado, Ajustado, Punta de puntilla de algodón premium, Botones de nácar, Insignia de cocodrilo verde en el pecho, Cotton (100%)",38.000,"Sin Imagen","lacoste123",15)); 
console.log(productsManager.addProduct("Camisa De Hombre Slim Fit","Camisa De Hombre Slim Fit, Cuello camisero abotonado, Ajustado, Punta de puntilla de algodón premium, Botones de nácar, Insignia de cocodrilo verde en el pecho, Cotton (100%)",40.000,"'https://www.lacoste.com/ar/lacoste/hombre/ropa/camisas/camisa-de-hombre-slim-fit/3666165451391.html?color=T01&gclid=Cj0KCQjwlumhBhClARIsABO6p-ymC4l5Hce_68x4PHdV9xwh8p-e3thi08rWS37P4nOIvnhIQvMzfawaAhnEEALw_wcB'","lacoste432",12)); 
console.log(productsManager.addProduct("Camisa De Hombre Regular Fit","Camisa De Hombre Regular Fit, Cuello corto abotonado, Ajuste regular, Punta de puntilla de algodón premium, Cocodrilo verde bordado en el pecho, Cotton gabardine:, Stretchy and comfortable., Algodón (100%)",30.000,"https://www.lacoste.com/ar/lacoste/hombre/ropa/camisas/camisa-de-hombre-regular-fit/CH6511-23.html?color=T01","lacoste367",12)); 
console.log(productsManager.getProduct());
console.log(productsManager.getProductById(3)); 
console.log(productsManager.updateProduct(2,"refresco","",220,"sin imagen","12",0)) */
/* console.log(productsManager.deleteProduct(2));  */