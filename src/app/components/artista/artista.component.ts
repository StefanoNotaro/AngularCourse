import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent implements OnInit {

  artist: any = {};

  loading: boolean;

  constructor( private _activatedRouter: ActivatedRoute, private _spotifyService: SpotifyService) {
    _activatedRouter.params.subscribe( params => {
      this.getArtista( params.id );
    });
  }

  ngOnInit() {
  }

  getArtista( id: string ) {
    this.loading = true;
    this._spotifyService.getArtist( id )
      .subscribe( artist => {
        this.artist = artist;
        this.loading = false;
      });
  }

}
