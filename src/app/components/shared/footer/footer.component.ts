import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public modo: string;
  public chkModo: boolean
  constructor() { }

  ngOnInit() {
    this.setModoTest();
  }

  setModoTest() {
    if (!localStorage.getItem('modo-test')) {
      localStorage.setItem('modo-test', 'prod')
      this.modo = localStorage.getItem('modo-test');
      this.chkModo = false;
    } else {
      this.modo = localStorage.getItem('modo-test');
      if (this.modo === 'test') {
        this.chkModo = true;
      } else {
        this.chkModo = false;
      }
    }
  }

  cambiarModo() {
    if (localStorage.getItem('modo-test')) {

      if (this.chkModo == true) {
        localStorage.setItem('modo-test', 'prod')
        this.modo = localStorage.getItem('modo-test');
        this.chkModo = false;

      } else {
        localStorage.setItem('modo-test', 'test')
        this.modo = localStorage.getItem('modo-test');
        this.chkModo = true;
      }
    }

    setTimeout( () => {
      window.location.reload();
    }, 1000)
  }

}
