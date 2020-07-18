/**
 * Puerto "heroku"
*/
process.env.PORT = process.env.PORT || 3000;

/**
 * Entorno "heroku"
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

/**
 * Vencimiento del Token
 */
process.env.CADUCIDAD_TOKEN = '48hrs';

/**
 * SEED de autenticación "heroku"
 */
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

/**
 * Base de datos
 */

 if (process.env.NODE_ENV === 'dev') {
     urlDB = 'mongodb://localhost:27017/migrantedev'
 } else {
     urlDB = process.env.MONGO_URI;
 }
 process.env.URLDB = urlDB

 /**
  * Google Client ID
  */
 process.env.CLIENT_ID = process.env.CLIENT_ID || '761492868757-vdko950dp3t3m6iqn52opcarck4p0o5m.apps.googleusercontent.com';