import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';

// Routes
import { APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { VirtualComponent } from './components/virtual/virtual.component';
import { DragComponent } from './components/drag/drag.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { PaisesComponent } from './components/paises/paises.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    VirtualComponent,
    DragComponent,
    NavbarComponent,
    PaisesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    ScrollingModule,
    DragDropModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
