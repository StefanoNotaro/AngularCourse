import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule,
  MatSortModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatToolbarModule,
  MatIconModule,
  MatSelectModule,
  MatTooltipModule } from '@angular/material';

@NgModule({
  declarations: [],
  exports: [
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule
  ]
})
export class MaterialsModule { }
