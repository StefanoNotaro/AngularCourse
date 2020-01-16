import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor( private _heroesService: HeroesService, private _activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    const heroeId = this._activatedRoute.snapshot.paramMap.get('id');

    if (heroeId !== 'nuevo') {
      this._heroesService.getHeroe(heroeId).subscribe( (resp: any) => {
        this.heroe = resp;
        this.heroe.id = heroeId;
      });
    }
  }

  guardar( heroeForm: NgForm ) {
    if ( heroeForm.invalid ) {
      console.log( 'Formulario no valido' );
      return;
    }

    Swal.fire({
      title: 'Espere!',
      text: 'Guardando información.',
      icon: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.heroe.id) {
      peticion = this._heroesService.actualizarHeroe(this.heroe);
    } else {
      peticion = this._heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizo correctamente',
        icon: 'success'
      });
    });

  }

  cambiarEstado() {
    this.heroe.vivo = !this.heroe.vivo;
  }

}
