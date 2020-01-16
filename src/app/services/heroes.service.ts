import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://angularcourse-3b00a.firebaseio.com';

  constructor( private _httpClient: HttpClient ) { }

  crearHeroe( heroe: HeroeModel ) {
    return this._httpClient.post( `${ this.url }/heroes.json`, heroe )
      .pipe( map( (resp: any) => {
        heroe.id = resp.name;
        return heroe;
      }) );
  }

  actualizarHeroe( heroe: HeroeModel ) {
    const heroTemp = {
      ...heroe
    };

    delete heroTemp.id;
    return this._httpClient.put(`${ this.url }/heroes/${ heroe.id }.json`, heroTemp);
  }

  getHeroes() {
    return this._httpClient.get(`${ this.url }/heroes.json`)
      .pipe(map(this.crearArreglo));
  }

  private crearArreglo(heroesObj:Object) {
    const heroes: HeroeModel[] = [];
    console.log(heroesObj);

    if (heroesObj === null) {
      return [];
    }

    Object.keys(heroesObj).forEach(key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);
    });
    return heroes;
  }

  getHeroe( id: string ) {
    return this._httpClient.get(`${this.url}/heroes/${id}.json`);
  }
}
