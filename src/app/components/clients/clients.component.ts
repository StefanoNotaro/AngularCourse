import { Component, OnInit, ViewChild} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataBaseService } from '../../services/data-base.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Cliente } from '../models/cliente.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  constructor(private _databaseService: DataBaseService) {
    _databaseService.getClients().subscribe(x => {
      this.clients = x;
    });
  }

  displayedColumns: string[] = ['select', 'nombreCompleto', 'cedula', 'tools'];
  // clients = new MatTableDataSource<Cliente>();
  clients: Cliente[] = [];
  selection = new SelectionModel<Cliente>(true, []);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    // this.clients.sort = this.sort;
  }

  sortData(sort: Sort) {
    console.log(sort);
    const data = this.clients.slice();
    if (!sort.active || sort.direction === '') {
      this.clients = data;
      return;
    }

    this.clients = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nombreCompleto': return compare(a.nombreCompleto, b.nombreCompleto, isAsc);
        case 'cedula': return compare(a.cedula, b.cedula, isAsc);
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
    console.log(client);
  }

  deleteClient(client) {
    const tmp = this._databaseService.deleteClient(client).subscribe(x => {
      this._databaseService.getClients().subscribe(y => {
        this.clients = y;
      });
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
