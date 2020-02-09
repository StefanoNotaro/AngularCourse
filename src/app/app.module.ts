import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScrollingModule } from "@angular/cdk/scrolling";
// import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http'; // Http client import

// Routes
// import { APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { VirtualComponent } from './components/virtual/virtual.component';

@NgModule({
  declarations: [
    AppComponent,
    VirtualComponent
  ],
  imports: [
    BrowserModule,
    ScrollingModule,
    // APP_ROUTES,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
