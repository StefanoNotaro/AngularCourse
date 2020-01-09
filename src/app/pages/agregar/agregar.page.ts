import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;

  nombreItem = '';
  
  constructor( private _deseosService: DeseosService, private _activatedRoute: ActivatedRoute ) {
    const listaId = _activatedRoute.snapshot.paramMap.get( 'listaId' );

    this.lista = _deseosService.obtenerList( listaId );
  }

  ngOnInit() {
  }

  agregarItem() {
    if ( this.nombreItem.length <= 0 ) {
      return;
    }

    const nuevoItem = new ListaItem( this.nombreItem );

    this.lista.items.push(nuevoItem);
    this.nombreItem = '';

    this.lista.terminada = false;
    this.lista.terminadaEn = null;

    this._deseosService.guardarStorage();
  }

  cambioCheck( item: ListaItem ) {
    const pendientes = this.lista.items.filter( x => !x.completado ).length;

    if (pendientes === 0) {
      this.lista.terminada = true;
      this.lista.terminadaEn = new Date();
    } else {
      this.lista.terminada = false;
      this.lista.terminadaEn = null;

    }

    this._deseosService.guardarStorage();
  }

  borrarItem( positionOfItem: number ) {
    this.lista.items.splice( positionOfItem, 1 );

    this.cambioCheck( new ListaItem('Dummy') );

    this._deseosService.guardarStorage();
  }

}
