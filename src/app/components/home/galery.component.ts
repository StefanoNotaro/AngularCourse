import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-galery',
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.css']
})
export class GaleryComponent implements OnInit {
  @Input('movies') movies;
  @Input('title') title;

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  imageClick(movie: any) {
    console.log(movie);
    this._router.navigate(['/movie', movie.id]);
  }

}
