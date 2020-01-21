import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiKey = '6145be75be158f7e36be536b458970b6';
  private movieUrl = 'https://api.themoviedb.org/3';
  public movie: any = {};

  constructor(private http: HttpClient) {
  }

  getPopulars() {
    const url = `${ this.movieUrl }/discover/movie?sort_by=popularity.desc&api_key=${ this.apiKey }&languages=es`;

    return this.http.jsonp(url, 'callback');
  }

  FindMovie(termOfSearch: string) {
    const url = `${ this.movieUrl }/search/movie?query=${ termOfSearch }&sort_by=popularity.desc&api_key=${ this.apiKey }&language=es`;

    return this.http.jsonp(url, 'callback');
  }

}
