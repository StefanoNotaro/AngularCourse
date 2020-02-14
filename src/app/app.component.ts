import { Component } from '@angular/core';
import { DatabaseService } from './services/database.service';
import { Employees } from './models/employees.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PractiaEvaluation';
  constructor(private _databaseService: DatabaseService) {
  }

  addEmployee() {
    const employee = new Employees('TestName', 'TestLastName', 'Test@email.com');

    this._databaseService.postNewEmployee(employee).subscribe();
  }

  printEmployees() {
    this._databaseService.getData().subscribe(x => console.log(x));

    this._databaseService.getEmployeeById(1).subscribe(x => console.log(x));
  }
}
