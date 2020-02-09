import { Routes, RouterModule } from '@angular/router';
import { VirtualComponent } from './components/virtual/virtual.component';
import { DragComponent } from './components/drag/drag.component';
import { PaisesComponent } from './components/paises/paises.component';

const ROUTES: Routes = [
    { path: 'virtual', component: VirtualComponent },
    { path: 'drag', component: DragComponent },
    { path: "paises", component: PaisesComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'virtual' }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES);
