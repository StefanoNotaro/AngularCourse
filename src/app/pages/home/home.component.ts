import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private _authService: AuthService, private _router: Router ) { }

  ngOnInit() {
  }

  salir() {
    this._authService.logout();
    this._router.navigateByUrl('/login');
  }

}
