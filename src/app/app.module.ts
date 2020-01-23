import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { MovieComponent } from './components/movie/movie.component';
import { PeliculaImagenPipe } from './pipes/pelicula-imagen.pipe';
import { GaleryComponent } from './components/home/galery.component';
import { FillPipe } from './pipes/fill.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BuscarComponent,
    NavbarComponent,
    MovieComponent,
    PeliculaImagenPipe,
    GaleryComponent,
    FillPipe
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
