const socket = io();

// variables
const procesarCompra = document.querySelector('#procesarCompra');

const botonVaciar = document.querySelector('#boton-vaciar');
let carritoId = null;
const divisa = '$';
document.addEventListener('DOMContentLoaded', async () => {
    const btnAdd = document.querySelectorAll('.Add-Cart');
    const userId = document.querySelector('#userId');
    const productIdsSpan = document.querySelectorAll('.product-id');
    
    btnAdd.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            const productId = e.target.getAttribute('data-product-id');
            console.log('click', productId);

            // Obtener el data-cart-id del enlace a (a.parentNode)
            const cartIdElements = document.querySelectorAll('.nav-link[data-cart-id]');

            cartIdElements.forEach(cartIdElement => {
                const cartId = cartIdElement.getAttribute('data-cart-id');
                const cartQuantitySpan = document.getElementById(`#cart-quantity-${cartId}`);

                console.log('seleccionando el carrito cartId', cartId);
                console.log('seleccionando el cartQuantitySpan', cartQuantitySpan);
            
                btnAdd.forEach(button => {
                    button.addEventListener('click', async (e) => {
                        e.preventDefault();
                        const productId = e.target.getAttribute('data-product-id');
                        console.log('click', productId);
                        console.log('carrito activo', cartId);
                        // Busca el <span> correspondiente al producto haciendo coincidir los atributos data-product-id
                        const matchingSpan = Array.from(productIdsSpan).find(span => span.getAttribute('data-product-id') === productId);
            
                        if (matchingSpan) {
                            // Actualiza el contenido del span correspondiente al ID del producto
                            matchingSpan.textContent = `ID del producto: ${productId}`;
                        }
            
                        try {
                            const response = await fetch('/:cid/product/:pid', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
            
                                body: JSON.stringify({
                                    cartId: cartId,
                                    productId: productId,
                                }),
            
                            });
                            if (response.ok) {
                                const updatedCart = await response.json();
                                console.log('Cart updated:', updatedCart);
                                // Actualizar la suma de las cantidades en el front-end
                                const totalCantidadElement = document.querySelector(`#cart-quantity-${cartId}`);
                                const totalCantidad = updatedCart.products.reduce((total, product) => total + product.quantity, 0);
                                totalCantidadElement.textContent = totalCantidad.toString();
                            } else {
                                console.error('Error adding products to cart');
                                //   console.error('An error occurred:', error.message);
            
                            }
                        } catch (error) {
                            console.error('An error occurred:', error);
                        }
                    });
                });
            });
        })
    })
    });


//no usar
/* document.addEventListener('DOMContentLoaded', async () => {

    // Fetch products from API
    const btnAdd = document.querySelectorAll('.Add-Cart');
    const productIdsSpan = document.querySelectorAll('.product-id');
    const cartId = document.querySelectorAll('#cart-id');
    btnAdd.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            const productId = e.target.getAttribute('data-product-id');
            console.log('Agregando prodcuto el codigo es:',productId)
            console.log('Viendo carrito activo',{cartId})
            // Busca el <span> correspondiente al producto haciendo coincidir los atributos data-product-id
            const matchingSpan = Array.from(productIdsSpan).find(span => span.getAttribute('data-product-id') === productId);
            
            if (matchingSpan) {
                // Actualiza el contenido del span correspondiente al ID del producto
                matchingSpan.textContent = `ID del producto: ${productId}`;
            }

            try {
                const response = await fetch('/:cid/product/:pid', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    
                    body: JSON.stringify({
                        cartId: cartId,
                        productIds: productId,
                    }),
                    
                });
                if (response.ok) {
                    const updatedCart = await response.json();
                    console.log('Cart updated:', updatedCart);
                    // Actualizar la suma de las cantidades en el front-end
                    const totalCantidadElement = document.querySelector('#totalCantidad');
                    const totalCantidad = updatedCart.products.reduce((total, product) => total + product.quantity, 0);
                    totalCantidadElement.textContent = totalCantidad.toString();
                } else {
                    console.error('Error adding products to cart');
                 //   console.error('An error occurred:', error.message);
        
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        });
    })
})

 */
