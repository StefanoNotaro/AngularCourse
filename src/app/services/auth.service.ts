import { Injectable } from '@angular/core';
import { HttpClient, ɵangular_packages_common_http_http_a } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accountsUrl = 'https://identitytoolkit.googleapis.com/v1';

  private apiKey = 'AIzaSyB2e4gbxx7QRYo5gxcCe-UVN7p54WC6XKU';

  userToken: string;

  constructor( private _httpClient: HttpClient) {
    this.leerToken();
  }

  logout() {
    localStorage.removeItem( 'token' );
  }

  login( usuario: UsuarioModel ) {
    const AUTH_DATA = {
      ...usuario,
      returnSecureToken: true
    };

    const POST_URL = `${ this.accountsUrl }/accounts:signInWithPassword?key=${ this.apiKey }`;
    return this._httpClient.post( POST_URL, AUTH_DATA )
      .pipe(
        map( (resp: any) => {
          this.guardarToken( resp );
          return resp;
        } )
      );
  }

  nuevoUsuario( usuario: UsuarioModel ) {
    const AUTH_DATA = {
      ...usuario,
      returnSecureToken: true

    };

    const POST_URL = `${ this.accountsUrl }/accounts:signUp?key=${ this.apiKey }`;
    return this._httpClient.post( POST_URL, AUTH_DATA )
      .pipe(
        map( (resp: any) => {
          this.guardarToken( resp );
          return resp;
        } )
      );
  }

  private guardarToken( info: any ) {
    this.userToken = info.idToken;
    localStorage.setItem( 'token', this.userToken );
    
    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem( 'expira', hoy.getTime().toString() );
  }

  leerToken() {
    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado(): boolean {
    if ( this.userToken.length < 2 ) {
      return false;
    }

    const EXPIRA = Number( localStorage.getItem('expira') );
    const EXPIRA_DATE = new Date();

    EXPIRA_DATE.setTime(EXPIRA);

    if ( EXPIRA_DATE > new Date() ) {
      return false;
    } else {
      return true;
    }
  }

}
