import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http'; // Http client import
import { ChartsModule } from 'ng2-charts';

// Routes
import { APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { LineaComponent } from './components/linea/linea.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { BarraComponent } from './components/barra/barra.component';
import { DonaComponent } from './components/dona/dona.component';
import { RadarComponent } from './components/radar/radar.component';

@NgModule({
  declarations: [
    AppComponent,
    LineaComponent,
    NavbarComponent,
    BarraComponent,
    DonaComponent,
    RadarComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
