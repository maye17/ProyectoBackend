const bcrypt = require('bcrypt');

async function validatePassword(password, hashedPassword) {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        console.error('Error al validar la contraseña:', error);
        throw error;
    }
    }

module.exports = validatePassword;


const crypto = require('crypto');

function createHash() {
    try {
        const hash = crypto.randomBytes(20).toString('hex');
        return hash;
    } catch (error) {
        console.error('Error al generar el hash:', error);
        throw error;
    }
    }

module.exports = createHash;
