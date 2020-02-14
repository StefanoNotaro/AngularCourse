import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Game } from '../../interfaces/interfaces';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  juegos: any[] = [];

  constructor(private _angularFirestore: AngularFirestore) { }

  ngOnInit() {
    this._angularFirestore
      .collection('goty')
      .valueChanges()
      .pipe(
        map((response: Game[]) => {
          return response.map(({ name, votos }) => ({ name, value: votos }));
        })
      )
      .subscribe(juegos => {
        this.juegos = juegos;
      });
  }

}
