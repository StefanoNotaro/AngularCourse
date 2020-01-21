import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { MoviesService } from '../../../services/movies.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  buscar = '';

  foundedMovies = [];

  constructor(private _movieService: MoviesService) { }

  ngOnInit() {
  }

  findMovie() {
    console.log('Termino de busqueda: ', this.buscar);
    this._movieService.FindMovie(this.buscar).subscribe((x: any) => {
      this.foundedMovies = x.results;
      console.log(this.foundedMovies);

    });
  }

}
