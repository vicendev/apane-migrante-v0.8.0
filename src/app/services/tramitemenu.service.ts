import { Injectable } from '@angular/core';
import { TramiteMenu } from '../models/tramitemenu';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + "/tramitemenu"

@Injectable({
  providedIn: 'root'
})
export class TramiteMenuService {

  private _tramiteMenuByMenuID: TramiteMenu[];
  private _tramiteMenuByMenuIDUpdated = new Subject<TramiteMenu[]>();

  private _firstTramiteMenuByMenuID: TramiteMenu;
  private _firstTramiteMenuByMenuIDUpdated = new Subject<TramiteMenu>();

  constructor(
    private http: HttpClient
  ) {
    this._tramiteMenuByMenuID = [];
  }

  /**
   * Obtiene una lista de Menu segun el ID padre
   * @param menuID ID del menu padre
   */
  getTramiteMenuByMenuID(menuID: string) {

    this.http
      .get< {message: string, tramiteMenus: any} >(`${BACKEND_URL}/${menuID}`)
      .pipe(
        map(tramiteMenuData => {
          return tramiteMenuData.tramiteMenus.map(data => {
            return {
              id: data._id,
              titulo: data.titulo,
              menuID: data.menuID,
              submenu: data.submenu,
              fechaCreacion: data.fechaCreacion,
              fechaActualizacion: data.fechaActualizacion
            };
          });
        })
      )
      .subscribe( transformedTramiteMenu => {
        this._tramiteMenuByMenuID = transformedTramiteMenu;
        this._tramiteMenuByMenuIDUpdated.next([...this._tramiteMenuByMenuID]);
      })
  }

  /**
  * Retorna un observable de la información obtenida desde getTramiteMenuByMenuID
  */
  getTramiteMenuByMenuIDListener() {
    return this._tramiteMenuByMenuIDUpdated.asObservable();
  }

  /**
  * Obtiene primer item de Menu segun el ID padre
  * @param menuID ID del menu padre
  */
  getFirstTramiteMenuByMenuID(menuID: string) {

    this.http
      .get< {message: string, tramiteMenu: any} >(`${BACKEND_URL}/firstItem/${menuID}`)
      .pipe(
        map(tramiteMenuData => {
          let data = tramiteMenuData.tramiteMenu;
          return {
            id: data._id,
              titulo: data.titulo,
              menuID: data.menuID,
              submenu: data.submenu,
              fechaCreacion: data.fechaCreacion,
              fechaActualizacion: data.fechaActualizacion
          }
        })
      )
      .subscribe( transformedFirstTramiteMenu => {
        this._firstTramiteMenuByMenuID = transformedFirstTramiteMenu;
        this._firstTramiteMenuByMenuIDUpdated.next(this._firstTramiteMenuByMenuID);
      })
  }

  /**
  * Retorna un observable de la información obtenida desde getFirstTramiteMenuByMenuID
  */
 getFirstTramiteMenuByMenuIDListener() {
  return this._firstTramiteMenuByMenuIDUpdated.asObservable();
}

}
