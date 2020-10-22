import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';
import { UtilsService } from '../../../services/utils.service';
import { TramiteProgresoService } from '../../../services/tramiteprogreso.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public mobileScreen: boolean;
  public modoTest: boolean;
  public userEstado: boolean;

  public userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  private _token: any;
  public usuario: any;

  constructor(
    private userService: UserService,
    private _utils: UtilsService,
    private _tramiteProgresoService: TramiteProgresoService) { }

  ngOnInit() {

    this.setModoTest();
    this.mobileScreen = this._utils.obtenerPantallaMobil();
    this.obtenerUsuarioAutenticado();

    if (this.userIsAuthenticated) {
      this._token = this._utils.obtenerDataUsuario();
      this.usuario = this._utils.desestructurarObjetoToken(this._token);

      this.userEstado = this.usuario.estado
    }
    
  }

  /**
   * Obtiene usuario autenticado si existe y mantener la sesión del token
   */
  obtenerUsuarioAutenticado(){
    this.userIsAuthenticated = this.userService.getIsAuth();
    this.authListenerSubs = this.userService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  /**
   * Cerrar sesión y elimina el token del localStorage
   */
  onLogout() {
    this.userService.logout();
  }

  /**
   * Cambia el lenguaje de la app
   * @param lang parametro de idioma seleccionado para esteblecer un archivo json
   */
  getTranslate(lang:string) {

    localStorage.setItem('lang', lang);
    location.reload();
    
  }

  borrarDatosTesting() {
    let token = this._utils.obtenerDataUsuario()
    let user = this._utils.desestructurarObjetoToken(token);

    this._tramiteProgresoService.deleteTramiteProgresoTesting(user._id);

    setTimeout( () => {
      window.location.reload();
    }, 2000)
  }

  setModoTest() {

    if (localStorage.getItem('modo-test')) {
      if (localStorage.getItem('modo-test') === 'test') {
        this.modoTest = true;
      } else {
        this.modoTest = false;
      }
    }
  }

  ngOnDestroy(){
    
    if(this.authListenerSubs){
      this.authListenerSubs.unsubscribe();
    }
  }

}
