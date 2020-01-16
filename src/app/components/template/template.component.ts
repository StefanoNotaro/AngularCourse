import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'Stefano',
    apellido: 'Notaro Francesco',
    email: 'stefano.notaro@gmail.com',
    pais: '',
    sexo: 'Mujer',
    acepta: false
  };

  paises = [
    { codigo: 'CRI', nombre: 'Costa Rica' },
    { codigo: 'UYU', nombre: 'Uruguay' },
    { codigo: 'ARG', nombre: 'Argentina' },
    { codigo: 'BRA', nombre: 'Brazil' },
    { codigo: 'ESP', nombre: 'España' }
  ];

  sexos = [ 'Mujer', 'Hombre', 'Otro' ];

  constructor() { }

  ngOnInit() {
  }

  guardar( forma: NgForm ) {
    console.log( 'Formulario posteado' );
    console.log( 'NgForm: ', forma );
    console.log( 'Valor: ', forma.value );
    console.log( 'Controls: ', forma.controls );
  }

}
