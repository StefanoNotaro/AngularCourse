import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from 'src/app/interfaces/interfaces';

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
        console.log(this.juegos);
      });
  }

  votar(juegoId) {
    console.log('Votó por: ', juegoId);
  }

}
