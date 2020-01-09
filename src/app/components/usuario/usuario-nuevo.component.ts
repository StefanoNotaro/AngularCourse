import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-nuevo',
  template: `
    <p>
      usuario-nuevo works!
    </p>
  `,
  styles: []
})
export class UsuarioNuevoComponent implements OnInit {

  constructor( private _activatedRoute: ActivatedRoute) {
    console.log('Ruta HIJA usuario nuevo');
    _activatedRoute.parent.params.subscribe(x => console.log(x) );
  }

  ngOnInit() {
  }

}
