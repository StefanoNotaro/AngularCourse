import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Http client import
import { MaterialsModule } from './materials.module';
import {TextMaskModule} from 'angular2-text-mask';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Routes
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientsComponent } from './components/clients/clients.component';
import { ServicesComponent } from './components/services/services.component';
import { CiFormatPipe } from './pipes/ci-format.pipe';
import { ClientComponent } from './components/client/client.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ClientsReportComponent } from './components/clients-report/clients-report.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ClientsComponent,
    ServicesComponent,
    CiFormatPipe,
    ClientComponent,
    NotificationComponent,
    ClientsReportComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MaterialsModule,
    TextMaskModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
