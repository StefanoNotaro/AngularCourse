import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Cliente {
  id: number;
  nombreCompleto: string;
  cedula: string;
  direccion: string;
  telefono: string;
  fechaNacimiento: string;

  constructor(nombreCompleto: string, cedula: string, direccion: string, telefono: string, fechaNacimiento: string) {
    this.nombreCompleto = nombreCompleto;
    this.cedula = cedula;
    this.direccion = direccion;
    this.telefono = telefono;
    this.fechaNacimiento = fechaNacimiento;
  }
}
