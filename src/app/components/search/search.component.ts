import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  artists: any[] = [];

  constructor( private _spotifyService: SpotifyService) { }

  ngOnInit() {
  }

  buscar( termino: string ) {
    console.log(termino);
    this._spotifyService.getArtist( termino )
      .subscribe( data => {
        this.artists = data;
      });
  }

}
