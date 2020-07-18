import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng-lts/api';
import { PerfilMenuService } from '../../services/perfilmenu.service';
import { PerfilMenu } from '../../models/perfilmenu';
import { Subscription } from 'rxjs';
import { TranslateService } from '../../services/translate.service';

import * as _ from 'lodash';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public usuario: any;
  public items: MenuItem[];
  public key: string;

  private _token: any;
  private _perfilMenu: PerfilMenu[];

  private _perfilMenuSub: Subscription;

  constructor(
    private _perfilMenuService: PerfilMenuService,
    private _translateService: TranslateService,
    private _utils: UtilsService

  ) {
    this.items = [];
    this.key = 'PROFILE.ACTIVITY';
   }

  ngOnInit() {

    this._token = this._utils.obtenerDataUsuario();
    this.usuario = this._utils.desestructurarObjetoToken(this._token);
    this.cargarData()
  }



  /**
  * Desestructura el token para obtener data
  * @param token token de sesión
  */
  desestructurarObjetoToken(token: any) {
    
    const { _id ,email, nombre, img } = token.usuario;
    this.usuario = { _id, email, nombre, img };
  }

  cargarData() {

    this._perfilMenuService.getPerfilMenu();
    this._perfilMenuSub = this._perfilMenuService.getPerfilMenuUpdateListener()
      .subscribe( (perfilMenu: PerfilMenu[]) => {

        this.cargarMenu(perfilMenu);
        
      })
  }

  cargarMenu(menu: PerfilMenu[]) {

    this.items = [];
    this._perfilMenu = menu;

    _.forEach(this._perfilMenu, data => {

      let titulo = this._translateService.getTranslate(data.titulo);

      this.items.push({
        items: [{
          label: titulo, 
          id: data.id,
          command:( () => {
            console.log('Cambiar vista contenido', data.id)
          }),
        }]
      })
    })
  }


}
