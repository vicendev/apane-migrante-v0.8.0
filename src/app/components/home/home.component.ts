import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public mobileScreen: boolean;

  public userIsAuthenticated = false;
  public loadingPage: boolean;
  private authListenerSubs: Subscription;

  private _token: any;
  public usuario: any;

  constructor(
    private _userService: UserService,
    private _utils: UtilsService,
    private _router: Router
  ) {
    this.loadingPage = true;
   }

  ngOnInit() {

    this.mobileScreen = this._utils.obtenerPantallaMobil();

    this.obtenerUsuarioAutenticado();

    if (this.userIsAuthenticated) {
      this._token = this._utils.obtenerDataUsuario();
      this.usuario = this._utils.desestructurarObjetoToken(this._token);
    }

    setTimeout( () => {
      this.loadingPage = false;
    }, 2800);
  }

  /**
   * Obtiene usuario autenticado para mantener una conexión
   */
  obtenerUsuarioAutenticado(){

    this.userIsAuthenticated = this._userService.getIsAuth();
    this.authListenerSubs = this._userService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  redirectAppNoDisponible() {
    this._router.navigate(['/not-available']);
  }

  /**
   * Navega hacia la pantalla principal de funciones de la app
   * @param key valor del botón presionado
   */
  navegarMain(key: string) {

    this._router.navigate(['/main', key])
  }

}
