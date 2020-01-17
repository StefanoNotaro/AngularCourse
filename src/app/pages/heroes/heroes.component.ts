import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];

  loading = false;

  constructor( private _heroesService: HeroesService ) { }

  ngOnInit() {
    this.loading = true;
    this._heroesService.getHeroes().subscribe(resp => {
      this.heroes = resp;
      this.loading = false;
    });
  }

  borrarHeroe( heroe: HeroeModel, index: number ) {

    Swal.fire({
      title: `¿Está seguro?`,
      text: `¿Está seguro de borrar a ${ heroe.nombre }?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this._heroesService.borrarHeroe(heroe.id).subscribe();
        this.heroes.splice(index, 1);
      }
    });
  }
}
