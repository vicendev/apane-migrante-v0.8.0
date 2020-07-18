import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  /**
  * Obtiene token con informacion de la sesión del usuario
  */
  obtenerDataUsuario() {
    if (localStorage.getItem('token') != null) {
      return jwt_decode(localStorage.getItem('token'));
    }
  }

  /**
   * Desestructura el token para obtener data
   * @param token token de sesión
   */
  desestructurarObjetoToken(token: any): any {
    
    const { email, estado, facebook, google, img, nombre, role, _id} = token.usuario;

    let usuario = {
      email,
      estado,
      facebook,
      google,
      img,
      nombre,
      role,
      _id
    }

    return usuario;

  }
}
