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
