import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  popularMovies: any;

  childMovies: any;

  billboard: any;

  constructor(public _movieService: MoviesService, private _router: Router) {

    _movieService.getBillboard().subscribe( (x: any) => {
      this.billboard = x.results;
    });

    _movieService.getPopulars().subscribe( (x: any) => {
      this.popularMovies = x.results;
    });

    _movieService.getChildMovies().subscribe( (x: any) => {
      this.childMovies = x.results;
    });
  }

  ngOnInit() {
  }

  moreInfo( movieId: number) {
    const selectedMovie = this.popularMovies.find(x => x.id === movieId);

    localStorage.setItem('selectedMovie', JSON.stringify(selectedMovie));

    this._router.navigateByUrl(`/movie/${ movieId }`);
  }

}
