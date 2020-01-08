import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';


const AUTHORIZATION_TYPE = 'Bearer';
const CLIENT_ID = '6addf0d494054a20a88c26c3c0c08148';
const CLIENT_SECRET = 'b3c99197302b4654b38695ada8c1e198';
const TEMP_TOKEN = 'BQCwphw5Qyye5V3AH7qZJI6nu40CEzY6hOg3rEYcgGArrPo37lmI0xmQQ9F5BrBILL5R5tuBm05tq1GqtSw';
const headers = new HttpHeaders({
  Authorization: `${ AUTHORIZATION_TYPE } ${ TEMP_TOKEN }`,
});

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {


  constructor( private _httpClient: HttpClient) {
    console.log('Servicio de Spotify listo!');
  }

  getNewReleases() {
    return this._httpClient.get( 'https://api.spotify.com/v1/browse/new-releases?limit=20', { headers } )
      .pipe( map( (data: any) => data.albums.items));
  }

  getArtist( termino: string ) {
    return this._httpClient.get( `https://api.spotify.com/v1/search?q=${ termino }&type=artist`, { headers } )
      .pipe( map( (data: any) => data.artists.items));
  }

}
