

const socket = io();

// variables
const procesarCompra = document.querySelector('#procesarCompra');
const precioTotal = document.querySelector('#precioTotal');

const botonVaciar = document.querySelector('#boton-vaciar');
let carritoId = null;
const divisa = '$';
const CarritoTotal = document.querySelector('#CarritoTotal');



ShowLocalStorge()
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
/* const buttonViewDetail = document.querySelectorAll('.Cart-view');

buttonViewDetail.forEach((button) => {
  button.addEventListener('click', function () {
    const IDProductView = this.getAttribute("data-product-view-id");
    console.log('ver detalle del producto', IDProductView);
  });
}); */



// Controlador de evento para el botón que abre el offcanvas
// Controlador de evento para el botón que abre el offcanvas
const buttonViewDetail = document.querySelectorAll('.Cart-view');

buttonViewDetail.forEach((button) => {
  button.addEventListener('click', function () {
    // Obtén los datos del producto desde el atributo personalizado
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
  const UserID = userId.getAttribute('data-user-id');
  const botonesAgregarCarrito = document.querySelectorAll(".Add-Cart");

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


//Mostrar Local Storage
document.addEventListener('DOMContentLoaded',() => {
  ShowLocalStorge() || []; 
  mostrarCarrito();
})

      // -----Mostrar producto del carrito en el modal-------- 

 
    let result;
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
       result = await response.json();
  
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
              <p>Cantidad:${quantityModal}</p>
            </div>
          `;
  
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
    } catch (error) {
      throw error;
    }
  }

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

                // Crear elementos HTML para mostrar los productos
                const productElement = document.createElement('div');
                productElement.classList.add('producto');

                // Llenar el contenido del elemento
                productElement.innerHTML = `
                    <img src="${thumbnail}" alt="${title}" />
                    <h3>${title}</h3>
                    <p>Precio: ${price}</p>
                    <p>Cantidad: ${quantity}</p>
                `;

                // Agregar el elemento a tu página (por ejemplo, a un contenedor)
                const contenedorProductos = document.querySelector('.contenedor-productos');
                contenedorProductos.appendChild(productElement);
            });
        } else {
            // Si el carrito está vacío, muestra un mensaje
            const mensajeCarritoVacio = document.createElement('p');
            mensajeCarritoVacio.textContent = 'El carrito está vacío.';
            const contenedorProductos = document.querySelector('.contenedor-productos');
            contenedorProductos.appendChild(mensajeCarritoVacio);
        }
    } catch (error) {
        console.error('Error al parsear los datos del Local Storage:', error);
    }
} else {
    // Si no hay datos en el Local Storage, muestra un mensaje
    const mensajeSinDatos = document.createElement('p');
    mensajeSinDatos.textContent = 'No hay datos en el carrito.';
    const contenedorProductos = document.querySelector('.contenedor-productos');
    contenedorProductos.appendChild(mensajeSinDatos);
}

}

//elimina la información del local storage una vez enviado el pedido
/* function borrarLocalStorage() {
  localStorage.removeItem('carrito');
} */


/* 
//elimina la información del local storage una vez enviado el pedido
function borrarLocalStorage() {
  localStorage.removeItem('carrito');
} */