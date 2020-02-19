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

  getServices() {
    return this._httpClient.get<Servicio[]>(`${this.baseUrl}/servicios`);
  }

  getServicesForClients() {
    return this._httpClient.get<ClienteServicio[]>(`${this.baseUrl}/clienteServicio`);
  }

  updateClient(client: Cliente, clientId: number) {
    return this._httpClient.put(`${this.baseUrl}/cliente/${ clientId }`, client);
  }

  deleteClient(client: Cliente) {
    return this._httpClient.delete(`${ this.baseUrl }/cliente/${ client.id }`);
  }

  postNewEmployee(client: Cliente) {
    return this._httpClient.post(`${this.baseUrl}/client`, client);
  }
}
