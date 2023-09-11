const express = require ("express");
const mensaggeService = require('../services/message.service')
const MesaggeService = new mensaggeService();


const chatRouter = express.Router();  
chatRouter.get('/', async (req, res) => {
    try {

        return res.render('chat', {})
    } catch (error) {
        throw "Don't see of chat"
    }
    
})

/* 
chatRouter.post('/', async(req,res)=>{
    try {

        const mesaggeData =req.body;
        const createdChat = await MesaggeService.addMesagge(mesaggeData);
        return res.status(200).json({
            status:'success',
            msg:'mensaje creado',
            payload:createdChat
        })

    } catch (error) {
        throw error
    }
})
 */

chatRouter.post('/', async(req,res)=>{
    try {

        const {user, message} = req.body;
        const createdChat = await MesaggeService.addMesagge({user, message});
        return res.status(200).json({
            status:'success',
            msg:'mensaje creado',
            payload:createdChat
        })

    } catch (error) {
        throw error
    }
}
)


module.exports = chatRouter;