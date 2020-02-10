import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navBarLogoURL = 'assets/images/AngularLogo.png';

  navbarName = 'GOTY';

  rutas: string[] = ['Inicio', 'Votar'];

  constructor() { }

  ngOnInit() {
  }

}
