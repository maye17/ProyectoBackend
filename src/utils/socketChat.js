//@ts-check
const {Server} = require("socket.io");
const messageService = require("../services/message.service.js");
const serviceMessage = new messageService();

const ProductService = require("../services/product.api.service.js");
const messagesModel = require("../models/mongoose/messages.model.js");
const productos = new ProductService();



const socketConnectChat = (httpServer) => {

    /*     let msgs =[];
     */
    const socketServer= new Server(httpServer);
    socketServer.on("connection", (socket)=>{
        console.log("se abrio un canal de socket" + socket.id);
        
    

        socket.on("new-message", async (messages)=>{

            try{
        
               await serviceMessage.addMesagge({...messages});
               const msgs = await serviceMessage.getMessage();
               console.log(msgs)
               socketServer.emit('message',msgs)
        
               } catch (error) {
                throw error   
               }
        
            })

/* socket.on("msg_front_to_back", (msg) => {

    console.log(msg);
    msgs.unshift(msg);
    socketServer.emit("msg_back_to_front", msgs)
 }); 
 */
    })
}    

module. exports = socketConnectChat;