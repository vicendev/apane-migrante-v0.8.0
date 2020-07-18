import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.obtenerUsuarioAutenticado();
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

  ngOnDestroy(){
    
    if(this.authListenerSubs){
      this.authListenerSubs.unsubscribe();
    }
  }

}
