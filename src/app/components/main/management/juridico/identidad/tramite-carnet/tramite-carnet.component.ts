import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TramiteCoreService } from '../../../../../../services/tramitecore.service';
import { Subscription } from 'rxjs';
import { TramiteCore } from '../../../../../../models/tramitecore';
import { TramiteProgreso } from '../../../../../../models/tramiteprogreso';
import { TramiteProgresoService } from '../../../../../../services/tramiteprogreso.service';

import Swal from 'sweetalert2'
import { UtilsService } from '../../../../../../services/utils.service';
import { TranslateService } from '../../../../../../services/translate.service';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success mr-2',
    cancelButton: 'btn btn-danger mr-2'
  },
  buttonsStyling: false
})

@Component({
  selector: 'app-tramite-carnet',
  templateUrl: './tramite-carnet.component.html',
  styleUrls: ['./tramite-carnet.component.css']
})
export class TramiteCarnetComponent implements OnInit {

  // CheckBox fase dos Controls
  checkValues: any;
  checkDisabled: any;

  private _tramiteCoreByIDSub: Subscription;
  private _tramiteProgresoUserCoreIDSub: Subscription;
  private _tramiteProgreso: TramiteProgreso;
  private _token: any;
  private _userID: any;
  private _titleState: any;

  private _updateProgreso: any;
  public radioValue: string;

  public dataProgreso: any;
  public radioOpts: any;

  constructor(
    private _activateRoute: ActivatedRoute,
    private _tramiteCoreService: TramiteCoreService,
    private _tramiteProgresoService: TramiteProgresoService,
    private _translateService: TranslateService,
    private _utils: UtilsService
  ) {

    this.radioOpts = {
      opt1: 'primera_solicitud',
      opt2: 'visa_temporaria',
      opt3: 'permanencia_definitiva',
      opt4: 'visa_dependiente'
    }

    this.dataProgreso = {
      numFases: 0,
      fase: 1,
      titulo: '',
      progreso: 0,
      optFaseUno: {faseUno:''},
    }

    this.checkValues = {
      check_1: false,
      check_2: false,
      check_3: false,
      check_4: false
    }

    this.checkDisabled = {
      disCheck_1: false,
      disCheck_2: false,
      disCheck_3: false,
      disCheck_4: false,
    }

    this._titleState = {
      documentacion: this._translateService.getTranslate('label.tramite.core.carnet.titulo.documentacion'),
      ejecucion: this._translateService.getTranslate('label.tramite.core.carnet.titulo.ejecucion')
    }

    this._updateProgreso = this._tramiteProgreso;

   }

  ngOnInit() {

    const ID = this._activateRoute.snapshot.params.id;
    
    this._token = this._utils.obtenerDataUsuario();
    this._userID = this._token.usuario._id;
    this.obtenerTramiteCoreCarnet(ID);

  }

  obtenerTramiteCoreCarnet(id: string) {

    this._tramiteCoreService.getTramiteCoreByID(id);
    this._tramiteCoreByIDSub = this._tramiteCoreService.getTramiteCoreByIDUpdateListener()
      .subscribe( (tramiteCore: TramiteCore) => {      
        this.dataProgreso.numFases = tramiteCore[0].numFases;
        this.obtenerProgresoUsuario(tramiteCore[0].id)        
      })

  }

  obtenerProgresoUsuario(tramiteCoreID: string){

    this._tramiteProgresoService.getTramiteByUserCoreID(this._userID, tramiteCoreID);
    this._tramiteProgresoUserCoreIDSub = this._tramiteProgresoService.getTramiteByUserCoreIDUpdateListener()
      .subscribe( (tramiteProgreso: TramiteProgreso) => {

        if(!tramiteProgreso[0]) {
          this._tramiteProgreso = new TramiteProgreso({
            id: '',
            tramiteCoreID: tramiteCoreID,
            userID: this._userID,
            estado: 'PROCESO',
            fase: 1,
            opts: [],
            fechaCreacion: '',
            fechaActualizacion: ''
          })
          this._tramiteProgresoService.addTramiteProgreso(this._tramiteProgreso);
          this._tramiteCoreByIDSub.unsubscribe();
          this._tramiteProgresoUserCoreIDSub.unsubscribe();
          this.obtenerProgresoUsuario(tramiteCoreID);
        } else {
          this._tramiteProgreso = tramiteProgreso[0];
          
          this.dataProgreso.fase = this._tramiteProgreso.fase;
          this.dataProgreso.titulo = this._tramiteProgreso.fase <= 2 ? this._titleState.documentacion : this._titleState.ejecucion;
          this.dataProgreso.progreso = (this._tramiteProgreso.fase / this.dataProgreso.numFases) * 100;

          if (this._tramiteProgreso.opts[0]) {
            this.dataProgreso.optFaseUno = this._tramiteProgreso.opts[0]
            this.radioValue = this.dataProgreso.optFaseUno.faseUno;
          }

          if (this._tramiteProgreso.opts[1]) {
            this.checkValues = this._tramiteProgreso.opts[1].faseDos[0].checkeds
            this.checkDisabled = this._tramiteProgreso.opts[1].faseDos[0].disableds
          }

          // HACER PANTALLA DE CARGA E INGRESARLA AQUÍ
          //-----------------------------------------

          this._updateProgreso = this._tramiteProgreso;
        }

      })
  }
  
