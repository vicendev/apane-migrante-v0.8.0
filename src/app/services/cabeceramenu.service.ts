import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CabeceraMenu } from '../models/cabeceramenu';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl + "/cabeceramenu"

@Injectable({
  providedIn: 'root'
})
export class CabeceraMenuService {

  private _cabeceraMenuByMenuID: CabeceraMenu;
  private _cabeceraMenuByMenuIDUpdated = new Subject<CabeceraMenu>();

  constructor(
    private http: HttpClient
  ) { } 

  /**
   * Obtiene un registro de cabecera menu DB
   * @param menuID Menu id padre
   */
  getCabeceraMenuByMenuID(menuID: string) {

    this.http
      .get< { message:string, cabeceraMenu: any} >(`${BACKEND_URL}/${menuID}`)
      .pipe(
        map(cabeceraMenuData => {
          return cabeceraMenuData.cabeceraMenu.map(data => {
            return {
              id: data._id,
              titulo: data.titulo,
              menuID: data.menuID,
              imgPath: data.imgPath,
              iconPath: data.iconPath,
              fechaCreacion: data.fechaCreacion,
              fechaActualizacion: data.fechaActualizacion
            };
          });
        })
      )
      .subscribe( transformedCabeceraMenu => {
        this._cabeceraMenuByMenuID = transformedCabeceraMenu;
        this._cabeceraMenuByMenuIDUpdated.next(this._cabeceraMenuByMenuID);
      })
  }

  /**
  * Retorna un observable de la información obtenida desde getCabeceraMenuByMenuID
  */
  getCabeceraMenuByMenuIDUpdateListener() {
    return this._cabeceraMenuByMenuIDUpdated.asObservable();
  }

  addCabeceraMenu(titulo, menuID, image: File, icon: File){
    const cabeceraMenuData = new FormData();
    cabeceraMenuData.append("titulo", titulo);
    cabeceraMenuData.append("menuID", menuID);
    cabeceraMenuData.append("image", image, image.name);
    cabeceraMenuData.append('icon', icon, icon.name);
    this.http
      .post< { ok: boolean, cabeceraMenuPost: any } >(
        BACKEND_URL,
        cabeceraMenuData
      )
      .subscribe(responseData => {
        console.log(responseData.ok);
      })
  }



}
