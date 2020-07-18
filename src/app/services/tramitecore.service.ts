import { Injectable } from '@angular/core';
import { TramiteCore } from '../models/tramitecore';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

const BACKEND_URL = environment.apiUrl + "/tramitecore";

@Injectable({
  providedIn: 'root'
})
export class TramiteCoreService {

  private _tramiteCore: TramiteCore[];
  private _tramiteCoreUpdated = new Subject<TramiteCore[]>();

  private _tramiteCoreByKey: TramiteCore;
  private _tramiteCoreByKeyUpdated = new Subject<TramiteCore>();

  private _tramiteCoreByID: TramiteCore;
  private _tramiteCoreByIDUpdated = new Subject<TramiteCore>();

  constructor(
    private http: HttpClient,
    private _router: Router
  ) {}

  /**
  * Obtiene los tramite cores desde BD
  */
  getTramiteCore(){
    
    this.http
      .get< {message: string, tramiteCores: any} >(BACKEND_URL)
      .pipe(
        map(tramiteCoreData => {
          return tramiteCoreData.tramiteCores.map(data => {
            return {
              id: data._id,
              key: data.key,
              titulo: data.titulo,
              numFases: data.numFases,
              fechaCreacion: data.fechaCreacion,
              fechaActualizacion: data.fechaActualizacion
            }
          });
        })
      )
      .subscribe( transformedTramiteCore => {
        this._tramiteCore = transformedTramiteCore;
        this._tramiteCoreUpdated.next([...this._tramiteCore]);
      });
  }

  /**
  * Retorna un observable de la información obtenida desde getTramiteCore
  */
  getTramiteCoreUpdateListener() {
    return this._tramiteCoreUpdated.asObservable();
  }

    /**
   * Obtiene el tramite por la key asignada en BD
   * @param key key necesario para obtener una referencia
   */
  getTramiteCoreByKey(key: string) {
    
    this.http
      .get<{ message:string, tramiteCore:any }>(`${BACKEND_URL}/${key.toUpperCase()}`)
      .pipe(
        map(tramiteCoreData => {
          return tramiteCoreData.tramiteCore.map(data => {
            return {
              id: data._id,
              key: data.key,
              titulo: data.titulo,
              numFases: data.numFases,
              fechaCreacion: data.fechaCreacion,
              fechaActualizacion: data.fechaActualizacion
            };
          });
        })
      )
      .subscribe( transformedTramiteCore => {
        this._tramiteCoreByKey = transformedTramiteCore;
        this._tramiteCoreByKeyUpdated.next(this._tramiteCoreByKey);
      })

  }
  /**
  * Retorna un observable de la información obtenida desde getTramiteCoreByKey
  */
  getTramiteCoreByKeyUpdateListener() {
    return this._tramiteCoreByKeyUpdated.asObservable();
  }

  /**
  * Obtiene el tramite por la id asignada en BD
  * @param id id del registro
  */
  getTramiteCoreByID(id: string) {
    
    this.http
      .get<{ message:string, tramiteCore:any }>(`${BACKEND_URL}/byID/${id}`)
      .pipe(
        map(tramiteCoreData => {
          return tramiteCoreData.tramiteCore.map(data => {
            return {
              id: data._id,
              key: data.key,
              titulo: data.titulo,
              numFases: data.numFases,
              fechaCreacion: data.fechaCreacion,
              fechaActualizacion: data.fechaActualizacion
            };
          });
        })
      )
      .subscribe( transformedTramiteCore => {
        this._tramiteCoreByID = transformedTramiteCore;
        this._tramiteCoreByIDUpdated.next(this._tramiteCoreByID);

      }, (err) => this.catchErrorScreen( err ))

  }

  /**
  * Retorna un observable de la información obtenida desde getTramiteCoreByID
  */
  getTramiteCoreByIDUpdateListener() {
    return this._tramiteCoreByIDUpdated.asObservable();
  }

  catchErrorScreen( err ) {
    if ( err ) {
      this._router.navigate(['404']);
    }
  }

}
