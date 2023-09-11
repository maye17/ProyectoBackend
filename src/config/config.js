const path = require('path');
const { program } = require('commander');
const dotenv = require('dotenv');



program.option('--mode <mode>','Modo de trabajo', 'DEVELOPMENT');
//program.option("-d", "Variables para debug", false)
program.parse();

const envFilePath = program.opts().mode === 'DEVELOPMENT' ? './.env.development' : './.env.production';
console.log('Ruta completa del archivo .env:', path.resolve(__dirname, envFilePath));

dotenv.config({ path: envFilePath });

const config = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  adminName: process.env.ADMIN_NAME,
  adminPassword: process.env.ADMIN_PASSWORD,
  persistence: process.env.PERSISTENCE,
  ttl: process.env.TTL,
  secret:process.env.SECRET,
  resave:process.env.RESAVE,
  saveUninitialized:process.env.SAVEUNINITIALIZED,
  googleEmail: process.env.GOOGLE_EMAIL,
  googlePass: process.env.GOOGLE_PASS
};

console.log('Valor de PORT:', config.port);
console.log('Valor de MONGO_URL:', config.mongoUrl);
console.log('Valor de ADMIN_NAME:', config.adminName);
console.log('Valor de ADMIN_PASSWORD:', config.adminPassword);

module.exports = config;
