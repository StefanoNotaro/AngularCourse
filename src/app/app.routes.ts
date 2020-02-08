import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES);
