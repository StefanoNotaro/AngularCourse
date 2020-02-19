import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../components/modules/cliente/cliente.module';
import { Servicio } from '../components/modules/servicio/servicio.module';
import { ClienteServicio } from '../components/modules/cliente-servicio/cliente-servicio.module';

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
}
