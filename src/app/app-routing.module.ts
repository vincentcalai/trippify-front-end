import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/c-content/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-trip', loadChildren: () => import('./create-trip/create-trip.module').then(m => m.CreateTripModule) },
  { path: 'manage-trip', loadChildren: () => import('./manage-trip/manage-trip.module').then(m => m.ManageTripModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
