const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

// Define la ruta base para los directorios
const baseDir = __dirname;

// Define la ruta al directorio de apidocs
const apiDocsPath = path.join(baseDir, 'docs');

// Lee el archivo products.yaml
const productsYAML = path.join(apiDocsPath, 'products', 'products.yaml')


const cartsYAML = path.join(apiDocsPath, 'carts', 'carts.yaml')

const options = {
  swaggerDefinition: {
    info: {
      title: 'API de Ejemplo',
      version: '1.0.0',
      description: 'Documentación de la API de Ejemplo con Swagger',
    },
  },
  apis: [
     cartsYAML,
     productsYAML
  ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;



