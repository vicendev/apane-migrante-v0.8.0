import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../../../../services/utils.service';

@Component({
  selector: 'app-identidad-general',
  templateUrl: './identidad-general.component.html',
  styleUrls: ['./identidad-general.component.css']
})
export class IdentidadGeneralComponent implements OnInit {

  public mobileScreen: boolean;

  constructor(
    private _utils: UtilsService
  ) { }

  ngOnInit() {
    this.mobileScreen = this._utils.obtenerPantallaMobil();
  }

}
