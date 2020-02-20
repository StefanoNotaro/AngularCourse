import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatSortModule, MatCheckboxModule, MatPaginatorModule } from '@angular/material';



@NgModule({
  declarations: [],
  exports: [
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatPaginatorModule
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatPaginatorModule
  ]
})
export class MaterialsModule { }
