import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  selectedMovie: any = {};

  constructor(public _movieService: MoviesService, private _location: Location) {
    this.selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));
    console.log(this.selectedMovie);
  }

  ngOnInit() {
  }

  back() {
    this._location.back();
  }

}
