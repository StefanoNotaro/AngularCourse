import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[] = [];

  loading: boolean;

  error = false;

  errorReturned: any = {};

  constructor( private _spotifyService: SpotifyService ) {
    this.loading = true;
    this.error = false;

    this._spotifyService.getNewReleases()
      .subscribe( data => {
        this.nuevasCanciones = data;
        this.loading = false;
      },
      ( serviceError ) => {
        console.log(serviceError);
        this.errorReturned = serviceError.error.error;
        this.loading = false;
        this.error = true;
      });
  }

  ngOnInit() {
  }

}
