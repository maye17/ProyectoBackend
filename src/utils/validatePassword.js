const bcrypt = require('bcrypt');


 function validatePassword(password, hashedPassword) {
  try {
      const match =  bcrypt.compareSync(password, hashedPassword);
      return match;
  } catch (error) {
    //  console.error('Error al validar la contraseña:', error);
      throw error;
  }
  }


module.exports = validatePassword;

