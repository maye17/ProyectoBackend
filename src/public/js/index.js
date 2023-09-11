const socket =io();
//Creando la tabla de productos

let box = document.querySelector('.container-fluid','.box');
let btnAgregar = document.querySelector('#btn-agregar');
let table = document.querySelector('.table','.table-hover');
let thead = document.querySelector('thead');
let tbody = document.querySelector('tbody');
const btnAdd = document.querySelector('#btn-add')

//const btnEdit = document.querySelector("#btnEdit");

// Escuchando al servidor

socket.on('products',(productos)=>{
   console.log('producto nuevo',productos);
})
// formulario
let formulario = document.querySelector('#form-product');
const inputTitle = document.querySelector('#input-title');
const inputDes = document.querySelector('#input-des');

const inputPrice = document.querySelector('#input-price');
const inputCode = document.querySelector('#input-code');
const inputStock = document.querySelector('#input-stock');
inputImage = document.querySelector('#input-img');
const inputMarca = document.querySelector("#input-marca");
const inputDate = document.querySelector("#input-date");

//campos del modal
const idProduct = document. querySelector('#product-id')
const inputEditTitle = document.querySelector('#input-editTitle')


// llamado al formulario de productos
const FormProduct = (e)=>{
    e.preventDefault();
    console.log('click');
    window.open('formulario','_self' )
    
}

if(btnAgregar){
    btnAgregar.addEventListener('click',FormProduct);
}

// creando producto

const EnviarProduct =(e)=>{
        e.preventDefault();

        const newProducts = {
            title:inputTitle.value,
            description: description.value,
            price: inputPrice.value,
            thumbnail:inputImage.value,
            code:inputCode.value,
            stock:inputStock.value,
            marca:inputMarca.value,
            date:inputDate.value
            
        }
  
        console.log('producto agregado',newProducts);
        socket.emit('new-Product',newProducts);       
        Toastify({
          text: "Producto agregando con éxito!",
          className: "info",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          }
        }).showToast();
          

        formulario.reset();
    }
    

if(btnAdd){
    btnAdd.addEventListener('click',EnviarProduct)

}

document.addEventListener("DOMContentLoaded", function () {
  const editButtons = document.querySelectorAll(".edit-button");
  const saveChangesButton = document.querySelector("#saveChangesButton");

  let currentProductId = null;

  editButtons.forEach(button => {
    button.addEventListener("click", function () {
      currentProductId = button.getAttribute("data-product-id");

    });
  });

  saveChangesButton.addEventListener("click", function () {

    // Obtener los valores editados desde los campos del formulario en el modal
    const editedProductName = document.querySelector("#editProductName").value;
    const editedProductDescription = document.querySelector("#editProductDescription").value;
    const editedProductCategory = document.querySelector("#editProductCategory").value;
    const editedProductPrice = document.querySelector("#editProductPrice").value;
    const editedProductThumbnail = document.querySelector('#editProductThumbnail').value;
    const editedProductCode = document.querySelector('#editProductCode').value;
    const editedProductStock = document.querySelector('#editProductStock').value;

    const editedProduct = {
      title: editedProductName,
      description: editedProductDescription,
      category: editedProductCategory,
      price: editedProductPrice,
      thumbnail: editedProductThumbnail,
      code: editedProductCode,
      stock: editedProductStock,
    };

    console.log('Producto editado:', editedProduct);

    socket.emit('update-Product', currentProductId, editedProduct);
    Toastify({
      text: "Producto agregando con éxito!",
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      }
    }).showToast();
      


    // Cerrar el modal después de guardar los cambios
    const modal = new bootstrap.Modal(document.querySelector("#editModal"));
    modal.hide();
  });
});




//elimando producto

document.addEventListener("DOMContentLoaded", function () {
  const deleteButtons = document.querySelectorAll(".delete-button");

  

  deleteButtons.forEach(button => {

    button.addEventListener("click", function () {
      console.log('haciendo click')
      const productId = button.getAttribute("data-product-id");
      // Envía el ID del producto al servidor a través de sockets para eliminarlo
      socket.emit("delete-Product", productId);
      Toastify({
        text: "Producto eliminado!",
        className: "info",
        style: {
          backgroundImage: "linear-gradient(to right, #370513, #4e091a, #670f1f, #7f1721, #972222)",
          
        }
      }).showToast();
        
    });
  });

  // Escucha el evento del servidor que notifica que un producto ha sido eliminado
  socket.on("product-deleted", function (deletedProductId) {
    // Busca y elimina el producto de la lista en el frontend
    const productList = document.querySelector("#productList");
    const productToDelete = document.querySelector(`[data-product-id="${deletedProductId}"]`);
    if (productToDelete) {
      productList.removeChild(productToDelete.parentNode);
    }
  });
});


