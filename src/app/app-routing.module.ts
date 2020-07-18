import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MainComponent } from './components/main/main.component';
import { AddContentComponent } from './components/admin/add-content/add-content.component';
import { AboutComponent } from './components/about/about.component';
import { TramiteCarnetComponent } from './components/main/management/juridico/identidad/tramite-carnet/tramite-carnet.component';
import { NotFoundComponent } from './components/cod-http/not-found/not-found.component';
import { NotAvailableComponent } from './components/cod-http/not-available/not-available.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'about', component:AboutComponent},
  {path: 'login', component:LoginComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'main/:key', component:MainComponent},
  {path: 'tramite-carnet/:id', component:TramiteCarnetComponent},
  {path: 'add-content', component:AddContentComponent},
  {path: '404', component:NotFoundComponent},
  {path: '**', pathMatch: 'full', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
