import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TramiteService } from '../../services/tramite.service';
import { Tramite } from '../../models/tramite';
import { Subscription } from 'rxjs';
import { ITramite } from '../../interfaces/itramite';

import { MenuItem } from 'primeng-lts/api';
import { TramiteMenuService } from '../../services/tramitemenu.service';
import { TramiteMenu } from '../../models/tramitemenu';

import * as _ from 'lodash';
import { TranslateService } from '../../services/translate.service';
import { CabeceraMenu } from '../../models/cabeceramenu';
import { CabeceraMenuService } from '../../services/cabeceramenu.service';
import { ICabeceraMenu } from 'src/app/interfaces/icabeceramenu';
import { JuridicoComponent } from './management/juridico/juridico.component';
import { ContenidoService } from '../../services/contenido.service';
import { Contenido } from '../../models/contenido';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ViewChild('dataJuridico', {static: false}) dataJuridico: JuridicoComponent;

  public tramite: Tramite;
  public cabeceraMenu: CabeceraMenu;
  public items: MenuItem[];
  public menuID: string;

  private _tramiteMenu: TramiteMenu[];

  private _tramiteSub: Subscription;
  private _tramiteMenuSub: Subscription;
  private _firstTramiteMenu: Subscription;
  private _cabeceraMenuSub: Subscription;
  private _contenidoSub: Subscription;

  constructor(
    private _activateRoute: ActivatedRoute,
    private _tramiteService: TramiteService,
    private _tramiteMenuService: TramiteMenuService,
    private _cabeceraMenuService: CabeceraMenuService,
    private _contenidoService: ContenidoService,
    private _translateService: TranslateService,
    private _router: Router
  ) {
    this.tramite = <ITramite> {};
    this.items = [];
    this.cabeceraMenu = <ICabeceraMenu> {};
    this.menuID = '';
   }

  ngOnInit() {

    this.obtenerTramiteByKey();
  }

  /**
   * Obtiene parametro para mostrar el contenido 
   * referente al botón presionado en home
   */
  obtenerTramiteByKey(){
    const KEY = this._activateRoute.snapshot.params.key;

    if (KEY === 'juridico' || KEY === 'legal' || KEY === 'social' || KEY === 'cultural' ) {

      this._tramiteService.getTramiteByKey(KEY);
      this._tramiteSub = this._tramiteService.getTramiteByKeyUpdateListener()
        .subscribe(( tramite: Tramite ) => {
          this.tramite = tramite[0];
          this.obtenerMenu(this.tramite.id);
          this.obtenerCabeceraMenu(this.tramite.id);
        });
  
    } else {
      this._router.navigate(['home']);
    }

   
  }

  /**
   * Obtener el listado de menú desde BD
   * @param menuID Id del menu padre
   */
  obtenerMenu(menuID: string){

    this._tramiteMenuService.getTramiteMenuByMenuID(menuID);
    this._tramiteMenuSub = this._tramiteMenuService.getTramiteMenuByMenuIDListener()
      .subscribe(( tramiteMenu: TramiteMenu[] ) => {
        this.items = [];
        this._tramiteMenu = tramiteMenu;
        
        _.forEach( this._tramiteMenu, data => {
          let titulo = this._translateService.getTranslate(data.titulo);

          this.items.push({
            items: [{
              label: titulo, 
              id: data.id,
              command:( () => {
                if (data.submenu) {
                  
                  this._tramiteMenuSub.unsubscribe();
                  this._cabeceraMenuSub.unsubscribe();
                  this.obtenerCabeceraMenu(data.id);
                  this.obtenerMenu(data.id)
                  
                  if ( this._contenidoSub ) {
                      this._contenidoSub.unsubscribe();
                      this.cambiarVistaContenido(data.id, data.submenu);
                  } else {
                    this.cambiarVistaContenido(data.id, data.submenu);
                  }
                  
                 } else { 

                    if (this._contenidoSub) {
                      this._contenidoSub.unsubscribe()
                      this.cambiarVistaContenido(data.id, data.submenu);
                    } else {
                      this.cambiarVistaContenido(data.id, data.submenu);               
                    }
                 }
              }) 
            }]
          })
        });
       
      })
  }

  obtenerCabeceraMenu(menuID: string) {
  
    this._cabeceraMenuService.getCabeceraMenuByMenuID(menuID);
    this._cabeceraMenuSub = this._cabeceraMenuService.getCabeceraMenuByMenuIDUpdateListener()
      .subscribe(( cabeceraMenu: CabeceraMenu ) => {
        console.log(cabeceraMenu)
        this.cabeceraMenu = cabeceraMenu[0];
        this.cabeceraMenu.titulo = this._translateService.getTranslate(cabeceraMenu[0].titulo);
      })
  }

  cambiarVistaContenido(menuID: string, flagSubMenu: boolean) {

    if (flagSubMenu) {

      if (this._firstTramiteMenu) {
        this._firstTramiteMenu.unsubscribe();
      }
     
      this._tramiteMenuService.getFirstTramiteMenuByMenuID(menuID);
      this._firstTramiteMenu = this._tramiteMenuService.getFirstTramiteMenuByMenuIDListener()
        .subscribe( (tramiteMenu: TramiteMenu) => {
          
          this._contenidoService.getContenidoByMenuID(tramiteMenu.id)
          this._contenidoSub = this._contenidoService.getContenidoByMenuIDUpdateListener()
            .subscribe( (contenido: Contenido)  => {
              this.dataJuridico.menuID = contenido[0].menuID;
              this.dataJuridico.keyContenido = contenido[0].key;
          })

        })
      
    } else {

      this._contenidoService.getContenidoByMenuID(menuID)
      this._contenidoSub = this._contenidoService.getContenidoByMenuIDUpdateListener()
        .subscribe( (contenido: Contenido)  => {
          if(!contenido[0]) {
            this.alertEspacioEnConstruccion();
          } else {
          this.dataJuridico.menuID = contenido[0].menuID;
          this.dataJuridico.keyContenido = contenido[0].key;
          }
      });

    }

   
  }
  
  alertEspacioEnConstruccion() {
    Swal.fire({
      title: this._translateService.getTranslate('label.no.disponible.titulo'),
      text: this._translateService.getTranslate('label.no.disponible'),
      imageUrl: 'assets/img/png/no-disponible.png',
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'espacio en construcción',
    })
  }

  ngOnDestroy() {
    if (this._tramiteSub) {
      this._tramiteSub.unsubscribe();
    }

    if (this._tramiteMenuSub) {
      this._tramiteMenuSub.unsubscribe();
    }

    if (this._cabeceraMenuSub) {
      this._cabeceraMenuSub.unsubscribe();
    }

    if (this._firstTramiteMenu) {
      this._firstTramiteMenu.unsubscribe
    }
  }


}
