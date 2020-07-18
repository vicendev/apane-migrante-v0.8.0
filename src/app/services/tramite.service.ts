import { Injectable } from '@angular/core';
import { Tramite } from '../models/tramite';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl + "/tramite"

@Injectable({
  providedIn: 'root'
})
export class TramiteService {

  private _tramite: Tramite[];
  private _tramiteUpdated = new Subject<Tramite[]>();

  private _tramiteByKey: Tramite;
  private _tramiteByKeyUpdated = new Subject<Tramite>();
  
  constructor(
    private http: HttpClient
  ) {
    this._tramite = [];
  }

  /**
   * Obtiene los tramites desde BD
   */
  getTramite(){
    
    this.http
      .get< {message: string, tramites: any} >(BACKEND_URL)
      .pipe(
        map(tramiteData => {
          return tramiteData.tramites.map(data => {
            return {
              id: data._id,
              key: data.key,
              titulo: data.titulo,
              descripcion: data.descripcion,
              fechaCreacion: data.fechaCreacion,
              fechaActualizacion: data.fechaActualizacion
            }
          });
        })
      )
      .subscribe( transformedTramite => {
        this._tramite = transformedTramite;
        this._tramiteUpdated.next([...this._tramite]);
      });
  }

  /**
  * Retorna un observable de la información obtenida desde getTramite
  */
  getTramiteUpdateListener() {
    return this._tramiteUpdated.asObservable();
  }

  /**
   * Obtiene el tramite por la key asignada en BD
   * @param key key necesario para obtener una referencia
   */
  getTramiteByKey(key: string) {
    
    this.http
      .get<{ message:string, tramite:any }>(`${BACKEND_URL}/${key.toUpperCase()}`)
      .pipe(
        map(tramiteData => {
          return tramiteData.tramite.map(data => {
            return {
              id: data._id,
              key: data.key,
              titulo: data.titulo,
              descripcion: data.descripcion,
              fechaCreacion: data.fechaCreacion,
              fechaActualizacion: data.fechaActualizacion
            };
          });
        })
      )
      .subscribe( transformedTramite => {
        this._tramiteByKey = transformedTramite;
        this._tramiteByKeyUpdated.next(this._tramiteByKey);
      })

  }
  /**
  * Retorna un observable de la información obtenida desde getTramiteByKey
  */
  getTramiteByKeyUpdateListener() {
    return this._tramiteByKeyUpdated.asObservable();
  }

  /**
  * Agrega un tramite a base de datos
  * @param tramite Objeto tramite con sus propiedades
  */
  addTramite(tramite: Tramite) {
    const tramiteData = new FormData();
    tramiteData.append("key", tramite.key);
    tramiteData.append("titulo", tramite.titulo);
    tramiteData.append("descripcion", tramite.descripcion);
    tramiteData.append("fechaCreacion", '');
    tramiteData.append("fechaActualizacion", '');

    this.http
      .post< {message: string, tramitePost: Tramite} > (
        BACKEND_URL,
        tramiteData
      )
      .subscribe( responseData => {
        console.log(responseData.tramitePost);
      });
  }

}
