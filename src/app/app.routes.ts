import { Routes, RouterModule } from '@angular/router';
import { LineaComponent } from './components/linea/linea.component';

const ROUTES: Routes = [
    { path: 'linea', component: LineaComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'linea' }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES);
