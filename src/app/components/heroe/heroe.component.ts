import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html'
})
export class HeroeComponent {

  heroe: any = {};

  constructor( private _activatedRuter: ActivatedRoute, private _heroesService: HeroesService) {
    this._activatedRuter.params.subscribe( params => {
      this.heroe = _heroesService.getHeroe(params.id);
    });
  }

}
