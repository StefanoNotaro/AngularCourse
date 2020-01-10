import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  recordarme = true;

  constructor( private _auth: AuthService, private _router: Router ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit( registroForm: NgForm ) {
    if (registroForm.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor',
      icon: 'info'
    });
    Swal.showLoading();

    this._auth.nuevoUsuario( this.usuario ).subscribe( x => {
      Swal.close();
      if ( this.recordarme ) {
        localStorage.setItem('email', this.usuario.email);
      }
      this._router.navigateByUrl( '/home' );
    }, x => {
      Swal.fire({
        allowOutsideClick: true,
        text: 'Email ya esiste!',
        icon: 'error'
      });
    } );
  }

}
