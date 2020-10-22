import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../../../services/utils.service';

@Component({
  selector: 'app-juridico-general',
  templateUrl: './juridico-general.component.html',
  styleUrls: ['./juridico-general.component.css']
})
export class JuridicoGeneralComponent implements OnInit {

  public mobileScreen: boolean;

  constructor(
    private _utils: UtilsService
  ) { }

  ngOnInit() {
    this.mobileScreen = this._utils.obtenerPantallaMobil();
  }

}
