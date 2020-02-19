import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatSortModule, MatCheckboxModule } from '@angular/material';



@NgModule({
  declarations: [],
  exports: [
    MatTableModule,
    MatSortModule,
    MatCheckboxModule
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule
  ]
})
export class MaterialsModule { }
