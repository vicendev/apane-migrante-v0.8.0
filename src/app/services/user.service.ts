import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../models/user';

const BACKEND_URL = environment.apiUrl + "/login"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router) { }

  // Obtener Token
  getToken() {
    return this.token
  }

  // Obtener si esta autenticado
  getIsAuth(){
    return this.isAuthenticated;
  }

  // Obtener un observable del estado de autenticación
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  /**
   * Ingresar a la aplicación por medio de autenticacion via API GoogleAuth
   * @param id id de usuario
   * @param email correo usuario
   * @param img img usuario
   * @param google si es google
   * @param facebook si es facebook
   * @param estado si esta disponible
   * @param idToken token de la api
   */
  login_google(id: string, email: string, img: string, google:boolean, facebook:boolean, estado:boolean, idToken: string) {
    
    const userData: User = {id: id, email: email, img: img, google: google, facebook: facebook, estado: estado, idToken: idToken };
    this.http.post<{ token: string, expiresIn: number}>( BACKEND_URL + '/google', userData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if(token) {
          const expiresInDuration = response.expiresIn
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 3000);
          this.saveAuthData(token, expirationDate);

          setTimeout(() => {
            window.location.reload();
          }, 2000)
        }

      })

  }

  /**
   * Ingresar a la aplicación con login de facebook
   * @param id id de usuario
   * @param email correo del usuario
   * @param img imagen desde facebook
   * @param google si la cuenta es google
   * @param facebook si la cuenta es facebook 
   * @param estado estado de la cuenta
   * @param idToken token de acceso
   */
  login_facebook(id: string, email: string, img: string, google: boolean, facebook: boolean, estado: boolean, idToken: string) {

    const userData: User = {id: id, email: email, img: img, google: google, facebook: facebook, estado: estado, idToken: idToken}

    this.http.post<{ token: string, expiresIn: number}>( BACKEND_URL + '/facebook', userData)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      if(token) {
        const expiresInDuration = response.expiresIn
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 3000);
        this.saveAuthData(token, expirationDate);

        setTimeout(() => {
          window.location.reload();
        }, 2000)
      }

    })
  }

  /**
   * Ingresar a la aplicación con una cuenta de invitado
   * @param estado estado de la cuenta (invitado es false)
   */
  login_invitado(estado: boolean) {

    this.http.post<{ token: string, expiresIn: number }>( BACKEND_URL + '/invitado', estado)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      if (token) {
        const expiresInDuration = response.expiresIn
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 3000);
        this.saveAuthData(token, expirationDate);

        this.router.navigate(["/"]);
      }
    })

  }

  /**
  * Obtiene estado autenticacion del usuario, si el localStorage esta vigente
  */
  autoAuthUser(){
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 3000);
      this.authStatusListener.next(true);
    }
  }

  /**
  * Cierra sesión
  */
  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  /**
   * Setea una formula para determinar la expiraciónn de un token
   * @param duration expiredIn parametro obtenido de jwt
   */
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 3000)
  }

  /**
  * Guarda la informacion del usuario en un token y la fecha de expiración
  * @param token informacion de token
  * @param expirationDate tiempo de expiración
  */
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  /**
  * Limpia el localStorage
  */
  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  /**
  * Obtiene la informacion de autenticación, el token y el tiempo de expiracion del token
  */
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

}
