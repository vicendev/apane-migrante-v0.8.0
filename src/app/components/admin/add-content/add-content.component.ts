import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as _ from 'lodash';
import { CabeceraMenuService } from '../../../services/cabeceramenu.service';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent implements OnInit {

  public uploadImg: File;
  public uploadIcon: File;
  public titulo: any;
  public menuID: any;

  constructor(
    private _cabeceraMenuService: CabeceraMenuService
  ) {
    this.titulo = '';
    this.menuID = '';
   }

  ngOnInit() {
    
  }

  onUploadImgHandler(event){

    _.forEach(event.files, item => {
      this.uploadImg = item;
    });
  }

  onUploadIconHandler(event){

    _.forEach(event.files, item => {
      this.uploadIcon = item;
    });
  }

  removeItem(){
    this.uploadImg = null;
    this.uploadIcon = null;
    this.titulo = '';
    this.menuID = '';
  }

  addCabeceraMenu(form: NgForm) {
    
    let titulo = form.value.titulo;
    let menuID = form.value.menuID;

    this._cabeceraMenuService.addCabeceraMenu(titulo, menuID, this.uploadImg, this.uploadIcon)

  }

}
