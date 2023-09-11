const bcrypt = require('bcrypt');

// Función para generar un hash de contraseña
async function hashPassword(password) {
  try {
    // Genera un hash de la contraseña
    const saltRounds = 10; // Número de rondas de hashing, cuanto mayor, más seguro pero más lento
    const hashedPassword = await bcrypt.hash(password, saltRounds);


    return hashedPassword;
  } catch (error) {
    console.error('Error al generar el hash de la contraseña:', error);
    throw error;
  }
}



module.exports = hashPassword;