import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { MoviesService } from '../../../services/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _movieService: MoviesService, private _router: Router) { }

  ngOnInit() {
  }

  findMovie(buscar: string) {
    if (!buscar || buscar.length === 0) {
      return;
    }
    this._router.navigate(['/buscar', buscar]);
    // this._movieService.FindMovie(buscar).subscribe((x: any) => {
    //   this._router.navigate(['/buscar', buscar]);
    // });
  }

}
