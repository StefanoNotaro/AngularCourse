import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Servicio {
  id: number;
  nombre: string;
  cuotaMensual: number;

  constructor(nombre: string, cuotaMensual: number) {
    this.nombre = nombre;
    this.cuotaMensual = cuotaMensual;
  }
}
