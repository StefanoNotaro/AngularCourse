import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { ServicesComponent } from './components/services/services.component';

const ROUTES: Routes = [
    { path: 'clientes', component: ClientsComponent },
    { path: 'servicios', component: ServicesComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'clientes' }
];

@NgModule({
    imports: [ RouterModule.forRoot(ROUTES) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
