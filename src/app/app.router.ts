import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BuscarComponent } from './components/buscar/buscar.component';
import { HomeComponent } from './components/home/home.component';
import { AppModule } from './app.module';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'buscar', component: BuscarComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppModule {}
