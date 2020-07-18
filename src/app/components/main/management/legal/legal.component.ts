import { Component, OnInit } from '@angular/core';
import { TramiteService } from '../../../../services/tramite.service';
import { Tramite } from '../../../../models/tramite';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.css']
})
export class LegalComponent implements OnInit {

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
      this.dataTramite = this.tramite.filter(data => data.key === 'LEGAL')[0];
    })
  }

  ngOnDestroy() {
    if (this._tramiteSub ) {
      this._tramiteSub.unsubscribe();
    }
  }

}
