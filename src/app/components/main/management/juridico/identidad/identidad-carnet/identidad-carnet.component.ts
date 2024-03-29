import { Component, OnInit } from '@angular/core';
import { TramiteCoreService } from '../../../../../../services/tramitecore.service';
import { Subscription } from 'rxjs';
import { TramiteCore } from '../../../../../../models/tramitecore';
import { Router } from '@angular/router';
import { UtilsService } from '../../../../../../services/utils.service';

@Component({
  selector: 'app-identidad-carnet',
  templateUrl: './identidad-carnet.component.html',
  styleUrls: ['./identidad-carnet.component.css']
})
export class IdentidadCarnetComponent implements OnInit {

  public mobileScreen: boolean;
  public userEstado: boolean;

  private _tramiteCoreSub: Subscription;

  constructor(
    private _tramiteCoreService: TramiteCoreService,
    private _router: Router,
    private _utils: UtilsService
  ) { }

  ngOnInit() {
    this.mobileScreen = this._utils.obtenerPantallaMobil();

    let token = this._utils.obtenerDataUsuario();
    let usuario = this._utils.desestructurarObjetoToken(token);

    this.userEstado = usuario.estado
  }

  navegarTramiteCarnet() {

    const KEY = 'TRAMITE.CARNET';

    this._tramiteCoreService.getTramiteCoreByKey(KEY);
    this._tramiteCoreSub = this._tramiteCoreService.getTramiteCoreByKeyUpdateListener()
      .subscribe( ( tramiteCore: TramiteCore ) => {
        
        let id = tramiteCore[0].id
        this._router.navigate(['tramite-carnet', id]);
      })
    

  }

  ngOnDestroy() {

    if (this._tramiteCoreSub) {
      this._tramiteCoreSub.unsubscribe();
    }
  }

}
