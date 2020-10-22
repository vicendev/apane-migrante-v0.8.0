import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  public mobileScreen: boolean;

  constructor(
    private _utils: UtilsService
  ) { }

  ngOnInit() {

    this.mobileScreen = this._utils.obtenerPantallaMobil();
    
  }

}
