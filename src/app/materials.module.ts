import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule,
  MatSortModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatToolbarModule,
  MatIconModule,
  MatSelectModule } from '@angular/material';

@NgModule({
  declarations: [],
  exports: [
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule
  ]
})
export class MaterialsModule { }
