import { Injectable } from '@angular/core';
import { TramiteProgreso } from '../models/tramiteprogreso';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + "/tramiteprogreso"

@Injectable({
  providedIn: 'root'
})
export class TramiteProgresoService {

  private _tramiteProgreso: TramiteProgreso[];
  private _tramiteProgresoUpdated = new Subject<TramiteProgreso[]>();

  private _tramiteByUserID: TramiteProgreso[];
  private _tramiteByUserIDUpdated =  new Subject<TramiteProgreso[]>();

  private _tramiteProgresoByUserCoreID: TramiteProgreso;
  private _tramiteProgresoByUserCoreIDUpdated = new Subject<TramiteProgreso>();

  constructor(
    private http: HttpClient
  ) { }

    /**
   * Obtiene los progresos de tramites desde BD
   */
  getTramiteProgreso(){
    
    this.http
      .get< {message: string, tramitesProgresos: any} >(BACKEND_URL)
      .pipe(
        map(tramiteProgresoData => {
          return tramiteProgresoData.tramitesProgresos.map(data => {
            return {
              id: data._id,
              tramiteCoreID: data.tramiteCoreID,
              userID: data.userID,
              estado: data.estado,
              fase: data.fase,
              opts: data.opts,
              fechaCreacion: data.fechaCreacion,
              fechaActualizacion: data.fechaActualizacion
            }
          });
        })
      )
      .subscribe( transformedTramiteProgreso => {
        this._tramiteProgreso = transformedTramiteProgreso;
        this._tramiteProgresoUpdated.next([...this._tramiteProgreso]);
      });
  }

  /**
  * Retorna un observable de la información obtenida desde getTramiteProgreso
  */
  getTramiteUpdateListener() {
    return this._tramiteProgresoUpdated.asObservable();
  }

  /**
  * Obtiene el progreso del tramite segun id de usuario y el tramite core
  * @param userID ID de usuario autenticado
  * @param tramiteCoreID tramite en curso
  */
  getTramiteByUserCoreID(userID: string, tramiteCoreID: string) {
    
    this.http
      .get<{ message:string, tramiteProgreso:any }>(`${BACKEND_URL}/byUserCoreID/${userID}/${tramiteCoreID}`)
      .pipe(
        map(tramiteProgresoData => {
          return tramiteProgresoData.tramiteProgreso.map(data => {
            return {
              id: data._id,
              tramiteCoreID: data.tramiteCoreID,
              userID: data.userID,
              estado: data.estado,
              fase: data.fase,
              opts: data.opts,
              fechaCreacion: data.fechaCreacion,
              fechaActualizacion: data.fechaActualizacion
            };
          });
        })
      )
      .subscribe( transformedTramiteProgreso => {
        this._tramiteProgresoByUserCoreID = transformedTramiteProgreso;
        this._tramiteProgresoByUserCoreIDUpdated.next(this._tramiteProgresoByUserCoreID);
      })

  }

  /**
  * Retorna un observable de la información obtenida desde getTramiteByUserCoreID
  */
  getTramiteByUserCoreIDUpdateListener() {
    return this._tramiteProgresoByUserCoreIDUpdated.asObservable();
  }

    /**
  * Obtiene el progreso del tramite segun id de usuario y el tramite core
  * @param userID ID de usuario autenticado
  * @param tramiteCoreID tramite en curso
  */
 getTramiteByUserID(userID: string) {
    
  this.http
    .get<{ message:string, tramiteProgresos:any }>(`${BACKEND_URL}/byUserID/${userID}`)
    .pipe(
      map(tramiteProgresoData => {
        return tramiteProgresoData.tramiteProgresos.map(data => {
          return {
            id: data._id,
            tramiteCoreID: data.tramiteCoreID,
            userID: data.userID,
            estado: data.estado,
            fase: data.fase,
            opts: data.opts,
            fechaCreacion: data.fechaCreacion,
            fechaActualizacion: data.fechaActualizacion
          };
        });
      })
    )
    .subscribe( transformedTramiteProgreso => {
      this._tramiteByUserID = transformedTramiteProgreso;
      this._tramiteByUserIDUpdated.next([...this._tramiteByUserID]);
    })

}

/**
* Retorna un observable de la información obtenida desde getTramiteByUserCoreID
*/
getTramiteByUserIDUpdateListener() {
  return this._tramiteByUserIDUpdated.asObservable();
}

  addTramiteProgreso(tramiteProgreso: TramiteProgreso) {

    let data = {
      tramiteCoreID: tramiteProgreso.tramiteCoreID,
      userID: tramiteProgreso.userID,
      estado: tramiteProgreso.estado,
      fase: tramiteProgreso.fase,
      opts: tramiteProgreso.opts
    }
    
    this.http
      .post< {message: string, tramitePost: TramiteProgreso} > (
        BACKEND_URL,
        data
      )
      .subscribe( responseData => {
        console.log(responseData.tramitePost);
      });
  }

  updateTramiteProgreso(tramiteProgreso: TramiteProgreso) {

    const ID = tramiteProgreso.id;

    this.http
      .put( `${BACKEND_URL}/${ID}`, tramiteProgreso)
      .subscribe( response => {
        console.log( response )
      });
  }

  deleteTramiteProgresoTesting(idUser: string) {

    const ID = idUser
    console.log(ID)

    this.http.delete(`${BACKEND_URL}/byIdUser/${ID}`)
    .subscribe (response => {
      console.log( response )
    });
  }

}
