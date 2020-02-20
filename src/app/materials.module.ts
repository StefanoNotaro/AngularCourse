import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatSortModule, MatCheckboxModule, MatPaginatorModule, MatToolbarModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [],
  exports: [
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule
  ]
})
export class MaterialsModule { }
