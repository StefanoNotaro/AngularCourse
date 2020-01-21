import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  selectedMovie: any = {};

  constructor(public _movieService: MoviesService) {
    this.selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));
    console.log(this.selectedMovie);
  }

  ngOnInit() {
  }

}
