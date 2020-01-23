import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  buscar = '';

  constructor(public _movieService: MoviesService, private _activatedRoute: ActivatedRoute, private _router: Router) {
    _activatedRoute.params
      .subscribe(x => {
        this.buscar = x.termino;
        this.findMovie();
      });
  }

  ngOnInit() {
  }

  findMovie() {
    if (this.buscar.length <= 0) {
      return;
    }

    this._movieService.FindMovie(this.buscar)
      .subscribe();
  }

  moreInfo(movie: any) {
    this._router.navigate(['/movie', movie.id]);
  }

}
