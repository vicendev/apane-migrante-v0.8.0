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
process.env.CADUCIDAD_TOKEN_INVITADO = '8hrs';

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
 process.env.CLIENT_GOOGLE_ID = process.env.CLIENT_ID || '761492868757-vdko950dp3t3m6iqn52opcarck4p0o5m.apps.googleusercontent.com';

 /**
  * Facebook Client Data
  */
 process.env.CLIENT_FB_ID = process.env.FB_CLIENT_ID || '690323478217593'
 process.env.CLIENT_FB_SECRET = process.env.FB_CLIENT_SECRET || '8ba58e3c0f4271d12fb6f2eb2f742e91'
 