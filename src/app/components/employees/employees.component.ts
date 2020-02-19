import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employees } from '../../models/employees.model';
import { DatabaseService } from '../../services/database.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employees[] = [];
  successMessage: string;

  constructor(private _databaseService: DatabaseService, public _toastService: ToastService) {
    _databaseService.getData().subscribe(x => {
      this.employees = x;
    });
  }

  ngOnInit() {
  }

  deleteEmployee(employee: Employees, index: number) {
    this._databaseService
      .deleteEmployee(employee)
      .subscribe(x => {
        this.employees.splice(index, 1);
      });
  }

  updateEmployees(event: any) {
    this._databaseService.getData().subscribe(x => {
      this.employees = x;
      if (event === 'edited') {
        this._toastService.showSuccess('Employee updated correctly');
      } else {
        this._toastService.showSuccess('Employee added correctly');
      }
    });
  }

}
