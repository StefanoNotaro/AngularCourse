import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http'; // Http client import

// Routes
// import { AppRoutingModule } from './app-routing.module';
// import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    // RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
