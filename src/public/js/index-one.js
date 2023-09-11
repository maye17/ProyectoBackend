const socket =io();

let userName = "";
async function main() {
  const { value: nombre } = await  Swal.fire({
    title: "Enter your name",
    input: "text",
    inputLabel: "Your name",
    inputValue: "",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "You need to write something!";
      }
    },
  });
    userName = nombre;

}




main();

const chatBoxOne = document.querySelector("#textchat");

chatBoxOne.addEventListener("keyup", (e) => {
  e.preventDefault()
 
  if (e.key == "Enter") {
    console.log("apretando",e.key)
    socket.emit("msg_front_to_back",{
      user: userName,
      msg: chatBoxOne.value,
    });
    chatBoxOne.value = "";
  }
});

socket.on("listado_de_msgs", (messages) => {
    console.log(JSON.stringify({messages})); 
    const chating = document.querySelector("#chat");
    let formato = "";
    messages.forEach((message) => {
      formato =
        formato +
        `<li class="other">
           <div id="avatar" class="avatar"><img id="imgAvatar" src="https://i.imgur.com/DY6gND0.png" draggable="false"/></div>
         <div class="msg">
            <p id="msg" class="msg-name">${message.user}</p>    
           <p id="msg">${message.msg}</p>    
         </div>
      </li>  `;
    });
    chating.innerHTML = formato;
  
  });
  

  
/* const btnDelete = document.querySelector(".delete-button");


if (btnDelete instanceof NodeList) {
  btnDelete.forEach((button) => {
    button.addEventListener('click', () => {
    const productId = button.getAttribute('id');
    deleteProduct(productId);
    })
  });
} else {
  console.log('no se encontraron bottones')
}

const deleteProduct = (productId) => {
  socket.emit('deleteProducts', productId)
  console.log('click')
};


// Escuchar la respuesta del backend y manejar la eliminación en el frontend
socket.on('deleteProducts', deleteProducts => {
  console.log('Producto eliminado:', deleteProducts);
  // Realizar acciones adicionales después de la eliminación en el frontend
  toast.error('Producto eliminado!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    })
});

 */
//inicio sesión

/* const login = document.querySelector('#ingresar');
const logout = document.querySelector('#logout');


function iniciarSesion() {
  console.log('click');
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const user = {
      email: email,
      password: password
  }

  fetch('/auth/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
  })
      .then(res => res.json())
      .then(data => {
          console.log(data);
          if (data.status === 'ok') {
              window.location.href = '/';
          } else {
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...', 
                  text: 'Usuario o contraseña incorrectos!',
                  footer: '<a href>Why do I have this issue?</a>'
                })
          }
      })
      .catch(err => console.log(err));
}


login.addEventListener('click', iniciarSesion); */


/* // Evento clic en el botón de colapsar/expandir
collapseBtn.addEventListener('click', toggleChatWindow);

// Evento clic en el botón de cerrar
closeBtn.addEventListener('click', toggleChatWindow); */

// Evento clic en el botón de enviar
/* sendBtn.addEventListener('click', () => {
  const message = messageInput.value;
  addMessage(message);
  messageInput.value = '';
}); */

// Simulación de mensajes recibidos
/* setTimeout(() => {
  addMessage('¡Hola!');
}, 1000);

setTimeout(() => {
  addMessage('¿En qué puedo ayudarte?');
}, 2000);
 */
   /* chat colapse */
/*    const btnChatPrincipal = document.querySelector("#btn-chat")

   const collapseBtn = document.querySelector('#collapse-btn'); */
   //llamado al chat en página pricinpal
/* 
const openChat = (e)=>{
    e.preventDefault();
    console.log("probando ingresar al chat");
    window.open('chat','_self' )
    }
    
    if(btnChatPrincipal){
      btnChatPrincipal.addEventListener('click', openChat)
    
    }
    
    
//chat en principal
const chatWindow = document.getElementById('chat-window');
const closeBtn = document.getElementById('close-btn');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const chatMessages = document.getElementById('chat-messages');

// Función para mostrar u ocultar la ventana emergente del chat
function toggleChatWindow() {
  chatWindow.classList.toggle('show');
}

// Función para agregar un mensaje al chat
function ShowMessage(message) {
  const li = document.createElement('li');
  li.textContent = message;
  chatMessages.appendChild(li);
}

    */

