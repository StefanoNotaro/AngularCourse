import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employees } from '../models/employees.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  url = 'http://localhost:3000/employees';

  constructor(private _httpClient: HttpClient) { }

  getData() {
    return this._httpClient.get<Employees[]>(this.url);
  }

  getEmployeeById(id: number) {
    return this._httpClient.get<Employees>(`${this.url}/${ id }`);
  }

  postNewEmployee(employee: Employees) {
    return this._httpClient.post(this.url, employee);
  }

  updateEmployee(employee: Employees, employeeId: number) {
    return this._httpClient.put(`${this.url}/${ employeeId }`, employee);
  }

  deleteEmployee(employee: Employees) {
    return this._httpClient.delete(`${ this.url }/${ employee.id }`);
  }
}
