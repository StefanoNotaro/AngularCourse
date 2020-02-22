import { Component } from '@angular/core';
import { DataBaseService } from '../../services/data-base.service';
import { Cliente } from '../models/cliente.model';
import { Servicio } from '../models/servicio.model';
import { ClienteServicio } from '../models/cliente-servicio.model';
import { ClientServiceBO, GroupedServicesByClients } from '../models/clientServiceBO.model';

@Component({
  selector: 'app-clients-report',
  templateUrl: './clients-report.component.html',
  styleUrls: ['./clients-report.component.css']
})
export class ClientsReportComponent {

  clients: Cliente[] = [];
  services: Servicio[] = [];
  servicesByClients: ClienteServicio[] = [];
  groupedServicesByClients: GroupedServicesByClients[] = [];

  panelOpenState = false;

  constructor(private _databaseService: DataBaseService) {
    _databaseService.getClients().subscribe(clients => {
      this.clients = clients;
      _databaseService.getServices().subscribe(services => {
        this.services = services;
        _databaseService.getServicesForClients().subscribe(serviceByUsers => {
          this.servicesByClients = serviceByUsers;
          serviceByUsers.forEach(x => {
            const service = services.filter(serv => serv.id === x.servicioId).pop() as Servicio;
            const client = clients.filter(cli => cli.id === x.clienteId).pop() as Cliente;
            if (client !== undefined) {
              const groupedServiceByClient = this.groupedServicesByClients.filter(y => y.clientId === x.clienteId).pop() as GroupedServicesByClients;
              if (groupedServiceByClient === null || groupedServiceByClient === undefined) {
                this.groupedServicesByClients.push(new GroupedServicesByClients(
                  x.clienteId,
                  client.nombreCompleto,
                  service.cuotaMensual,
                  service,
                  ));
                } else {
                  groupedServiceByClient.total += service.cuotaMensual;
                  groupedServiceByClient.services.push(service);
                }
            }
          });
        });
      });
    });


  }

}
