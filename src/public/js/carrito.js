const socket = io();

// variables
const procesarCompra = document.querySelector('#procesarCompra');
const precioTotal = document.querySelector('#precioTotal');

const botonVaciar = document.querySelector('#boton-vaciar');
let carritoId = null;
const divisa = '$';
const CarritoTotal = document.querySelector('#CarritoTotal');

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


/*--------------URL DE USUARIO Y AGREGAR AL CARRITO DE USUARIO---------------*/

document.addEventListener("DOMContentLoaded", function () {
  const botonesAgregarCarrito = document.querySelectorAll(".Add-Cart");
  const userId = document.querySelector('#idUser');
  const UserID = userId.getAttribute('data-user-id');

  botonesAgregarCarrito.forEach((boton) => {
      boton.addEventListener("click", async function () {
          const productId = this.getAttribute("data-producto-id");
          console.log('agregando producto', productId);

          // Obtener el valor de cartId de la URL
          const cartId = getQueryParam('cartId');
          console.log('cartId desde la URL:', cartId);

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
                  // Puedes mostrar una notificación al usuario indicando que ocurrió un error.
              }
          } catch (error) {
              throw (error);
          }
      });
  });
});


      // -----Mostrar producto del carrito en el modal-------- 

 
    
  async function mostrarCarrito() {
    const modalBody = document.querySelector('.modal .modal-body');
    const cartIdViewProduct = getQueryParam('cartId');
    console.log('ID del carro', cartIdViewProduct);
    const options = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    }
  
    try {
      const response = await fetch(`/carts/${cartIdViewProduct}`, options);
      const result = await response.json();
  
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
            </div>
          `;
  
          modalBody.appendChild(productElement);
        });


         //recorriendo el carrito, si esta vacio muestra mensaje
         if (response.length === 0) {
          modalBody.innerHTML = `
              <p class="text-center text-primary">El carrito esta vacio</p>`;
      }
      //recorriendo el carrito para conocer la cantidad de productos
      CarritoTotal.textContent = response.length;
  
     // Calcular el precio total de los productos en el carrito
     const totalPrice = result.payload.products.reduce((acc, product) => {
      return acc + product.productId.price;
    }, 0);

    // Actualizar el precio total en el modal
    precioTotal.innerText = divisa + totalPrice;
  //   guardaLocalStorage();
      } else {
        console.log('La respuesta JSON no contiene productos válidos');
      }
    } catch (error) {
      throw error;
    }
  }

  //guardando en el local storage los productos ingresados al carrito
/* function guardaLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(result.payload.products))
} */
/* 
//elimina la información del local storage una vez enviado el pedido
function borrarLocalStorage() {
  localStorage.removeItem('carrito');
} */