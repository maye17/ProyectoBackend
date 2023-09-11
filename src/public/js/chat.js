const socket =io();
//creando chat
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


/* CHAT */
//ocultando chat
const chatBoxOne = document.querySelector("#textchat");

chatBoxOne.addEventListener("keyup", (e) => {
  e.preventDefault()
 
  if (e.key == "Enter") {
    console.log("apretando",e.key)
    socket.emit("msg_front_to_back",{
      user: userName,
      message: chatBoxOne.value,
    });
    chatBoxOne.value = "";
  }
});




  //este si sirve dek CHAT
socket.on("listado_de_msgs", (msgs) => {
  const divMsgs = document.querySelector("#chat");
  let formato = "";
  msgs.forEach((msg) => {
    formato =
      formato +
      `<li class="other">
      <div id="avatar" class="avatar"><img id="imgAvatar" src="https://i.imgur.com/DY6gND0.png" draggable="false"/></div>
    <div class="msg">
       <p id="msg" class="msg-name">${msg.user}</p>    
      <p id="msg">${msg.message}</p>    
    </div>
 </li>  `;
  });
  divMsgs.innerHTML = formato;
});

