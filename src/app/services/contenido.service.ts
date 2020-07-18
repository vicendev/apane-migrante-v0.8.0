import { Injectable } from '@angular/core';
import { Contenido } from '../models/contenido';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + "/contenido"

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {

  private _contenido: Contenido[];
  private _contenidoUpdated = new Subject<Contenido[]>();

  private _contenidoByMenuID: Contenido;
  private _contenidoByMenuIDUpdated = new Subject<Contenido>();

  constructor(
    private http: HttpClient
  ) {
    this._contenido = [];
  }

  /**
   * Obtiene los contenidos desde BD
   */
  getContenido(){
    this.http
      .get< {message: string, contenidos: any} >(BACKEND_URL)
      .pipe(
        map(contenidoData => {
          return contenidoData.contenidos.map(data => {
            return {
              id: data._id,
              key: data.key,
              menuID: data.menuID,
              titulo: data.titulo,
              fechaCreacion: data.fechaCreacion,
              fechaActualizacion: data.fechaActualizacion
            };
          });
        })
      )
      .subscribe( transformedContenido => {
        this._contenido = transformedContenido;
        this._contenidoUpdated.next([...this._contenido]);
      });
  }

  /**
   * Retorna un observable de la informacion obtenida desde getContenido
   */
  getContenidoUpdateListener() {
    return this._contenidoUpdated.asObservable();
  }

  /**
   * Obtiene el contenido segun el ID menu
   * @param menuID id de menu seleccionado
   */
  getContenidoByMenuID(menuID: string) {

    this.http
      .get< {message:string, contenido:any} >(`${BACKEND_URL}/${menuID}`)
      .pipe(
        map(contenidoData => {
          return contenidoData.contenido.map(data => {
            return {
              id: data._id,
              key: data.key,
              menuID: data.menuID,
              titulo: data.titulo,
              fechaCreacion: data.fechaCreacion,
              fechaActualizacion: data.fechaActualizacion
            };
          });
        })
      )
      .subscribe( transformedContenido => {
        this._contenidoByMenuID = transformedContenido;
        this._contenidoByMenuIDUpdated.next(this._contenidoByMenuID);
      });
  }

  /**
   * Retorna un observable de la informacion obtenida desde getContenidoByMenuID
   */
  getContenidoByMenuIDUpdateListener() {
    return this._contenidoByMenuIDUpdated.asObservable();
  }

}
