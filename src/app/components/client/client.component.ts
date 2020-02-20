import { Component, OnInit, Input } from '@angular/core';
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

  @Input() isForModal = false;
  public ciMask = [/\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-' , /\d/];
  public dateMask = ['dd/mm/yyyy'];

  @Input() client: Cliente;
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
    // console.log(this.isForModal);
    // console.log(this.client);
    console.log(this.client);
    if (!this.isForModal) {
      this._activatedRoute.paramMap.subscribe(param => {
        this._databaseService.getClientById(param.get('id')).subscribe(client => {
          this.client = client;
          console.log(client);
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
      this._activatedRoute.paramMap.subscribe(param => {
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
          });
        });
      });
      this.forma.setValue(this.client);
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

  saveChanges() {
    this.client = this.forma.getRawValue();
    this.client.cedula = ciNormalization(this.client.cedula);
    console.log(this.forma);
    this._databaseService.updateClient(this.client).subscribe(x => {
      console.log('Guardad!');
    }, err => {
      console.log('Oops:', err);
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
    const data = this.clientServices.slice();
    if (!sort.active || sort.direction === '') {
      sort.active = 'id';
    }

    this.clientServices = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nombre': return compare(a.nombre, b.nombre, isAsc);
        case 'cuotaMensual': return compare(a.cuotaMensual, b.cuotaMensual, isAsc);
        case 'id': return compare(a.id, b.id, true);
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
