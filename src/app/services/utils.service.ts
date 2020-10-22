import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { SidebarService } from './sidebar.service';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private _sidebarService: SidebarService
  ) { }

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

  /**
   * Retorna un booleando para saber si la pantalla es de mobil o escritorio
   */
  obtenerPantallaMobil(): boolean {
    const minMobileWidth = 992;

    let mobileScreen = window.innerWidth < minMobileWidth;

    return mobileScreen;
  }

  /**
   * Abrir el componente sidebar
   * @param id id del sidebar component
   */
  abrirSideBarMenu (id: string){
    this._sidebarService.open(id);
  }

  /**
   * Cerrar el componente sidebar
   * @param id id del sidebar component
   */
  cerrarSideBarMenu (id: string) {
    this._sidebarService.close(id);
  }


}
