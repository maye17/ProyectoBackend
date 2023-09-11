const messageModel = require("../models/mongoose/messages.model.js");


class MesaggeService {

    async getMessage (){
        try {
            
            const dataMessage = await messageModel.find({})
            return dataMessage

        } catch (error) {
            
        }
    }

    async addMesagge (mesaggeData){
        try {
          const message = await messageModel.create(mesaggeData);
            console.log("probando si se guarda",message)
            return message;
      
        } catch (error) {
            throw error;
        }

    }
}


module.exports = MesaggeService;
