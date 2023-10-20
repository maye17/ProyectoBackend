
//removiendo contenido no necesario
const fs = require ("fs");


class UserSessionDTO {
    constructor(user) {
    if(user){
        this.firstName = user.firstName;
        this.lastName  = user.lastName ;
        this.password=user.password;
        this.email =user.email; 
        this.isAdmin =false;
        this.profile = 'user';
    } 
     
    }
  }
  
  module.exports = UserSessionDTO;