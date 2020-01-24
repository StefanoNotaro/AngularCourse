import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];

  latitude = -34.9052051;
  longitude = -56.1643114;

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {
    if (localStorage.getItem('marcadores')) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
  }

  ngOnInit() {
  }

  agregarMarcador( event ) {
    console.log(event);
    this.marcadores.push(new Marcador(event.coords.lat, event.coords.lng));
    this.guardarStorage();
    this.snackBar.open('Marcador Agregado', 'Cerrar', { duration: 2000 });
  }

  borrarMarcador(index: number) {
    this.marcadores.splice(index, 1);
    this.guardarStorage();
    this.snackBar.open('Marcador Borrado', 'Cerrar', { duration: 2000 });
  }

  editarMarcador(marcador: Marcador) {
    console.log(marcador);
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: {
        titulo: marcador.titulo,
        descripcion: marcador.descripcion
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      marcador.titulo = result.titulo;
      marcador.descripcion = result.descripcion;
      this.guardarStorage();
      this.snackBar.open('Marcador actualizado', 'Cerrar', { duration: 2000 });
    });
  }

  guardarStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }

}
