import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  selectedMovie: any = {};

  constructor(public _movieService: MoviesService, private _location: Location, private _activatedRoute: ActivatedRoute) {
    _activatedRoute.params
      .subscribe(x => {
        _movieService.findMovieById(x.id).subscribe( y => {
          this.selectedMovie = y;
          console.log(y);
        });
      });
  }

  ngOnInit() {
  }

  back() {
    this._location.back();
  }

}
