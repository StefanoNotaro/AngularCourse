import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ClienteServicio {
  clienteId: number;
  servicioId: number;
  fechaAsociado: string;

  constructor(clienteId: number, servicioId: number, fechaAsociado: string) {
    this.clienteId = clienteId;
    this.servicioId = servicioId;
    this.fechaAsociado = fechaAsociado;
  }
}
