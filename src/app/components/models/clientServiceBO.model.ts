export class ClientServiceBO {
    clienteServicioId: number;
    clientId: number;
    serviceId: number;
    cuota: number;
    serviceName: string;
    fechaAsociado: string;

    constructor(clientId: number, serviceId: number, cuota: number, serviceName: string, fechaAsociado: string, clienteServicioId: number) {
        this.clienteServicioId = clienteServicioId;
        this.clientId = clientId;
        this.serviceId = serviceId;
        this.cuota = cuota;
        this.serviceName = serviceName;
        this.fechaAsociado = fechaAsociado;
    }
}
