import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-style',
  template: `
    <p [style.fontSize.px]="size">
      Hola mundo.. Esto es una etiqueta
    </p>
    <button class="btn btn-outline-primary" (click)="plus()">
      <i class="fa fa-plus"></i>
    </button>
    <button class="btn btn-outline-primary" (click)="minus()">
      <i class="fa fa-minus"></i>
    </button>
  `,
  styles: []
})
export class NgStyleComponent implements OnInit {

  size = 20;

  constructor() { }

  ngOnInit() {
  }

  plus() {
    this.size += 5;
  }

  minus() {
    if (this.size > 0) {
      this.size -= 5;
    }
  }

}
