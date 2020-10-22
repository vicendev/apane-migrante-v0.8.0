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
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ViewChild('dataJuridico', {static: false}) dataJuridico: JuridicoComponent;

  public mobileScreen: boolean;

  public tramite: Tramite;
  public cabeceraMenu: CabeceraMenu;
  public items: MenuItem[];
  public menuID: string;
  public menuIDAnterior: string[];

  public tramiteMenu: TramiteMenu[];

  private _tramiteSub: Subscription;
  private _tramiteMenuSub: Subscription;
  private _tramiteMenuAnteriorSub: Subscription;
  private _firstTramiteMenuSub: Subscription;
  private _cabeceraMenuSub: Subscription;
  private _contenidoSub: Subscription;

  constructor(
    private _activateRoute: ActivatedRoute,
    private _tramiteService: TramiteService,
    private _tramiteMenuService: TramiteMenuService,
    private _cabeceraMenuService: CabeceraMenuService,
    private _contenidoService: ContenidoService,
    private _translateService: TranslateService,
    private _utils: UtilsService,
    private _router: Router
  ) {
    this.tramite = <ITramite> {};
    this.items = [];
    this.cabeceraMenu = <ICabeceraMenu> {};
    this.menuID = '';
    this.menuIDAnterior = [];
   }

  ngOnInit() {

    this.mobileScreen = this._utils.obtenerPantallaMobil();
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
          this.menuIDAnterior[0] = this.tramite.id;
          this.menuIDAnterior[1] = this.tramite.id;
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
        this.tramiteMenu = [];
        this.tramiteMenu = tramiteMenu;
        this.menuIDAnterior[1] = this.tramiteMenu[0].menuID;  

      })
  }

  eventoMenu(idMenu: string, submMenu: boolean) {

    if (submMenu) {
                  
      this._tramiteMenuSub.unsubscribe();
      this._cabeceraMenuSub.unsubscribe();
      this.obtenerCabeceraMenu(idMenu);
      this.obtenerMenu(idMenu)
      
      if ( this._contenidoSub ) {
          this._contenidoSub.unsubscribe();
          this.cambiarVistaContenido(idMenu, submMenu);
      } else {
        this.cambiarVistaContenido(idMenu, submMenu);
      }
      
     } else { 

        if (this._contenidoSub) {
          this._contenidoSub.unsubscribe()
          this.cambiarVistaContenido(idMenu, submMenu);
        } else {
          this.cambiarVistaContenido(idMenu, submMenu);               
        }
     }
  }

  obtenerCabeceraMenu(menuID: string) {
  
    this._cabeceraMenuService.getCabeceraMenuByMenuID(menuID);
    this._cabeceraMenuSub = this._cabeceraMenuService.getCabeceraMenuByMenuIDUpdateListener()
      .subscribe(( cabeceraMenu: CabeceraMenu ) => {
        this.cabeceraMenu = cabeceraMenu[0];
        this.cabeceraMenu.titulo = this._translateService.getTranslate(cabeceraMenu[0].titulo);
      })
  }

  cambiarVistaContenido(menuID: string, flagSubMenu: boolean) {

    if (flagSubMenu) {

      if (this._firstTramiteMenuSub) {
        this._firstTramiteMenuSub.unsubscribe();
      }
     
      this._tramiteMenuService.getFirstTramiteMenuByMenuID(menuID);
      this._firstTramiteMenuSub = this._tramiteMenuService.getFirstTramiteMenuByMenuIDListener()
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

  /**
   * Cambia la lista por el menú anterior
   * [0] = id Menu inicial, se carga al iniciar pantalla
   * [1] = id Menu actual
   * con [1] se obtiene el menu padre y asi poder cambiar de menú
   */
  menuAnterior() {

    
    if (this.menuIDAnterior[0] != this.menuIDAnterior[1]) {

      if (this._tramiteMenuAnteriorSub) {
        this._tramiteMenuAnteriorSub.unsubscribe()

        this._tramiteMenuService.getTramiteMenuByID(this.menuIDAnterior[1])
        this._tramiteMenuAnteriorSub = this._tramiteMenuService.getTramiteMenuByIDListener()
          .subscribe( ( tramiteMenu: TramiteMenu) => {
              this.eventoMenu(tramiteMenu[0].menuID, true);
        })
      } else {
        this._tramiteMenuService.getTramiteMenuByID(this.menuIDAnterior[1])
        this._tramiteMenuAnteriorSub = this._tramiteMenuService.getTramiteMenuByIDListener()
          .subscribe( ( tramiteMenu: TramiteMenu) => {
              this.eventoMenu(tramiteMenu[0].menuID, true);
        })
      }

    } else {
      return;
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

  abrirsidebar(id: string) {
    this._utils.abrirSideBarMenu(id);
  }

  cerrarsidebar(id: string) {
    this._utils.cerrarSideBarMenu(id);
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

    if (this._firstTramiteMenuSub) {
      this._firstTramiteMenuSub.unsubscribe
    }
  }


}
