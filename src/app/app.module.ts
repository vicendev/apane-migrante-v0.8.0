// Angular
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Services
import { TranslateService } from './services/translate.service';

// Pipes
import { TranslatePipe } from './pipes/translate.pipe';

// Interceptors
import { AuthInterceptor } from './interceptors/auth-interceptor';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { MenuModule } from 'primeng-lts/menu';
import { FileUploadModule } from 'primeng-lts/fileupload';
import { DropdownModule } from 'primeng-lts/dropdown';
import { RadioButtonModule } from 'primeng-lts/radiobutton';
import { AccordionModule } from 'primeng-lts/accordion';
import { CheckboxModule } from 'primeng-lts/checkbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Components  Errores HTTP
import { NotFoundComponent } from './components/cod-http/not-found/not-found.component';
import { NotAvailableComponent } from './components/cod-http/not-available/not-available.component';

//Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MainComponent } from './components/main/main.component';
import { JuridicoComponent } from './components/main/management/juridico/juridico.component';
import { LegalComponent } from './components/main/management/legal/legal.component';
import { SocialComponent } from './components/main/management/social/social.component';
import { CulturalComponent } from './components/main/management/cultural/cultural.component';
import { AddContentComponent } from './components/admin/add-content/add-content.component';
import { JuridicoGeneralComponent } from './components/main/management/juridico/juridico-general/juridico-general.component';
import { IdentidadGeneralComponent } from './components/main/management/juridico/identidad/identidad-general/identidad-general.component';
import { IdentidadCarnetComponent } from './components/main/management/juridico/identidad/identidad-carnet/identidad-carnet.component';
import { ProfileActivityComponent } from './components/profile/management/profile-activity/profile-activity.component';
import { AboutComponent } from './components/about/about.component';
import { TramiteCarnetComponent } from './components/main/management/juridico/identidad/tramite-carnet/tramite-carnet.component';


export function translateFactory(provider: TranslateService){
  return () => provider.getData(localStorage.getItem('lang'));
}

@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    ProfileComponent,
    // Widgets Porfile
      ProfileActivityComponent,
    MainComponent,
    // Widgets Main
    JuridicoComponent,
      //Child Juridico
      JuridicoGeneralComponent,
      IdentidadGeneralComponent,
      IdentidadCarnetComponent,
      TramiteCarnetComponent,
    LegalComponent,
    SocialComponent,
    CulturalComponent,
    // Apartados de administracion
    AddContentComponent,
    // Paginas de error HTTP
    NotFoundComponent,
    NotAvailableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    //Prime NG
    MenuModule,
    FileUploadModule,
    DropdownModule,
    RadioButtonModule,
    AccordionModule,
    CheckboxModule
  ],
  providers: [
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: translateFactory,
      deps: [TranslateService],
      multi: true
    },
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
