export class Cliente {
  id: number;
  nombreCompleto: string;
  cedula: string;
  direccion: string;
  telefono: string;
  fechaNacimiento: string;

  constructor(nombreCompleto: string, cedula: string, direccion: string, telefono: string, fechaNacimiento: string, id?: number) {
    if (id) {
      this.id = id;
    }
    this.nombreCompleto = nombreCompleto;
    this.cedula = cedula;
    this.direccion = direccion;
    this.telefono = telefono;
    this.fechaNacimiento = fechaNacimiento;
  }
}
