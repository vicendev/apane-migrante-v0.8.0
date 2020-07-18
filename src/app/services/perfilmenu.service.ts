import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PerfilMenu } from '../models/perfilmenu';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + "/perfilmenu";


@Injectable({
  providedIn: 'root'
})
export class PerfilMenuService {

  private _perfilMenu: PerfilMenu[];
  private _perfilMenuUpdated = new Subject<PerfilMenu[]>();

  constructor(
    private http: HttpClient
  ) {
    this._perfilMenu = [];
   }

     /**
   * Obtiene los menus de perfil desde BD
   */
  getPerfilMenu(){
    
    this.http
      .get< {message: string, perfilMenus: any} >(BACKEND_URL)
      .pipe(
        map(perfilMenuData => {
          return perfilMenuData.perfilMenus.map(data => {
            return {
              id: data._id,
              titulo: data.titulo,
              fechaCreacion: data.fechaCreacion,
              fechaActualizacion: data.fechaActualizacion
            }
          });
        })
      )
      .subscribe( transformedPerfilMenu => {
        this._perfilMenu = transformedPerfilMenu;
        this._perfilMenuUpdated.next([...this._perfilMenu]);
      });
  }

  /**
  * Retorna un observable de la información obtenida desde getPerfilMenu
  */
  getPerfilMenuUpdateListener() {
    return this._perfilMenuUpdated.asObservable();
  }

}
