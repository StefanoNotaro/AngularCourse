import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule,
  MatSortModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatToolbarModule,
  MatIconModule,
  MatSelectModule,
  MatTooltipModule,
  MatExpansionModule,
  MatInputModule } from '@angular/material';

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
    MatTooltipModule,
    MatExpansionModule,
    MatInputModule
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
    MatTooltipModule,
    MatExpansionModule,
    MatInputModule
  ]
})
export class MaterialsModule { }