/* document.addEventListener('DOMContentLoaded',() => {
    const btnAdd = document.querySelectorAll('.Add-Cart');
    btnAdd.forEach(button => {
        button.addEventListener('Click', async (e) => {
        const productId = [e.target.getAttribute('data-product-id')];
        console.log('click',productId)

        try {
            const response = await fetch('/:cid/product/:pid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                
                body: JSON.stringify({
                    cartId: cartId,
                    productIds: productId,
                }),
                
            });
            if (response.ok) {
                const updatedCart = await response.json();
                console.log('Cart updated:', updatedCart);
            } else {
                console.error('Error adding products to cart');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    
})
})
})
 */
 const actualizarInterfazCarrito = () => {

    const modalBody = document.querySelector('.modal .modal-body');
    modalBody.innerHTML="";
    carritoActualizado.forEach(product => {
        const { _id, title, description, price, thumbnail, code, stock } = product
        modalBody.innerHTML +=`
        <div class="modal-contenedor">
            <div>
                <img class="img-fluid img-carrito" src="${thumbnail}">
            </div>
            <div>
                <p>Producto: ${title}</p>
                <p>Precio:  ${divisa} ${price}</p>
                <p>Cantidad: ${quatify}</p>
                <button onclick="eliminarProductoCarrito(${_id})" class= "btn btn-danger">Eliminar Producto</button>         
            </div>
        </div>`
    });   
    //recorriendo el carrito, si esta vacio muestra mensaje
    if(carritoActualizado.length===0){
        modalBody.innerHTML=`
        <p class="text-center text-primary">El carrito esta vacio</p>`
    }
    //recorriendo el carrito para conocer la cantidad de productos
    CarritoTotal.textContent = carritoActualizado.length;

    //calculando el precio total a pagar de los productos
    precioTotal.innerText= divisa + carritoActualizado.reduce((acc,product) => acc + product.cantidad * product.price, 0);
    guardaLocalStorage();
}
     
    
/* 
procesarCompra.addEventListener('click',ValidarProductosComprados)
// variable para incrementar el valor total en el carrito
const CarritoTotal = document.querySelector('#CarritoTotal');
const formulario = document.querySelector('#procesar-pago');
//formulario.addEventListener('submit', EnviarPedido)

// evento que guarda la información cuando se recarga la página, buscando la informaciónen en el local storage en caso de no contener muestra vacío
document.addEventListener('DOMContentLoaded',() => {
    carrito = JSON.parse(localStorage.getItem('carrito')) || []; 
    mostrarCarrito();
})

// validando si oculta o no el modal
function ValidarProductosComprados(){
    if(carrito.length ===0){
        //agregando una alerta si el carrito esta vacio
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El carrito esta vacio!',
            color: '#000',
            background: '#fff',
            backdrop: `
              rgba(0,0,123,0.2)
              url("/assets/tarde-barry-allen.gif")
              left top
              no-repeat`,
              confirmButtonText:'Aceptar',
            footer: '<a href="./index.html">Agrega productos al carrito</a>'
          })
          
    }else {
            ProcesandoPedido();
    }
}


// llamando a la función vaciar carrito
botonVaciar.addEventListener('click',VaciarCarrito);
function VaciarCarrito() {
    carrito.length = [];
    mostrarCarrito();    
}

//agregando productos al carrito
function agregarProductoCarrito(carritoId) {

console.log('agregando producto al carrito',carritoId)
    //quitamos los productos duplicados e incrementamos la cantidad dentro del carrito
    const duplicado = carrito.some(product => product.id ===carritoId)
    if(duplicado){
        const product = carrito.map(product =>{
            if(product.id ===carritoId){
                product.cantidad ++;
            }
        })
    }else {
        //agregamos productos al carrito sino esta duplicado
        const item = products.find((product) => product.id === carritoId);
        carrito.push(item);
        Toastify({
            text: "producto agregado",
            duration: 3000,
            className: "info",
            style: {
              background: "linear-gradient(to right top, #05372a, #00633c, #289042, #62be39, #a8eb12)",
            }
          }).showToast();
    }

    mostrarCarrito();
}

//mostrando producto del carrito en el modal
const mostrarCarrito = () =>{
    const modalBody = document.querySelector('.modal .modal-body');
    modalBody.innerHTML="";
    carrito.forEach(product => {
        const {id, name,price, image,cantidad} = product
        modalBody.innerHTML +=`
        <div class="modal-contenedor">
            <div>
                <img class="img-fluid img-carrito" src="${image}">
            </div>
            <div>
                <p>Producto: ${name}</p>
                <p>Precio:  ${divisa} ${price}</p>
                <p>Cantidad: ${cantidad}</p>
                <button onclick="eliminarProductoCarrito(${id})" class= "btn btn-danger">Eliminar Producto</button>         
            </div>
        </div>`
    });   
    //recorriendo el carrito, si esta vacio muestra mensaje
    if(carrito.length===0){
        modalBody.innerHTML=`
        <p class="text-center text-primary">El carrito esta vacio</p>`
    }
    //recorriendo el carrito para conocer la cantidad de productos
    CarritoTotal.textContent = carrito.length;

    //calculando el precio total a pagar de los productos
    precioTotal.innerText= divisa + carrito.reduce((acc,product) => acc + product.cantidad * product.price, 0);
    guardaLocalStorage();
}

//eliminar productos del carrito
function eliminarProductoCarrito(id) {
    const quitarId = id;
   carrito = carrito.filter((quitar) => quitar.id !== quitarId);
    mostrarCarrito();
    
}

//guardando en el local storage los productos ingresados al carrito
function guardaLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

//cerrado el modal al procesar pedido


function ProcesandoPedido() {

    carrito.forEach((product)=>{
        const listCompra = document.querySelector('#lista-compra tbody');     
        const fila = document.createElement('row');
        const filaCompra   = document.createElement('tr')     
        const tdImg = document.createElement('td');
        tdImg.classList.add('img-fluid','img-carrito-pedido');
        const imgCompra =document.createElement('img')
        imgCompra.setAttribute('src',product.image);
        const tdNombre = document.createElement('td');
        tdNombre.innerText= product.name;
        const tdPrecio = document.createElement('td');
        tdPrecio.innerText= divisa + product.price;
        const tdCantidad = document.createElement('td');
        tdCantidad.innerText= product.cantidad;
        const tdSubTotal = document.createElement('td');
        tdSubTotal.innerText = divisa + product.cantidad*product.price ;

        tdImg.appendChild(imgCompra);    
        filaCompra.appendChild(tdImg);
        filaCompra.appendChild(tdNombre);
        filaCompra.appendChild(tdPrecio);
        filaCompra.appendChild(tdCantidad);
        filaCompra.appendChild(tdSubTotal);
        listCompra.appendChild(filaCompra);

    });
    totalCompra.innerText = divisa + carrito.reduce((acc,product) => acc + product.cantidad * product.price, 0);
    
    

    
} */