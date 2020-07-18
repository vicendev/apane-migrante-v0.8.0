import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  private data: any;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene un archivo json, con las traducciones
   * @param lang parametro para esteblecer un archivo
   */
  public getData(lang: string){

    if ( !lang ) {
      // Por defecto
      localStorage.setItem('lang','es-ES');
      lang = localStorage.getItem('lang')
    } else {
      // Guarda el lenguaje seleccionado
      localStorage.setItem('lang',lang);
    }

    return new Promise((resolve, reject) => {
      this.http.get(`assets/translations/${lang}.json`).subscribe(data => {
        this.data = data;
        resolve(true);
      }, error => {
        console.error('Error al recuperar las traducciones' + error);
        reject(true);
      });
    });

  }

  /**
   * Carga la traduccion de la palabra que se encuentra en el archivo
   * @param word palabra que se encuentre en el archivo
   */
  public getTranslate(word: string) {
    return this.data[word];
  }

}
