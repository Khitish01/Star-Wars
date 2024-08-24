import { Routes } from '@angular/router';
import { CharactersComponent } from './characters/characters.component';
import { CharactersDetailsComponent } from './characters-details/characters-details.component';

export const routes: Routes = [
    { path: 'characters', component: CharactersComponent },
    { path: 'characters/:id', component: CharactersDetailsComponent },
    { path: '', redirectTo: 'characters', pathMatch: 'full' }
];
