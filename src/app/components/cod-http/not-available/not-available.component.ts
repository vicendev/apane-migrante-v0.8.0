import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-not-available',
  templateUrl: './not-available.component.html',
  styleUrls: ['./not-available.component.css']
})
export class NotAvailableComponent implements OnInit {

  public mobileScreen: boolean

  constructor(
    private _utils: UtilsService
  ) { }

  ngOnInit() {
    this.mobileScreen = this._utils.obtenerPantallaMobil();
  }

}
