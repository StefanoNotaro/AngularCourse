import { Component, OnInit, ViewChild} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { DataBaseService } from '../../services/data-base.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Cliente } from '../models/cliente.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  openModal = false;

  showNotification = false;
  notificationTitle = '';
  icon = 'success';
  showCancelButton = false;

  length: number;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  actualPage = 0;

  selectedClient: Cliente;
  clientToDelete: Cliente;
  indexTorefresh: number;

  displayedColumns: string[] = ['nombreCompleto', 'cedula', 'tools'];
  clients: Cliente[] = [];
  allClients: Cliente[] = [];
  selection = new SelectionModel<Cliente>(true, []);

  closeResult: string;

  constructor(private _databaseService: DataBaseService, private _router: Router, private modalService: NgbModal) {
    _databaseService.getClients().subscribe(x => {
      this.clients = x.slice(0, this.pageSize);
      this.length = x.length;
      this.allClients = x;
    });
  }

  ngOnInit() {
  }

  loadPage(event) {
    const start = this.pageSize * event.pageIndex;
    this.clients = this.allClients.slice(start, start + event.pageSize);
    this.pageSize = event.pageSize;
    this.actualPage = event.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  sortData(sort: Sort) {
    const data = this.clients.slice();
    if (!sort.active || sort.direction === '') {
      sort.active = 'id';
    }

    this.clients = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nombreCompleto': return compare(a.nombreCompleto, b.nombreCompleto, isAsc);
        case 'cedula': return compare(a.cedula, b.cedula, isAsc);
        case 'id': return compare(a.id, b.id, true);
        default: return 0;
      }
    });
  }

  clientInfo(client) {
    this._router.navigate(['/cliente', client.id]);
  }

  deleteClient(client: Cliente, index: number) {
    this.clientToDelete = client;
    console.log(this.clientToDelete);
    this.indexTorefresh = index;
    index = this.actualPage * this.pageSize + index;
    this.notificationTitle = `Desea borrar a ${client.nombreCompleto}?`;
    this.icon = 'warning';
    this.showCancelButton = true;
    this.showNotification = true;
    
    // this._databaseService.deleteClient(client).subscribe(x => {
    //   this.allClients.splice(index, 1);
    //   const start = this.pageSize * this.actualPage;
    //   this.clients = this.allClients.slice(start, start + this.pageSize);
    //   this.length = this.length - 1;
    // });
  }

  deleteClientFromDataBase(response) {
    if (response !== -1) {
      this._databaseService.deleteClient(this.clientToDelete).subscribe(x => {
        this.allClients.splice(this.indexTorefresh, 1);
        const start = this.pageSize * this.actualPage;
        this.clients = this.allClients.slice(start, start + this.pageSize);
        this.length = this.length - 1;
      });
    }
    this.showNotification = false;
  }

  newClient(newClientModal) {
    this.modalService.open(newClientModal, {ariaLabelledBy: 'modal-basic-title', size: 'lg'})
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        if (reason && reason !== 1) {
          this.clients.unshift(reason);
          this.allClients.unshift(reason);
          const start = this.pageSize * this.actualPage;
          this.clients = this.allClients.slice(start, start + this.pageSize);
          this.length += 1;
        }
      });
  }

  editClient(content, client: Cliente, index: number) {
    this.selectedClient = client;
    this.openModal = !this.openModal;

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'})
      .result.then((result) => {
      }, (reason) => {
        console.log(typeof reason);
        if (reason instanceof Cliente) {
          const allClientIndex = this.actualPage * this.pageSize + index;
          this.allClients[allClientIndex] = {...reason};
          this.clients[index] = {...reason};
          this.clients = this.clients.slice();
        }
      });
  }

  guardado(guardado) {
    this.modalService.dismissAll(guardado);
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