  siguiente(opt: any) {

    this._updateProgreso.fase += 1;

    if (this._updateProgreso.fase === 6) {
      this._updateProgreso.estado = 'FINALIZADO'
    }

    if (opt != '' && this.dataProgreso.fase === 1) {
      this._updateProgreso.opts.push({faseUno:opt})
    }

    this._tramiteProgresoService.updateTramiteProgreso(this._updateProgreso);

    this.dataProgreso.fase = this._updateProgreso.fase;
    this.dataProgreso.titulo = this._updateProgreso.fase <= 2 ? this._titleState.documentacion : this._titleState.ejecucion;
    this.dataProgreso.progreso = (this._updateProgreso.fase / this.dataProgreso.numFases) * 100;

  }

  faseDosCheckBoxHandler(check) {

    if(check.name === 'check_1') this.mostrarModalCheck(check);

    if(check.name === 'check_2') this.mostrarModalCheck(check);

    if(check.name === 'check_3') this.mostrarModalCheck(check);

    if(check.name === 'check_4') this.mostrarModalCheck(check);

    
  }

  mostrarModalCheck(check: any) {

    swalWithBootstrapButtons.fire({
      title: this._translateService.getTranslate('label.tramite.core.carnet.fase.dos.modal.titulo'),
      text: this._translateService.getTranslate('label.tramite.core.carnet.fase.dos.modal.parrafo'),
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonText: this._translateService.getTranslate('label.tramite.core.carnet.fase.dos.modal.boton.confirmar'),
      cancelButtonText: this._translateService.getTranslate('label.tramite.core.carnet.fase.dos.modal.boton.rechazar'),
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        // Mensaje a mostrar
        swalWithBootstrapButtons.fire(
          this._translateService.getTranslate('label.tramite.core.carnet.fase.dos.modal.confirmar.titulo'),
          this._translateService.getTranslate('label.tramite.core.carnet.fase.dos.modal.confirmar.parrafo'),
          'success'
        )

        // Evaluar el check que se va a deshabilitar
        if (check.name === 'check_1') this.checkDisabled.disCheck_1 = true;
        if (check.name === 'check_2') this.checkDisabled.disCheck_2 = true;
        if (check.name === 'check_3') this.checkDisabled.disCheck_3 = true;
        if (check.name === 'check_4') this.checkDisabled.disCheck_4 = true;

        // Guardar el dato si es primer update de la opción
        if (this.dataProgreso.fase === 2 && this._updateProgreso.opts.length < 2) {
          this._updateProgreso.opts.push({
            faseDos:[{
              checkeds: this.checkValues,
              disableds: this.checkDisabled
            }]
          })

          // Actualizar estado de la fase 2
          this._tramiteProgresoService.updateTramiteProgreso(this._updateProgreso);

        } else {
          this._updateProgreso.opts[1].faseDos[0].checkeds = this.checkValues
          this._updateProgreso.opts[1].faseDos[0].disableds = this.checkDisabled
          
          // Actualizar estado de la fase 2
          this._tramiteProgresoService.updateTramiteProgreso(this._updateProgreso);
        }

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {

        swalWithBootstrapButtons.fire(
          this._translateService.getTranslate('label.tramite.core.carnet.fase.dos.modal.rechazar.titulo'),
          this._translateService.getTranslate('label.tramite.core.carnet.fase.dos.modal.rechazar.parrafo'),
          'error'
        )

        // Marcar el estado del objeto en falso
        if (check.name === 'check_1') this.checkValues.check_1 = false;
        if (check.name === 'check_2') this.checkValues.check_2 = false;
        if (check.name === 'check_3') this.checkValues.check_3 = false;
        if (check.name === 'check_4') this.checkValues.check_4 = false;

        // Desmarcar el checkbox en front
        check.checked = false;
      }
    })

  }

}
