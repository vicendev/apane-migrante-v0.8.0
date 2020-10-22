import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng-lts/api';
import { PerfilMenuService } from '../../services/perfilmenu.service';
import { PerfilMenu } from '../../models/perfilmenu';
import { Subscription } from 'rxjs';
import { TranslateService } from '../../services/translate.service';

import * as _ from 'lodash';
import { UtilsService } from '../../services/utils.service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public mobileScreen: boolean;

  public usuario: any;
  public items: MenuItem[];
  public key: string;

  private _token: any;
  public perfilMenu: PerfilMenu[];

  private _perfilMenuSub: Subscription;

  constructor(
    private _perfilMenuService: PerfilMenuService,
    private _translateService: TranslateService,
    private _utils: UtilsService,
    private sidebarService: SidebarService
  ) {
    this.items = [];
    this.key = 'PROFILE.ACTIVITY';
   }

  ngOnInit() {

    this.mobileScreen = this._utils.obtenerPantallaMobil();

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

  abrirsidebar(id: string) {
    this.sidebarService.open(id)
  }

  cargarData() {

    this._perfilMenuService.getPerfilMenu();
    this._perfilMenuSub = this._perfilMenuService.getPerfilMenuUpdateListener()
      .subscribe( (perfilMenu: PerfilMenu[]) => {

        this.perfilMenu = [];
        this.perfilMenu = perfilMenu;
        
      })
  }

  eventoMenu(menu: PerfilMenu[]) {
    console.log('Carga contenido')
  }


}
