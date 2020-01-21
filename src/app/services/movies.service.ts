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

  getBillboard() {
    const since = new Date();
    const upto = new Date();

    upto.setDate( upto.getDate() + 7 );

    const sinceString = `${ since.getFullYear() }-${ since.getMonth() + 1 }-${ since.getDay() }`;
    const uptoString = `${ upto.getFullYear() }-${ upto.getMonth() + 1 }-${ upto.getDay() }`;

    const url = `${ this.movieUrl }/discover/movie?primary_release_date.gte=${ sinceString }&primary_release_date.lte=${ uptoString }&api_key=${ this.apiKey }`;

    return this.http.jsonp(url, 'callback');
  }

  getChildMovies() {
    // /discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc
    const url = `${ this.movieUrl }/discover/movie?api_key=${ this.apiKey }&certification.lte=G&sort_by=popularity.desc`;

    return this.http.jsonp(url, 'callback');
  }

  FindMovie(termOfSearch: string) {
    const url = `${ this.movieUrl }/search/movie?query=${ termOfSearch }&sort_by=popularity.desc&api_key=${ this.apiKey }&language=es`;

    return this.http.jsonp(url, 'callback');
  }

}
