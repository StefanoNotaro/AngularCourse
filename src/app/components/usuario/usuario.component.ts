import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {

  constructor( private _activatedRoute: ActivatedRoute) {
    console.log('Ruta padre');
    _activatedRoute.params.subscribe(x => console.log(x) );
  }

  ngOnInit() {
  }

}
