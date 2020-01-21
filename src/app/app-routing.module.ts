import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { MovieComponent } from './components/movie/movie.component';

const ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'buscar', component: BuscarComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule .forRoot( ROUTES )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
