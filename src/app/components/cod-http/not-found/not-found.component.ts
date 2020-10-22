import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  public mobileScreen: boolean;

  constructor(
    private _utils: UtilsService
  ) { }

  ngOnInit() {

    this.mobileScreen = this._utils.obtenerPantallaMobil();
  }

}
