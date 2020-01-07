import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html'
})
export class BuscadorComponent implements OnInit {

  heroes: any[] = [];

  termino:string;

  constructor( private _activatedRouter: ActivatedRoute, private _heroesService: HeroesService , private _router: Router) {}

  ngOnInit() {
    this._activatedRouter.params.subscribe( params => {
      this.termino = params.termino;
      this.heroes = this._heroesService.buscarHeroes( params.termino );
      console.log( this.heroes );
    });
  }

  verHeroe( index: number ) {
    this._router.navigate( [ '/heroe', index ] );
  }

}
