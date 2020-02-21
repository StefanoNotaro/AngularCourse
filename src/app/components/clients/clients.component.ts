import { Component, OnInit, ViewChild} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { DataBaseService } from '../../services/data-base.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Cliente } from '../models/cliente.model';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  openModal = false;

  length: number;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  actualPage = 0;

  selectedClient: Cliente;

  displayCheckBox = false;

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
    if (this.displayCheckBox) {
      this.displayedColumns.unshift('select');
    }
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.clients.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.clients.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Cliente): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  clientInfo(client) {
    this._router.navigate(['/cliente', client.id]);
  }

  deleteClient(client: Cliente, index: number) {
    index = this.actualPage * this.pageSize + index;
    this._databaseService.deleteClient(client).subscribe(x => {
      this.allClients.splice(index, 1);
      const start = this.pageSize * this.actualPage;
      this.clients = this.allClients.slice(start, start + this.pageSize);
      this.length = this.length - 1;
    });
  }

  newClient(newClientModal) {
    // const start = this.pageSize * event.pageIndex;
    // this.clients = this.allClients.slice(start, start + event.pageSize);
    this.modalService.open(newClientModal, {ariaLabelledBy: 'modal-basic-title', size: 'lg'})
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        console.log(reason);
        if (reason) {
          this.clients.push(reason);
          this.allClients.push(reason);
          this.clients = this.clients.slice();
          this.length += 1;
        }
      });
  }

  open(content, client: Cliente, index: number) {

    this.selectedClient = client;
    this.openModal = !this.openModal;

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'})
      .result.then((result) => {
      }, (reason) => {
        console.log(typeof reason);
        if (reason instanceof Cliente) {
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
