import { Routes } from '@angular/router';
import { IndexComponent } from '../app/core/features/films/indexing.component';
import { HomeComponent } from './core/features/home/home.component';
import { SwapiEntityType } from './core/shared/categories.enum';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: SwapiEntityType.Films, component: IndexComponent },
  { path: SwapiEntityType.People, component: IndexComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
