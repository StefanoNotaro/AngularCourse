import { Servicio } from './servicio.model';
export class ClientServiceBO {
    clienteServicioId: number;
    clientId: number;
    serviceId: number;
    cuota: number;
    serviceName: string;
    fechaAsociado: string;
    clientName: string;

    constructor(clientId: number, serviceId: number, cuota: number, serviceName: string, fechaAsociado: string, clienteServicioId: number, clientName?: string) {
        this.clienteServicioId = clienteServicioId;
        this.clientId = clientId;
        this.serviceId = serviceId;
        this.cuota = cuota;
        this.serviceName = serviceName;
        this.fechaAsociado = fechaAsociado;
        this.clientName = clientName;
    }
}

export class GroupedServicesByClients {
    clientId: number;
    clientName: string;
    total: number;
    services: Servicio[] = [];

    constructor(clientId: number, clientName: string, total: number, service: Servicio) {
        this.clientId = clientId;
        this.clientName = clientName;
        this.total = total;
        this.services.push(service);
    }
}
