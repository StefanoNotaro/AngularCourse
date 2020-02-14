import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from 'src/app/interfaces/interfaces';
import Swal from 'sweetalert2'
import { ok } from 'assert';

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css']
})
export class GotyComponent implements OnInit {

  juegos: Game[] = [];

  constructor(private _gameService: GameService) { }

  ngOnInit() {
    this._gameService.getNominados()
      .subscribe(x => {
        this.juegos = x;
      });
  }

  votar(juego: Game) {
    this._gameService
      .votarJuego(juego.id)
      .subscribe((x: { ok: boolean, message: string, error: { message: string } }) => {
        if (x.ok) {
          Swal.fire({
            title: 'Gracias!',
            text: x.message,
            icon: 'success',
          });
        } else {
          Swal.fire({
            title: 'Oops!',
            text: x.error.message,
            icon: 'error',
          });
        }
      });
  }

}
