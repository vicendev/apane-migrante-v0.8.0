import { Component, OnInit } from '@angular/core';
import { Tramite } from '../../../../models/tramite';
import { Subscription } from 'rxjs';
import { TramiteService } from '../../../../services/tramite.service';

@Component({
  selector: 'app-cultural',
  templateUrl: './cultural.component.html',
  styleUrls: ['./cultural.component.css']
})
export class CulturalComponent implements OnInit {

  public tramite: Tramite[];
  private _tramiteSub: Subscription;

  public dataTramite: Object;

  constructor(
    private _tramiteService: TramiteService
  ) { 
    this.dataTramite = {};
  }

  ngOnInit() {
    this.cargarTramite();
  }

  cargarTramite() {
    this._tramiteService.getTramite();

    this._tramiteSub = this._tramiteService.getTramiteUpdateListener()
    .subscribe((tramite: Tramite[]) => {
      this.tramite = tramite;
      this.dataTramite = this.tramite.filter(data => data.key === 'CULTURAL')[0];
    })
  }

  ngOnDestroy() {
    if (this._tramiteSub ) {
      this._tramiteSub.unsubscribe();
    }
  }

}
