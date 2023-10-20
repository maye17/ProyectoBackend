//removiendo contenido no necesario

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
  
  module.export = UserSessionDTO;