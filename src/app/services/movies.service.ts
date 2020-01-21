import { Injectable } from '@angular/core';

import { HttpModule, JsonpModule } from '@angular/http';
// import { map } from 'rxjs/Rx'
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiKey = '6145be75be158f7e36be536b458970b6';
  private movieUrl = 'https://api.themoviedb.org/3';

  constructor(private jsonp: JsonpModule, private http: HttpModule) {
  }
  getPopulars() {
    const url = `${ this.movieUrl }/discover/movie?sort_by=popularity.desc&api_key=${ this.apiKey }&languages=es`;

    return this.http.get(url).map( res => res.json());
  }

}
