

const socket = io();

// variables
const procesarCompra = document.querySelector('#procesarCompra');
const precioTotal = document.querySelector('#precioTotal');

const botonVaciar = document.querySelector('#boton-vaciar');
let carritoId = null;
const divisa = '$';
const CarritoTotal = document.querySelector('#CarritoTotal');



//ShowLocalStorge()
// Función para obtener los parámetros de consulta de la URL
  function getQueryParam(paramName) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(paramName);
}

// evento que guarda la información cuando se recarga la página, buscando la informaciónen en el local storage en caso de no contener muestra vacío
/* document.addEventListener('DOMContentLoaded',() => {
  result.payload.products = JSON.parse(localStorage.getItem('carrito')) || []; 
  mostrarCarrito();
})
 */


//-----------MOSTRAR DETALLE DEL PRODUCTO-------

const offcanvasBody = document.querySelectorAll('offcanvas-body')

// Controlador de evento para el botón que abre el offcanvas
const buttonViewDetail = document.querySelectorAll('.Cart-view');

buttonViewDetail.forEach((button) => {
  button.addEventListener('click', function () {
    // datos del producto 
    const productData = JSON.parse(this.getAttribute('data-product'));

    // Renderiza la plantilla de Handlebars con los datos del producto
    const source = document.getElementById("offcanvas-template").innerHTML;
    const template = Handlebars.compile(source);
    const html = template(productData);

    // Agrega el HTML renderizado al offcanvas
    document.getElementById("offcanvas-content").innerHTML = html;

    // Abre el offcanvas
    const offcanvas = new bootstrap.Offcanvas(document.getElementById("staticBackdrop"));
    offcanvas.show();
  });
});


/*--------------URL DE USUARIO Y AGREGAR AL CARRITO DE USUARIO---------------*/

document.addEventListener("DOMContentLoaded", function () {
  const userId = document.querySelector('#idUser');

  if(!userId){
    console.log('muestro pantalla principal');
    window.location.href = '/auth/login';
  }

  const UserID = userId.getAttribute('data-user-id');
  const botonesAgregarCarrito = document.querySelectorAll(".Add-Cart");

  if(UserID !== null){

  botonesAgregarCarrito.forEach((boton) => {
    boton.addEventListener("click", async function () {
      const productId = this.getAttribute("data-producto-id");
      console.log('agregando producto', productId);

      // Obtener el valor de cartId de la URL
      const cartId = getQueryParam('cartId');
      console.log('cartId desde la URL:', cartId);
     
        if (cartId) {
          // Incluye cartId en la URL solo si tiene un valor válido
          const prevPageURL = `/access/user/?cartId=${cartId}&page=${pagination.prevPage}&limit=${pagination.limit}`;
    
        }


      // Realizar la solicitud fetch utilizando cartId
      const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
      };

      try {
        const response = await fetch(`/carts/${cartId}/product/${productId}`, options);
        const result = await response.json();
        if (response.ok) {
          console.log(result.message, productId);

          mostrarCarrito(); // Mensaje de éxito
        } else {
          console.log(result.message); // Mensaje de error del servidor
     
        }
      } catch (error) {
        throw (error);
      }
    });
  });

}else {
  console.log('el usuario no esta registrado')
}

}
);




//Mostrar Local Storage
document.addEventListener('DOMContentLoaded',() => {
 // ShowLocalStorge() || []; 
  mostrarCarrito();
})

