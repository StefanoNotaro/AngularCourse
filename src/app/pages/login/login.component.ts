import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new UsuarioModel();

  recordarme = true;

  constructor( private _authService: AuthService, private _router: Router ) { }

  ngOnInit() {
    if ( this.recordarme ) {
      this.usuario.email = localStorage.getItem( 'email' );
    }
  }

  login( formLogin: NgForm ) {
    if (formLogin.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor',
      icon: 'info'
    });
    Swal.showLoading();

    this._authService.login(this.usuario).subscribe(x => {
      Swal.close();
      this._router.navigateByUrl( '/home' );

      if ( this.recordarme ) {
        localStorage.setItem( 'email', this.usuario.email );
      }
    }, x => {
      Swal.fire({
        allowOutsideClick: true,
        text: 'Usuario/Contraseña incorrecto!',
        icon: 'error'
      });
    });
  }

}
