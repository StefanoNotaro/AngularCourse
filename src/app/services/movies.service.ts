import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiKey = '6145be75be158f7e36be536b458970b6';
  private movieUrl = 'https://api.themoviedb.org/3';
  public movies = [];

  constructor(private http: HttpClient) {
  }

  getPopulars() {
    const url = `${ this.movieUrl }/discover/movie?sort_by=popularity.desc&api_key=${ this.apiKey }&languages=es`;

    return this.http.jsonp(url, 'callback');
  }

  getBillboard() {
    let since = new Date();
    let upto = new Date();

    upto.setDate( upto.getDate() + 7 );

    let sinceString = `${ since.getFullYear() }-${ this.pad(since.getMonth() + 1, 2) }-${ this.pad(since.getDate(), 2) }`;
    let uptoString = `${ upto.getFullYear() }-${ this.pad(upto.getMonth() + 1, 2) }-${ this.pad(upto.getDate(), 2) }`;

    // tslint:disable-next-line: max-line-length
    const url = `${ this.movieUrl }/discover/movie?primary_release_date.gte=${ sinceString }&primary_release_date.lte=${ uptoString }&api_key=${ this.apiKey }`;

    return this.http.jsonp(url, 'callback');
  }

  pad(num: number, size: number): string {
    let s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
}

  getChildMovies() {
    // tslint:disable-next-line: max-line-length
    const url = `${ this.movieUrl }/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${ this.apiKey }`;

    return this.http.jsonp(url, 'callback');
  }

  FindMovie(termOfSearch: string) {
    const url = `${ this.movieUrl }/search/movie?query=${ termOfSearch }&sort_by=popularity.desc&api_key=${ this.apiKey }&language=es`;
    return this.http.jsonp(url, 'callback').pipe(
      map((x: any) => {
        this.movies = x.results;
        return x;
      }));
  }

  findMovieById(movieId: number) {
    const url = `${ this.movieUrl }/movie/${ movieId }?&api_key=${ this.apiKey }`;

    return this.http.jsonp(url, 'callback');
  }

}
