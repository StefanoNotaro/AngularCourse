import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataBaseService } from '../../services/data-base.service';
import { Cliente } from '../models/cliente.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Sort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Servicio } from '../models/servicio.model';
import { ClientServiceBO } from '../models/clientServiceBO.model';
import { ClienteServicio } from '../models/cliente-servicio.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  forma: FormGroup;

  isEditionEnabled = false;

  public customPatterns = { 0: { pattern: new RegExp('\[a-zA-Z\]')} };

  @Input() isForModal = false;
  public ciMask = [/\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-' , /\d/];
  public dateMask = ['dd/mm/yyyy'];

  @Input() client: Cliente;
  
  @Output() guardado = new EventEmitter<Cliente>();

  services: Servicio[] = [];
  clientServices: ClienteServicio[] = [];
  clientServicesData: ClientServiceBO[] = [];

  displayedColumns: string[] = ['serviceName', 'cuotaMensual', 'fechaAsociado', 'tools'];
  length: number;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  actualPage = 0;
  selection = new SelectionModel<ClienteServicio>(true, []);

  constructor(public _activatedRoute: ActivatedRoute, private _databaseService: DataBaseService) {
    this.forma = new FormGroup({
      nombreCompleto: new FormControl(),
      fechaNacimiento: new FormControl(),
      cedula: new FormControl(),
      telefono: new FormControl(),
      direccion: new FormControl(),
      id: new FormControl()
    });

    this.forma.controls.nombreCompleto.setValidators( [ Validators.required ] );
    this.forma.controls.cedula.setValidators( [ Validators.required, this.ciValidation.bind( this.forma ) ] );
    this.forma.controls.telefono.setValidators( [ Validators.required ] );
    this.forma.controls.fechaNacimiento.setValidators( [ Validators.required ] );
    this.forma.controls.direccion.setValidators( [ Validators.required ] );
  }

  ngOnInit() {
    if (!this.isForModal) {
      this._activatedRoute.paramMap.subscribe(param => {
        this._databaseService.getClientById(param.get('id')).subscribe(client => {
          this.client = client;
          this._databaseService.getServicesForClients().subscribe(clientService => {
            this.clientServices = clientService.filter(y => y.clienteId === this.client.id);
            this._databaseService.getServices().subscribe(service => {
              this.services = service;
              this.clientServices.forEach(x => {
                this.services.forEach(serv => {
                  if (serv.id === x.servicioId) {
                    this.clientServicesData.push(
                      new ClientServiceBO(x.clienteId, serv.id, serv.cuotaMensual, serv.nombre, x.fechaAsociado, x.id)
                    );
                  }
                });
                this.forma.setValue(this.client);
              });
            });
          });
        }, err => {
          console.log('Oops:', err);
        });
      });
    } else {
      this._databaseService.getServicesForClients().subscribe(clientService => {
        this.clientServices = clientService.filter(y => y.clienteId === this.client.id);
        this._databaseService.getServices().subscribe(service => {
          this.services = service;
          this.clientServices.forEach(x => {
            this.services.forEach(serv => {
              if (serv.id === x.servicioId) {
                this.clientServicesData.push(
                  new ClientServiceBO(x.clienteId, serv.id, serv.cuotaMensual, serv.nombre, x.fechaAsociado, x.id)
                );
              }
            });
          });
          this.forma.setValue(this.client);
        });
      });
    }
    if (this.isForModal) {
      this.isEditionEnabled = true;
    }
  }

  deleteServiceForUser(row: ClientServiceBO, index: number) {
    const clientServiceToDelete: ClienteServicio = this.clientServices.filter(x => x.id === row.clienteServicioId).pop();
    this._databaseService.deleteServicesForClients(clientServiceToDelete).subscribe();
    this.clientServicesData.splice(index, 1);
    this.clientServicesData = this.clientServicesData.slice();
  }

  ciValidation( control: FormControl ): { [s: string]: boolean } {
    const forma: any = this;
    let validDigitVerificator = true;

    if (!control.value && control.pristine) {
      return null;
    }

    const ciValue = ciNormalization(control.value);

    validDigitVerificator = isCiValid(ciValue);

    if ( ciValue.length !== 8 || !validDigitVerificator ) {
      return {
        ciLengthValidation: ciValue.length === 8,
        isCiValid: validDigitVerificator
      };
    }

    return null;
  }

  saveChanges(forma) {
    this.client = this.forma.getRawValue();
    this.client.cedula = ciNormalization(this.client.cedula);
    const client = new Cliente(
      forma.controls.nombreCompleto.value,
      this.client.cedula,
      forma.controls.direccion.value,
      forma.controls.telefono.value,
      forma.controls.fechaNacimiento.value
    );
    if (forma.controls.id.value) {
      this._databaseService.updateClient(this.client).subscribe(x => {
        client.id = forma.controls.id.value;
        this.guardado.emit(
            client
          );
          }, err => {
            console.log('Oops:', err);
            this.guardado.emit(null);
          });
    } else {
      this._databaseService.postNewClient(client).subscribe(x => {
        this.guardado.emit(x as Cliente);
      }, err => {
        console.log('Error saving new client:', err);
        this.guardado.emit(null);
      });
    }
  }

  servicioSeleccionado(service, event) {
    if (!event.isUserInput) {
      return;
    }
    const clientServiceToAdd = new ClienteServicio(this.client.id, service.id, new Date().toString());
    this._databaseService.postNewServicesForClients(clientServiceToAdd)
    .subscribe((x: ClienteServicio) => {
      this.clientServices.push(x);
      this.clientServicesData.push(
        new ClientServiceBO(this.client.id, service.serviceId, service.cuotaMensual, service.nombre, clientServiceToAdd.fechaAsociado, x.id)
      );
      this.clientServicesData = this.clientServicesData.slice();
    });
  }

  toggleEdition() {
    this.isEditionEnabled = !this.isEditionEnabled;
  }

  loadPage(event) {
    const start = this.pageSize * event.pageIndex;
    this.clientServices = this.clientServices.slice(start, start + event.pageSize);
    this.pageSize = event.pageSize;
    this.actualPage = event.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  sortData(sort: Sort) {
    const data = this.clientServicesData.slice();
    if (!sort.active || sort.direction === '') {
      sort.active = 'id';
    }

    this.clientServicesData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'serviceName': return compare(a.serviceName, b.serviceName, isAsc);
        case 'cuotaMensual': return compare(a.cuota, b.cuota, isAsc);
        case 'fechaAsociado': return compare(a.fechaAsociado, b.fechaAsociado, isAsc);
        case 'id': return compare(a.clienteServicioId, b.clienteServicioId, true);
        default: return 0;
      }
    });
  }

}

function ciNormalization(value: string): string {
  value = value.split('.').join('');
  value = value.split('_').join('');
  value = value.split('-').join('');
  return value;
}

function isCiValid(ci: string): boolean {
  let isValid = true;
  const vectorReferencia = Array.from('2987634');
  const allDigits = Array.from(ci);
  const verificadorIngresado = +allDigits[7];

  let numeroVerificadorRaw = 0;
  for (let i = 0; i < vectorReferencia.length; i++) {
      numeroVerificadorRaw = numeroVerificadorRaw + (+allDigits[i] * +vectorReferencia[i]);
  }

  let verificadorCalculado = 10 - (numeroVerificadorRaw % 10);

  if (verificadorCalculado === 10) {
      verificadorCalculado = 0;
  }

  if (verificadorCalculado !== verificadorIngresado) {
    isValid = false;
  }

  return isValid;
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