document.addEventListener('DOMContentLoaded', () => {
  const userId = document.querySelector('#idUser');
  //const UserID = userId.getAttribute('data-user-id');
  if (!userId) {

    console.log('todo igual')
  }else{
    // El usuario ha iniciado sesión, por lo tanto, muestra el carrito del Local Storage
    //ShowLocalStorge();
    mostrarCarrito();
  }
  // Otras acciones a realizar si el usuario no ha iniciado sesión
});


      // -----Mostrar producto del carrito en el modal-------- 
      let prevPageURL;
    let  pagination = {
      prevPage: 0, 
      limit: 4,   
    }; 
 
    let result;


    async function mostrarCarrito() {
      const modalBody = document.querySelector('.modal .modal-body');
      const cartId = getQueryParam('cartId');
      let result;
    
      if (cartId) {
        // Incluye cartId en la URL solo si tiene un valor válido
        prevPageURL = `/access/user/?cartId=${cartId}&page=${pagination.prevPage}&limit=${pagination.limit}`;
        console.log('url de paginado del carrito', prevPageURL);
      }
    
      console.log('ID del carro', cartId);
      const options = {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      }
    
      try {
        const response = await fetch(`/carts/${cartId}`, options);
        if (!response.ok) {
          throw new Error(`Solicitud fallida con estado ${response.status}`);
        }
    
        result = await response.json();
        
        // Limpiar el contenido existente en el modal
        modalBody.innerHTML = "";
    
        if (result && result.payload && result.payload.products && Array.isArray(result.payload.products) && result.payload.products.length > 0) {
          // Iterar a través de todos los productos en el carrito y mostrarlos
          result.payload.products.forEach((product) => {
            // Utilizar las propiedades reales del objeto product
            const thumbnailModal = product.productId.thumbnail;
            const titleModal = product.productId.title;
            const priceModal = product.productId.price;
            const quantityModal = product.quantity;
            const DeletedProductId = product.productId._id;
    
            // Crear un elemento para cada producto y agregarlo al modal
            const productElement = document.createElement('div');
            productElement.classList.add('modal-contenedor');
            productElement.innerHTML = `
              <div>
                <img class="img-fluid img-carrito" src="${thumbnailModal}">
              </div>
              <div>
                <p>Producto: ${titleModal}</p>
                <p>Precio: ${priceModal}</p>
                <h6>Cantidad:</h6>
                <p class="cantidad" data-product-id="${DeletedProductId}">Cantidad:${quantityModal}</p>
                <p>Id:${DeletedProductId}</p>
                <button class="delete-product btn btn-danger" data-deleted-id="${DeletedProductId}" >Borrar</button>
              </div>
            `;
    
            // Para eliminar un producto
            const BotonDeleteProduct = productElement.querySelectorAll('.delete-product[data-deleted-id]');
    
            // Función para eliminar
            BotonDeleteProduct.forEach((deleteButton) => {
              deleteButton.addEventListener('click', function () {
                const DeletedProductId = this.getAttribute('data-deleted-id');
                DeletedProduct(DeletedProductId);
              });
            });
    
            modalBody.appendChild(productElement);
          });
    
          // Calcular la cantidad total de productos en el carrito
          const totalQuantity = result.payload.products.reduce((acc, product) => {
            return acc + product.quantity;
          }, 0);
    
          // Actualizar la cantidad total en CarritoTotal
          CarritoTotal.innerText = totalQuantity;
    
          // Calcular el precio total de los productos en el carrito
          const totalPrice = result.payload.products.reduce((acc, product) => {
            return acc + product.productId.price;
          }, 0);
    
          // Actualizar el precio total en el modal
          precioTotal.innerText = divisa + totalPrice;
          // Guardar en el local storage
          guardaLocalStorage();
        } else {
          // No hay productos válidos en el carrito, muestra un mensaje de carrito vacío
          modalBody.innerHTML = `
            <p class="text-center text-primary">El carrito está vacío</p>`;
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    }
    
/*    async function mostrarCarrito() {

        const modalBody = document.querySelector('.modal .modal-body');
        const cartId = getQueryParam('cartId');

        if (cartId) {
          // Incluye cartId en la URL solo si tiene un valor válido
         prevPageURL = `/access/user/?cartId=${cartId}&page=${pagination.prevPage}&limit=${pagination.limit}`;
          console.log('url de paginado del carrito', prevPageURL)
        }
        

    console.log('ID del carro', cartId);
    const options = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    }
  
    try {
      const response = await fetch(`/carts/${cartId}`, options);
      if (!response.ok) {
        throw new Error(`Solicitud fallida con estado ${response.status}`);
      }
  
       result = await response.json();
  if (result && result.payload && result.payload.products && Array.isArray(result.payload.products)) {

      console.log('productos agregados al carrito y mostrados en el front', result.payload.products);
  
      // Limpiar el contenido existente en el modal
      modalBody.innerHTML = "";
  
      // Iterar a través de todos los productos en el carrito y mostrarlos
      if (result && result.payload.products && Array.isArray(result.payload.products)) {
        result.payload.products.forEach((product) => {
          // Utilizar las propiedades reales del objeto product
          const thumbnailModal = product.productId.thumbnail;
          const titleModal = product.productId.title;
          const priceModal = product.productId.price;
          const quantityModal = product.quantity;
          const DeletedProductId = product.productId._id;
      
  
          // Crear un elemento para cada producto y agregarlo al modal
          const productElement = document.createElement('div');
          productElement.classList.add('modal-contenedor');
          productElement.innerHTML = `
            <div>
              <img class="img-fluid img-carrito" src="${thumbnailModal}">
            </div>
            <div>
              <p>Producto: ${titleModal}</p>
              <p>Precio: ${priceModal}</p>
              <h6>Cantidad:</h6>
              <p class="cantidad" data-product-id="${DeletedProductId}">Cantidad:${quantityModal}</p>
              <p>Id:${DeletedProductId}</p>
              <button class="delete-product btn btn-danger" data-deleted-id="${DeletedProductId}" >Borrar</button>
            </div>
          `;

          //Para eliminar un producto 
          const BotonDeleteProduct = productElement.querySelectorAll('.delete-product[data-deleted-id]');
          //Funcion para eliminar 

          BotonDeleteProduct.forEach((deleteButton) => {
            deleteButton.addEventListener('click', function () {
              const DeletedProductId = this.getAttribute('data-deleted-id');
              DeletedProduct(DeletedProductId);
            });
          });
          



          modalBody.appendChild(productElement);
        });


         //recorriendo el carrito, si esta vacio muestra mensaje
         if (response.length === 0) {
          modalBody.innerHTML = `
              <p class="text-center text-primary">El carrito esta vacio</p>`;
      }
      // Calcular la cantidad total de productos en el carrito
      const totalQuantity = result.payload.products.reduce((acc, product) => {
        return acc + product.quantity;
    }, 0);

      // Actualizar la cantidad total en(CarritoTotal)
      
      CarritoTotal.innerText = totalQuantity;


     // Calcular el precio total de los productos en el carrito
     const totalPrice = result.payload.products.reduce((acc, product) => {
      return acc + product.productId.price;
    }, 0);

    // Actualizar el precio total en el modal
    precioTotal.innerText = divisa + totalPrice;
    //guardando en el local storage
    guardaLocalStorage()

      } else {
        console.log('La respuesta JSON no contiene productos válidos');
      }
    } else {
      console.log('La respuesta JSON no contiene productos válidos');
    }
    
    
    } catch (error) {
     console.error('Error en la solicitud:', error);
    }
  }  */

  //guardando en el local storage los productos ingresados al carrito
  function guardaLocalStorage() {
    try {
      if (result) {
          // Verificar si hay productos para guardar
          if (Array.isArray(result.payload.products) && result.payload.products.length > 0) {
              // Convertir los productos a una cadena JSON y guardarla en el Local Storage
              localStorage.setItem('carrito', JSON.stringify(result.payload.products));
              console.log('Productos guardados en el Local Storage');
          } else {
              // Si no hay productos en el carrito, puedes eliminar la entrada 'carrito' del Local Storage
              localStorage.removeItem('carrito');
              console.log('No hay productos en el carrito para guardar');
          }
      }
  } catch (error) {
      console.error('Error al guardar productos en el Local Storage:', error);
  }
}


// MOSTRAR DATOS DEL LOCAL STORAGE

function ShowLocalStorge(){
  // Obtener los datos del Local Storage
const carritoStorage = localStorage.getItem('carrito');

// Verificar si hay datos en el Local Storage
if (carritoStorage) {
    try {
        // Parsear los datos JSON
        const carrito = JSON.parse(carritoStorage);

        // Verificar si hay productos en el carrito
        if (Array.isArray(carrito) && carrito.length > 0) {
            // Iterar a través de los productos y mostrarlos en tu página
            carrito.forEach((product) => {
                // Utilizar las propiedades del producto para mostrarlo en tu página
                const thumbnail = product.productId.thumbnail;
                const title = product.productId.title;
                const price = product.productId.price;
                const quantity = product.quantity;
                const DeletedProductId = product.productId._id;

                // Crear elementos HTML para mostrar los productos
                const productElement = document.createElement('div');
                productElement.classList.add('producto');

                // Llenar el contenido del elemento
                productElement.innerHTML = `
                    <img src="${thumbnail}" alt="${title}" />
                    <h3>${title}</h3>
                    <p>Precio: ${price}</p>
                    <p>Cantidad: ${quantity}</p>
                    <button class="delete-product btn btn-danger" data-product-id="${DeletedProductId}">Borrar</button>

                `;

                // Agregar el elemento a tu página (por ejemplo, a un contenedor)
                const contenedorProductos = document.querySelector('.contenedor-productos');

                if (contenedorProductos) {
                  contenedorProductos.appendChild(productElement);
                } else {
                  console.log('El contenedor de productos no se encontró en el DOM.');
                }
               
            });
        } else {
            // Si el carrito está vacío
            const mensajeCarritoVacio = document.createElement('p');
            mensajeCarritoVacio.textContent = 'El carrito está vacío.';
            const contenedorProductos = document.querySelector('.contenedor-productos');
            contenedorProductos.appendChild(mensajeCarritoVacio);
        }
    } catch (error) {
      console.log('Error al parsear los datos del Local Storage:', error);
    }
} else {
    // Datos no almacenados en el localStorage
    const mensajeSinDatos = document.createElement('p');
    mensajeSinDatos.textContent = 'No hay datos en el carrito.';
    const contenedorProductos = document.querySelector('.contenedor-productos');
    contenedorProductos.appendChild(mensajeSinDatos);
}

}


//Eliminar un producto 

function DeletedProduct() {
  console.log('Init for delete');
  
  const userIdDelete = document.querySelector('#idUser');
  const userDeleteId = userIdDelete.getAttribute('data-user-id');
  const BotonDeleteProduct = document.querySelectorAll('.delete-product');

  console.log('Obteniendo el id del usuario al cual se le eliminará la cantidad del producto seleccionado', userDeleteId);

  if (userDeleteId !== null) {
    BotonDeleteProduct.forEach((boton) => {
      boton.addEventListener('click', async function () {
        const DeletedProductId = this.getAttribute("data-deleted-id");
        const cantidadElement = document.querySelector(`[data-product-id="${DeletedProductId}"]`);

        if (!cantidadElement) {
          console.error(`No se encontró el elemento de cantidad para el producto ${DeletedProductId}`);
          return; // Salir de la función si no se encuentra el elemento
        }

        console.log('Cantidad del elemento', cantidadElement.textContent);

        let cantidadActual = 0; // Valor predeterminado si no se encuentra la cantidad

        const textContent = cantidadElement.textContent;
        const match = textContent.match(/Cantidad:\s*(\d+)/); // Buscar el número después de "Cantidad:"

        if (match) {
          cantidadActual = parseInt(match[1]);
          console.log('Cantidad actual ParseInt', cantidadActual);
        } else {
          console.error(`No se pudo extraer la cantidad del elemento de cantidad para el producto ${DeletedProductId}`);
        }

        console.log('Id del botón tocado', DeletedProductId);

        // Obtener el valor de cartId de la URL
        const cartId = getQueryParam('cartId');

       
        if (cartId) {
          // Incluye cartId en la URL solo si tiene un valor válido
          const prevPageURL = `/access/user/?cartId=${cartId}&page=${pagination.prevPage}&limit=${pagination.limit}`;
          // ...
        }

        console.log('cartId desde la URL:', cartId);


        const options = {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ quantity: 1 }), // Eliminar 1 a la cantidad actual
        };

        try {
          const response = await fetch(`/carts/${cartId}/product/${DeletedProductId}`, options);
          const result = await response.json();
          if (response.ok) {
            console.log(result.message, DeletedProductId);

            if (!isNaN(cantidadActual) && cantidadActual > 0) {
              const nuevaCantidad = cantidadActual - 1;
              cantidadElement.textContent = `Cantidad: ${nuevaCantidad}`;
              console.log('cuanto queda',nuevaCantidad)
            }else{
              location.reload()
            }


            // Eliminar el elemento del carrito de la interfaz de usuario
            const productRow = boton.closest('tr');
            if (productRow !== null) {
              productRow.remove();
            }
           
          } else {
            console.log(result.message);
          }
        } catch (error) {
          console.error('Error al procesar la eliminación del producto:', error);
        }
      });
    });
  }
}




 ///elimina la información del local storage una vez enviado el pedido
/* function borrarLocalStorage() {
  localStorage.removeItem('carrito');
} */


/* 
//elimina la información del local storage una vez enviado el pedido
function borrarLocalStorage() {
  localStorage.removeItem('carrito');
}  */