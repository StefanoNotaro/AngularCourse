import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';


const AUTHORIZATION_TYPE = 'Bearer';
const CLIENT_ID = '6addf0d494054a20a88c26c3c0c08148';
const CLIENT_SECRET = 'b3c99197302b4654b38695ada8c1e198';
const TEMP_TOKEN = 'BQDcnnqHXs0gsJ0rOUMfFX35cB0d5nbhG4-vYqOpSPqpuILq3qRhc_wA2VbTbasuxoINGx_b9gfkyqHJBi0Z3QRRsA8LFDQsbGLHGkFViJdEqo_qzmsx6Rn_CELu0dQX06yp_vmIbLADxUphYHpw6Tw3nGAZft18HgA';


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

  getArtistTopTracks( artistId: string ) {
    return this.getQuery( `artists/${ artistId }/top-tracks?country=us` )
      .pipe( map( (data: any) => data.tracks));

  }

}
