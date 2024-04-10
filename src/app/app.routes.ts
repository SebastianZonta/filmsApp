import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { FilmComponent } from './components/film/film.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'film/:id', component: FilmComponent },
    { path: 'search/:text', component: SearchComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
