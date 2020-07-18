import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TramiteProgresoService } from '../../../../services/tramiteprogreso.service';
import { UtilsService } from '../../../../services/utils.service';
import { Subscription } from 'rxjs';
import { TramiteProgreso } from '../../../../models/tramiteprogreso';


@Component({
  selector: 'app-profile-activity',
  templateUrl: './profile-activity.component.html',
  styleUrls: ['./profile-activity.component.css']
})
export class ProfileActivityComponent implements OnInit {

  //@ViewChild("modal_ver", {static:false}) modal_ver

  private _token: any;
  private _userID: string;
  private _tramiteByUserIDSub: Subscription;

  public tramiteProgreso_CONSULTADO: TramiteProgreso[];
  public tramiteProgreso_PROCESO: TramiteProgreso[];
  public tramiteProgreso_FINALIZADO: TramiteProgreso[];

  constructor(
    private _tramiteProgresoService: TramiteProgresoService,
    private _utils: UtilsService
  ) {

    this.tramiteProgreso_CONSULTADO = this.tramiteProgreso_CONSULTADO;
    this.tramiteProgreso_PROCESO = this.tramiteProgreso_PROCESO;
    this.tramiteProgreso_FINALIZADO = this.tramiteProgreso_FINALIZADO;

   }

  ngOnInit() {
    this._token = this._utils.obtenerDataUsuario()
    this._userID = this._token.usuario._id;

    this.cargarContadorActividades(this._userID)
  }

  cargarContadorActividades(userID: string) {
  
    this._tramiteProgresoService.getTramiteByUserID(userID);
    this._tramiteByUserIDSub = this._tramiteProgresoService.getTramiteByUserIDUpdateListener()
      .subscribe( (tramiteProgreso: TramiteProgreso[]) => {

        this.tramiteProgreso_CONSULTADO = tramiteProgreso.filter(data => data.estado === 'CONSULTADO');
        this.tramiteProgreso_PROCESO = tramiteProgreso.filter(data => data.estado === 'PROCESO');
        this.tramiteProgreso_FINALIZADO = tramiteProgreso.filter(data => data.estado === 'FINALIZADO');

      })

  }

  // verModal() {
  //   this._modalService.open(this.modal_ver);
  // }

}
