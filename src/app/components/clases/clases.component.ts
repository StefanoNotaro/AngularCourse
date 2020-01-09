import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styles: []
})
export class ClasesComponent implements OnInit {

  alerta = 'alert-danger';

  propiedades =
  {
    danger: true
  };

  loading = false;

  constructor() { }

  ngOnInit() {
  }

  invertDanger() {
    console.log(this.propiedades.danger);
    this.propiedades.danger = !this.propiedades.danger;
    console.log(this.propiedades.danger);
  }

  ejecutar() {
    this.loading = true;

    setTimeout(() => this.loading = false, 3000);
  }

}
