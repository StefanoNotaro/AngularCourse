import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { ServicesComponent } from './components/services/services.component';
import { ClientComponent } from './components/client/client.component';
import { ClientsReportComponent } from './components/clients-report/clients-report.component';

const ROUTES: Routes = [
    { path: 'clientes', component: ClientsComponent },
    { path: 'cliente/:id', component: ClientComponent },
    { path: 'servicios', component: ServicesComponent },
    { path: 'reporte', component: ClientsReportComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'clientes' }
];

@NgModule({
    imports: [ RouterModule.forRoot(ROUTES) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
