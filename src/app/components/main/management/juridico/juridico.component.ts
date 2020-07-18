import { Component, OnInit, Input } from '@angular/core';
import { Contenido } from '../../../../models/contenido';

@Component({
  selector: 'app-juridico',
  templateUrl: './juridico.component.html',
  styleUrls: ['./juridico.component.css']
})
export class JuridicoComponent implements OnInit {

  @Input() menuID: string;
  @Input() keyContenido: string;

  constructor(
    
  ) {
    this.keyContenido = 'JURIDICO.GENERAL';
  }

  ngOnInit() {
  }



}
