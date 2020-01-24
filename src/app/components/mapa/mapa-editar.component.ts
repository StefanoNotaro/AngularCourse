import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-mapa-editar',
  templateUrl: './mapa-editar.component.html',
  styleUrls: ['./mapa-editar.component.css']
})
export class MapaEditarComponent implements OnInit {

  forma: FormGroup;

  constructor(public dialogRef: MatDialogRef<MapaEditarComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public formBuilder: FormBuilder) {

    this.forma = formBuilder.group({
      titulo: data.titulo,
      descripcion: data.descripcion
    });
  }

  ngOnInit() {
  }

  guardarCambios() {
    this.onNoClick(this.forma.value);
  }

  onNoClick(data = null): void {
    this.dialogRef.close(data);
  }

}
