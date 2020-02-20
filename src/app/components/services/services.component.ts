import { Component, OnInit } from '@angular/core';
import { Servicio } from '../models/servicio.model';
import { DataBaseService } from '../../services/data-base.service';
import { Sort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  length: number;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  actualPage = 0;

  displayedColumns: string[] = ['nombre', 'cuotaMensual', 'tools'];

  displayCheckBox = false;

  services: Servicio[] = [];
  allServices: Servicio[] = [];
  selection = new SelectionModel<Servicio>(true, []);

  constructor(private _databaseService: DataBaseService) {
    _databaseService.getServices().subscribe(x => {
      this.services = x.slice(0, this.pageSize);
      this.length = x.length;
      this.allServices = x;
    });
    if (this.displayCheckBox) {
      this.displayedColumns.unshift('select');
    }
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
        case 'nomnre': return compare(a.nombre, b.nombre, isAsc);
        case 'cuotaMensual': return compare(a.cuotaMensual, b.cuotaMensual, isAsc);
        case 'id': return compare(a.id, b.id, true);
        default: return 0;
      }
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.services.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.services.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Servicio): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  serviceInfo(service) {
    console.log(service);
  }

  deleteService(service: Servicio, index: number) {
    index = this.actualPage * this.pageSize + index;
    this._databaseService.deleteService(service).subscribe(x => {
      this.allServices.splice(index, 1);
      const start = this.pageSize * this.actualPage;
      this.services = this.allServices.slice(start, start + this.pageSize);
      this.length = this.length - 1;
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

