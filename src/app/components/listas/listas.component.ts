import { Component, OnInit, Input } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() terminada = true;

  listas: Lista[] = [];

  constructor( public _deseosService: DeseosService, private _router: Router, private _alertController: AlertController ) {
    this.listas = _deseosService.listas;
  }

  ngOnInit() {}

  listaSeleccionada( lista: Lista ) {
    if (this.terminada) {
      this._router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
    } else {
      this._router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    }
  }

  async editarListaAsync( lista: Lista ) {
    const alert = await this._alertController.create({
      header: 'Edición',
      inputs: [
        {
          name: 'titulo',
            id: 'alertPrompt',
            type: 'text',
            value: `${ lista.titulo }`
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
            }
          },
          {
            text: 'Guardar',
            handler: ( data ) => {
              if (data.titulo.length === 0) {
                return;
              }

              lista.titulo = data.titulo;
              this._deseosService.guardarStorage();
            }
          }
        ]
      });

    alert.present().then( () => { document.getElementById( 'alertPrompt' ).focus(); });
  }

  guardar() {
    console.log('object');
  }

  borrarLista( lista: Lista ) {
    this._deseosService.borrarLista( lista );
  }

}
