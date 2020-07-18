import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private _id: string = '761492868757-vdko950dp3t3m6iqn52opcarck4p0o5m.apps.googleusercontent.com'
  public auth2: any;
  
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.fbLibrary();
  }

  /**
   * Sign-In Google
   */
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this._id,
        cookie_policy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE
        this.userService.login_google(
          '',
          profile.getEmail(),
          profile.getImageUrl(),
          true,//google
          false,//facebook
          true,//estado
          googleUser.getAuthResponse().id_token // token de google
        )

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  //------------ Fin Sign-In Google-------------------

  /**
   * Sign-In Facebook
   */
  fbLibrary() {
  
    (window as any).fbAsyncInit = function() {
      window['FB'].init({
        appId      : '690323478217593',
        cookie     : true,
        xfbml      : true,
        version    : 'v7.0'
      });
      window['FB'].AppEvents.logPageView();
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  
  }

  loginFB() {
 
    window['FB'].login((response) => {
        console.log('login response',response);
        if (response.authResponse) {
 
          window['FB'].api('/me', {
            fields: 'last_name, first_name, email'
          }, (userInfo) => {
 
            console.log("user information");
            console.log(userInfo);
          });
           
        } else {
          console.log('User login failed');
        }
    }, {scope: 'email'});
}

// ----------- Fin login Facebook -------------------

  ngAfterViewInit(){
        this.googleInit();
  }

}
