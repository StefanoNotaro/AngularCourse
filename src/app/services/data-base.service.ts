import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../components/models/cliente.model';
import { Servicio } from '../components/models/servicio.model';
import { ClienteServicio } from '../components/models/cliente-servicio.model';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  baseUrl = 'http://localhost:3000';

  constructor(private _httpClient: HttpClient) { }

  getClients() {
    return this._httpClient.get<Cliente[]>(`${this.baseUrl}/cliente`);
  }

  getClientById(clientId: number | string) {
    return this._httpClient.get<Cliente>(`${this.baseUrl}/cliente/${clientId}`);
  }

  updateClient(client: Cliente) {
    return this._httpClient.put(`${this.baseUrl}/cliente/${ client.id }`, client);
  }

  deleteClient(client: Cliente) {
    return this._httpClient.delete(`${ this.baseUrl }/cliente/${ client.id }`);
  }

  postNewClient(client: Cliente) {
    return this._httpClient.post(`${this.baseUrl}/client`, client);
  }

  getServices() {
    return this._httpClient.get<Servicio[]>(`${this.baseUrl}/servicios`);
  }

  updateService(service: Servicio) {
    return this._httpClient.put(`${this.baseUrl}/servicios/${ service.id }`, service);
  }

  deleteService(service: Servicio) {
    return this._httpClient.delete(`${ this.baseUrl }/servicios/${ service.id }`);
  }

  postNewService(service: Servicio) {
    return this._httpClient.post(`${this.baseUrl}/servicios`, service);
  }

  getServicesForClients() {
    return this._httpClient.get<ClienteServicio[]>(`${this.baseUrl}/clienteServicio`);
  }

  updateServicesForClients(clienteServicio: ClienteServicio) {
    return this._httpClient.put(`${this.baseUrl}/clienteServicio/${ clienteServicio.id }`, clienteServicio);
  }

  deleteServicesForClients(clienteServicio: ClienteServicio) {
    return this._httpClient.delete(`${ this.baseUrl }/clienteServicio/${ clienteServicio.id }`);
  }

  postNewServicesForClients(clienteServicio: ClienteServicio) {
    return this._httpClient.post(`${this.baseUrl}/clienteServicio`, clienteServicio);
  }
}