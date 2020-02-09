import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {

  paises: any = [];

  constructor(private _httpClient: HttpClient) { }

  ngOnInit(): void {
    this._httpClient.get('https://restcountries.eu/rest/v2/lang/es').subscribe(x => this.paises = x);
  }

  drop(evento: CdkDragDrop<any>) {
    moveItemInArray(this.paises, evento.previousIndex, evento.currentIndex);
  }

}
