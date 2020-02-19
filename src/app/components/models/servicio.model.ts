export class Servicio {
  id: number;
  nombre: string;
  cuotaMensual: number;

  constructor(nombre: string, cuotaMensual: number) {
    this.nombre = nombre;
    this.cuotaMensual = cuotaMensual;
  }
}
