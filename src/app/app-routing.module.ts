import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/c-login/login/login.component';
import { HomeComponent } from './views/d-content/home/home.component';
import { CreateUserComponent } from './views/e-user/create-user/create-user.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'home', component: HomeComponent },
  { path: 'create-trip', loadChildren: () => import('./create-trip/create-trip.module').then(m => m.CreateTripModule) },
  { path: 'manage-trip', loadChildren: () => import('./manage-trip/manage-trip.module').then(m => m.ManageTripModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
