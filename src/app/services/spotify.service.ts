import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const AUTHORIZATION_TYPE = 'Bearer';
const CLIENT_ID = '6addf0d494054a20a88c26c3c0c08148';
const CLIENT_SECRET = 'b3c99197302b4654b38695ada8c1e198';
const TEMP_TOKEN = 'BQCai48rNYkt4abNxZpA4Aml38jFjV8NjeCiZvxj4c8h8Ssg1eL416EO7YA9Nqg2xrIuv9x91L3t4s31lWw';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {


  constructor( private _httpClient: HttpClient) {
    console.log('Servicio de Spotify listo!');
  }

  getNewReleases() {

    const headers = new HttpHeaders({
      Authorization: `${ AUTHORIZATION_TYPE } ${ TEMP_TOKEN }`,
    });

    return this._httpClient.get( 'https://api.spotify.com/v1/browse/new-releases?limit=20', { headers } );
  }
}
