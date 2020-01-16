import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];

  constructor( private _heroesService: HeroesService ) { }

  ngOnInit() {
    this._heroesService.getHeroes().subscribe(resp => {
      this.heroes = resp;
    });
  }



}
