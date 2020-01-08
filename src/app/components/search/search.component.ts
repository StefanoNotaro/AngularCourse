import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  artists: any[] = [];

  loading: boolean;
  constructor( private _spotifyService: SpotifyService) {
  }

  ngOnInit() {
  }

  buscar( termino: string ) {
    console.log(termino);
    this.loading = true;
    this._spotifyService.getArtists( termino )
      .subscribe( data => {
        this.artists = data;
        this.loading = false;
      });
  }

}
