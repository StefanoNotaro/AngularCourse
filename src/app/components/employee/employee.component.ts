import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employees } from '../../models/employees.model';
import { DatabaseService } from '../../services/database.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  @Input() buttonIcon: string;
  @Input() employee: Employees;
  @Output() propagar = new EventEmitter<string>();

  modalTitle = '';
  
  forma: FormGroup;
  
  closeResult: string;

  constructor(private _databaseService: DatabaseService, private modalService: NgbModal) {
    this.forma = new FormGroup({
      email: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
    });
    this.forma.controls.email.setValidators( [ Validators.required,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-0.-]+\.[a-z]{2,3}$') ] );

    this.forma.controls.firstName.setValidators( [ Validators.required, Validators.minLength(3) ] );
  }

  onPropagar() {
    this.propagar.emit('true');
  }

  open(content) {
    if (this.buttonIcon === 'edit') {
      this.forma.controls.firstName.setValue(this.employee.firstName);
      this.forma.controls.lastName.setValue(this.employee.lastName);
      this.forma.controls.email.setValue(this.employee.email);
      this.modalTitle = `${this.employee.firstName} ${this.employee.lastName}`
    } else {
      this.modalTitle = 'Nuevo empleado';
    }

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (this.forma.valid) {
        if (this.employee) {
          const employeeToEdit = new Employees(
            this.forma.controls.firstName.value,
            this.forma.controls.lastName.value,
            this.forma.controls.email.value);
          this._databaseService.updateEmployee(employeeToEdit, this.employee.id).subscribe(x => this.propagar.emit('edited'));
        } else {
            const newEmployee = new Employees(
              this.forma.controls.firstName.value,
              this.forma.controls.lastName.value,
              this.forma.controls.email.value);
            this._databaseService.postNewEmployee(newEmployee).subscribe(x => this.propagar.emit('added'));
        }
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.forma.reset();
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit() {
  }

  guardar() {
  }

}
