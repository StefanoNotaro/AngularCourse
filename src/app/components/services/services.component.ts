import { Component, OnInit } from '@angular/core';
import { Servicio } from '../models/servicio.model';
import { DataBaseService } from '../../services/data-base.service';
import { Sort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationBO } from '../models/notificationBO.model';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  forma: FormGroup;

  showDeleteNotification = false;
  showEditionNotification = false;
  notificationConfigurations: NotificationBO;

  length: number;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  actualPage = 0;
  indexTorefresh: number;

  displayedColumns: string[] = ['nombre', 'cuotaMensual', 'tools'];

  services: Servicio[] = [];
  allServices: Servicio[] = [];
  selection = new SelectionModel<Servicio>(true, []);

  constructor(private _databaseService: DataBaseService, private modalService: NgbModal) {
    this.forma = new FormGroup({
      nombre: new FormControl(),
      cuota: new FormControl(),
      id: new FormControl()
    });

    this.forma.controls.nombre.setValidators( [ Validators.required ] );
    this.forma.controls.cuota.setValidators( [ Validators.required, Validators.pattern('^[0-9]*$') ] );

    _databaseService.getServices().subscribe(x => {
      this.services = x.slice(0, this.pageSize);
      this.length = x.length;
      this.allServices = x;
    });
  }

  ngOnInit() {
  }

  loadPage(event) {
    const start = this.pageSize * event.pageIndex;
    this.services = this.allServices.slice(start, start + event.pageSize);
    this.pageSize = event.pageSize;
    this.actualPage = event.pageIndex;
  }
  
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  
  sortData(sort: Sort) {
    const data = this.services.slice();
    if (!sort.active || sort.direction === '') {
      sort.active = 'id';
    }

    this.services = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nombre': return compare(a.nombre, b.nombre, isAsc);
        case 'cuotaMensual': return compare(a.cuotaMensual, b.cuotaMensual, isAsc);
        case 'id': return compare(a.id, b.id, true);
        default: return 0;
      }
    });
  }

  deleteService(service: Servicio, index: number) {
    this.indexTorefresh = this.actualPage * this.pageSize + index;
    this.notificationConfigurations = new NotificationBO('warning', `Desea borrar el ${service.nombre} ?`, true, true, service);
    this.showDeleteNotification = true;
  }

  deleteServiceConfirmation(configuration: NotificationBO) {
    if (configuration.confirmation) {
      this._databaseService.deleteService(configuration.object as Servicio).subscribe(x => {
        this.allServices.splice(this.indexTorefresh, 1);
        const start = this.pageSize * this.actualPage;
        this.services = this.allServices.slice(start, start + this.pageSize);
        this.length = this.length - 1;
      });
    }
    this.showDeleteNotification = false;
  }

  newService(newServiceModal) {
    this.modalService.open(newServiceModal, {ariaLabelledBy: 'modal-basic-title', size: 'lg'})
      .result.then((result) => {
        const newService = new Servicio(result.nombre.value, +result.cuota.value);
        this._databaseService.postNewService(newService).subscribe((x: Servicio) => {
          this.services.unshift(x);
          this.allServices.unshift(x);
          const start = this.pageSize * this.actualPage;
          this.services = this.allServices.slice(start, start + this.pageSize);
          this.length += 1;
          this.forma.reset();
        });
      }, (reason) => {
        this.forma.reset();
      });
  }

  editService(service: Servicio, newServiceModal, index: number) {
    this.forma.controls.cuota.setValue(service.cuotaMensual);
    this.forma.controls.nombre.setValue(service.nombre);
    this.forma.controls.id.setValue(service.id);
    this.modalService.open(newServiceModal, {ariaLabelledBy: 'modal-basic-title', size: 'lg'})
    .result.then((result) => {
      this.notificationConfigurations = new NotificationBO('success', `Datos actualizados correctamente`);
      this.showEditionNotification = true;
      const editedService = new Servicio(result.nombre.value, +result.cuota.value);
      editedService.id = result.id.value;
      const allServiceIndex = this.actualPage * this.pageSize + index;
      this.allServices[allServiceIndex] = {...editedService};
      this.services[index] = {...editedService};
      this.services = this.services.slice();

      this._databaseService.updateService(editedService)
        .subscribe((x: Servicio) => {
          console.log('X:', x);
        });
      this.forma.reset();
      }, (reason) => {
        this.forma.reset();
      });
  }

  editServiceConfirmation(notificationConfiguration: NotificationBO) {
    if (notificationConfiguration.confirmation) {
      console.log(notificationConfiguration);
    }

    this.showEditionNotification = false;
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
