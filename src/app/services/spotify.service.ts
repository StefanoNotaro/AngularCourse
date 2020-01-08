import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';


const AUTHORIZATION_TYPE = 'Bearer';
const CLIENT_ID = '6addf0d494054a20a88c26c3c0c08148';
const CLIENT_SECRET = 'b3c99197302b4654b38695ada8c1e198';
const TEMP_TOKEN = 'BQB5isj7B0eZYiGcn4rI0fM3wgtxrSDhO57mdy04Jel_VhJOGeaS1a21ncEskODOxxwn-8pvOxmKLq5hUUCbpWZSc6xummzw9ZIpmcplQaLXfsZhaHufcdQC_ZF9l9IIFlfMJCKDXt2SFxKqByNYZe7WhUFb-boLYnY';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {


  constructor( private _httpClient: HttpClient) {
    console.log('Servicio de Spotify listo!');
  }

  getQuery( query: string ) {
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      Authorization: `${ AUTHORIZATION_TYPE } ${ TEMP_TOKEN }`,
    });

    return this._httpClient.get( url, { headers } );
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20')
      .pipe( map( (data: any) => data.albums.items));
  }

  getArtists( termino: string ) {
    if (!termino) {
      termino = ' ';
    }
    return this.getQuery( `search?q=${ termino }&type=artist` )
      .pipe( map( (data: any) => data.artists.items));
  }

  getArtist( artistId: string ) {
    return this.getQuery( `artists/${ artistId }` );
  }

}