//renderizar la tabla de productos




// BUSCADOR
/* 

const buscador =document.querySelector('#buscador');
const btnBuscar = document.querySelector('#btnBuscar');
const resultado =document.querySelector('#resultado')

const filtrar = ()=> {
   console.log(buscador.value);
    resultado.innerHTML = '';
    const texto = buscador.value.toLowerCase();
    for (let productoBuscar of productos){
        let nombreProducto = productoBuscar.name.toLowerCase();
        if(nombreProducto.indexOf (texto) !== -1){
            resultado.innerHTML +=  `
            <div class="card mx-2 my-2 flex-shrink-1" style="width: 18rem;">
            <img src=${productoBuscar.thumbnail} class="card-img-top" alt="imagen">
            <div class="card-body">
              <h5 class="card-title">${productoBuscar.title}</h5>
              <p class="card-text">${productoBuscar.description}</p>
              <p class="card-text">${productoBuscar.marca}</p>
              <p>Código:${productoBuscar.code}</p>
              <a href="#" class="btn btn-primary">Agregar</a>
            </div>
          </div>`                  

        }
    }
    if(resultado.innerHTML ===''){
        resultado.innerHTML += `<h3>Producto no encontrado</h3>`
        
    }
}
 */
/* btnBuscar.addEventListener('click', filtrar); */
//buscador.addEventListener('keyup',filtrar)






//Agregando al carrito

let carrito=[];	






















/* socket.on("msg_back_to_front", (newMessage) => {
    const messages = document.querySelector("#chat");
    const li = document.createElement("li");
    li.innerHTML = `<strong>${newMessage.userName}</strong>: ${newMessage.chatBoxOne}`;
    messages.appendChild(li);
  }); */
/*  socket.emit('new-Product',newProducts) */


/* chatBoxOne.addEventListener("keyup", ({ key }) => {
  if (key == "Enter") {
    socket.emit("msg_front_to_back", {
      user: userName,
      msg: chatBoxOne.value,
      
    });
    chatBoxOne.value = "";
  }
});
 */


/* socket.on("msg_back_to_front", (msgs) => {
    // console.log(JSON.stringify(data)); 
   
    let msgformat = "";
   
    msgs.forEach(msg => {
     let div ="";
     div += `
     <li class="other">
           <div id="avatar" class="avatar"><img id="imgAvatar" src="https://i.imgur.com/DY6gND0.png" draggable="false"/></div>
         <div class="msg">
            <p id="msg" class="msg-name">${msg.user}</p>    
           <p id="msg">${msg.msg}</p>    
         </div>
       </li>  
    `
   msgformat =div + msgformat
      
    });
     const msg = document.querySelector("#chat");
   
    msg.innerHTML =msgformat;
   });   */
   
   


   //guardar mensaje
/* 
 const chatBoxTwo = document.querySelector("#textchatTwo"); 
   chatBoxTwo.addEventListener("keyup", ({ key }) => {
    if (key == "Enter") {

    const newMessage = {
        user:userName,
        message: chatBoxTwo.value,    
    }
    socket.emit('new-mesagge',newMessage)
    chatBoxTwo.value = "";

    console.log('mensaje guardado',newMessage);

}
   })

   
socket.on("msg_back_to_front", (newMessage) => {

  let msgsformat = "";
 
  newMessage.forEach(msg => {
   let divTwo ="";
   divTwo += `
   <li class="other">
         <div id="avatar" class="avatar"><img id="imgAvatar" src="https://i.imgur.com/DY6gND0.png" draggable="false"/></div>
       <div class="msg">
          <p id="msg" class="msg-name">${msg.user}</p>    
         <p id="msg">${msg.chating}</p>    
       </div>
     </li>  
  `
  msgsformat =divTwo + msgsformat
    
  });
   const chating = document.querySelector("#chating");
 
   chating.innerHTML =msgsformat;
 });  

 */

/* 
  logout.addEventListener('click', () => {
    socket.emit('logout', userName);
  }
  ); */

/*   socket.on('login', (userName) => {
    console.log(`${userName} se ha conectado`);
  }
  );
 */